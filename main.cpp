#include "pxt.h"

using namespace pxt;

namespace olney {

    /**
     * Sets a comment from C++
     */
    //% weight=58
    //% blockId=olney_servo_comment block="comment %msg"
    void comment(StringData *data){
        uBit.basic.showString(data);

}