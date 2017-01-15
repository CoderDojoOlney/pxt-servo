

let PCA9685_MODE1 = 0x0
let PCA9685_PRESCALE = 0xFE;
let _i2cAddr = 0x0;
let LED0_ON_L = 0x6;

/**
 * Permissible addresses for the board I2C address
 */
enum boardId
{
    //% blockId="id_40" block="0x40"
    id_0x40 = 0x40,
    //% blockId="id_41" block="0x41"
    id_0x41 = 0x41,
    //% blockId="id_42" block="0x42"
    id_0x42 = 0x42,
    //% blockId="id_43" block="0x43"
    id_0x43 = 0x43,
    //% blockId="id_44" block="0x44"
    id_0x44 = 0x44,
    //% blockId="id_45" block="0x45"
    id_0x45 = 0x45,
    //% blockId="id_46" block="0x46"
    id_0x46 = 0x46,
    //% blockId="id_47" block="0x47"
    id_0x47 = 0x47,

} 

enum servoDirection
{
    normal = 0,
    inverted = 1,
}    

/**
 * Adafruit PCA9615 Servo board driver. 
 */
//% color=270 weight=10
namespace servodriver{

    /**
     * Initialise the board with an I2C address. 
     **/
    //% blockId=olney_servo_init weight=100
    //% block="Init Servo board on Address %address" 
    export function init(address: boardId = boardId.id_0x40) {
        _i2cAddr = address;
        write8(PCA9685_MODE1, 0x0);
    }


    /**
     * Set the PWM frequency (typically 60 Hz)
     **/
    //% blockId=olney_servo_setPwmFreq weight=50
    //% block="Set PWM frequency to %freq" Hz  
    export function setPWMFreq(freq: number = 60) {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);

        let oldmode = read8(PCA9685_MODE1);        
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        //basic.showNumber(oldmode);

        write8(PCA9685_MODE1, newmode); // go to sleep
        write8(PCA9685_PRESCALE, prescale); // set the prescaler
        write8(PCA9685_MODE1, oldmode);
        control.waitMicros(5000);
        write8(PCA9685_MODE1, oldmode | 0xa1);

        //let finalmode = read8(PCA9685_MODE1);        
        //basic.showNumber(finalmode);
    }


    /**
     * Moves the servo to a position. Servo can be a value between 0 and 15.
     * Optional invert parameter supports inverting
     * the pulse for sinking to ground.
     * Val should be a value from 0 to 4095 inclusive.
     **/
    //% blockId=olney_servo_setPin weight=30
    //% block="Move servo %servo: | to position %val, | Invert? %invert"    
    export function moveTo(servo: number, val: number, invert: servoDirection)
    {
        if (servo < 0 || servo > 15)
            return;
        
        // Clamp value between 0 and 4095 inclusive.
        val = Math.clamp(0, 4095, val);
        if (invert == servoDirection.inverted) {
            if (val == 0) {
                // Special value for signal fully on.
                setPWM(servo, 4096, 0);
            }
            else if (val == 4095) {
                // Special value for signal fully off.
                setPWM(servo, 0, 4096);
            }
            else {
                setPWM(servo, 0, 4095-val);
            }
        }
        else {
            if (val == 4095) {
                // Special value for signal fully on.
                setPWM(servo, 4096, 0);
            }
            else if (val == 0) {
                // Special value for signal fully off.
                setPWM(servo, 0, 4096);
            }
            else {
                setPWM(servo, 0, val);
            }
        }
    }   
    
    /**
     * Set the PWM value to move the servo. 
     **/
    //% blockId=olney_servo_setPwm weight=10
    //% block="Set PWM for servo %servo: | on= %on, | off= %off"  
    //% advanced=true
    export function setPWM(servo: number, on: number, off: number) {

        if (servo < 0 || servo > 15)
            return;

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * servo;
        buf[1] = on & 0xff;
        buf[2] = (on>>8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off>>8) & 0xff;
        pins.i2cWriteBuffer(_i2cAddr, buf);
    }
        
    function write8(addr: number, val: number) {
        let buf = pins.createBuffer(2);
        buf[0] = addr;
        buf[1] = val;
        pins.i2cWriteBuffer(_i2cAddr, buf);        
    }

    function read8(addr: number) {
        pins.i2cWriteNumber(_i2cAddr, addr, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(_i2cAddr, NumberFormat.UInt8BE);
        return val;        
    }
}