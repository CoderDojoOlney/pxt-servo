enum ServoId {
    S01 = 1,
    S02 = 2,
    S03 = 3,
    S04 = 4,
    S05 = 5,
    S06 = 6,
    S07 = 7,
    S08 = 8,
    S09 = 9,
    S10 = 10,
    S11 = 11,
    S12 = 12,
    S13 = 13,
    S14 = 14,
    S15 = 15,
    S16 = 16,
} 

/**
 * A test comment
 */
//% color=270 weigth=10
namespace olney{
    
    /**
     * Move the servo to an angle between zero and 180 degrees
     **/
    //% blockId=olney_servo_moveTo
    //% block="Move servo %servo| to angle %angle"   
    export function moveTo(servo: ServoId, angle: number) {
        let clampedangle = Math.clamp(0, 180, angle)
        basic.showString("S[")
        basic.showNumber(servo);
        basic.showString("]=");
        basic.showNumber(angle);
        
    }
}