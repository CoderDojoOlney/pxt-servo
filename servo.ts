

let PCA9685_MODE1 = 0x0
let PCA9685_PRESCALE = 0xFE;
let _i2cAddr = 0x0;
let LED0_ON_L = 0x6;

/**
 * Adafruit PCA9615 Servo board driver. 
 */
//% color=270 weigth=10
namespace servo{

    //% shim=pxtrt::panic
    function panic(code: number) { }

    function die() { panic(142) }  

    /**
     * Initialise the board with an I2C address
     **/
    //% blockId=olney_servo_init
    //% block="Init Servo board on Address %address" 
    export function init(address: number=0x40) {
        _i2cAddr = address;
        write8(PCA9685_MODE1, 0x0);
    }


    /**
     * Set the PWM frequency
     **/
    //% blockId=olney_servo_setPwmFreq
    //% block="Set PWM frequency to %freq"   
    export function setPWMFreq(freq: number) {
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);

        let oldmode = read8(PCA9685_MODE1);        
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        basic.showNumber(oldmode);

        write8(PCA9685_MODE1, newmode); // go to sleep
        write8(PCA9685_PRESCALE, prescale); // set the prescaler
        write8(PCA9685_MODE1, oldmode);
        control.waitMicros(5000);
        write8(PCA9685_MODE1, oldmode | 0xa1);

        let finalmode = read8(PCA9685_MODE1);        
        basic.showNumber(finalmode);
    }

    /**
     * Set the PWM value to move the servo
     **/
    //% blockId=olney_servo_setPwm
    //% block="Set PWM for servo %servo: | on %on, | off %off"    
    export function setPWM(servo: number, on: number, off: number) {

        if (servo < 0 || servo > 15 )
            die();        

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * servo;
        buf[1] = on & 0xff;
        buf[2] = (on>>8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off>>8) & 0xff;
        pins.i2cWriteBuffer(_i2cAddr, buf);
    }

    /**
     * Sets pin without having to deal with on/off tick placement and properly handles
     * a zero value as completely off.  Optional invert parameter supports inverting
     * the pulse for sinking to ground.  Val should be a value from 0 to 4095 inclusive.
     **/
    //% blockId=olney_servo_setPin
    //% block="Set Pin for servo %servo: | value %val, | Invert? %invert"    
    export function setPin(num: number, val: number, invert: boolean)
    {
    // Clamp value between 0 and 4095 inclusive.
    val = Math.min(val, 4095);
    if (invert) {
        if (val == 0) {
        // Special value for signal fully on.
        setPWM(num, 4096, 0);
        }
        else if (val == 4095) {
        // Special value for signal fully off.
        setPWM(num, 0, 4096);
        }
        else {
        setPWM(num, 0, 4095-val);
        }
    }
    else {
        if (val == 4095) {
        // Special value for signal fully on.
        setPWM(num, 4096, 0);
        }
        else if (val == 0) {
        // Special value for signal fully off.
        setPWM(num, 0, 4096);
        }
        else {
        setPWM(num, 0, val);
        }
    }
    }    
        
    function write8(addr: number, val: number) {

        if (val < 0 || val > 0xff )
            die();   
        
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