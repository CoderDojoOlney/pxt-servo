# Servo Driver
micro:bit custom pxt package for Adafruit I2C servo board (https://www.adafruit.com/product/815)

# Servo Driver package

A simple set of control functions for the AdaFruit PCA9615 16 channel Servo board
using I2C. This board will allow up to 16 servos to be controlled, just using the 2 I2C pins on the micro_bit (pins 19 and 20)

The code is extremely simple to use. Simply initialize the board using its I2C address at the start of your code. You also need to set the PWM frequency, and a value of 60Hz usually is about right

Then, any servo can be moved using the setPin command. Servos are numbered 0 to 15, and need to be sent a value between 0 and 4096. 

Note: the extreme values of 0 and 4096 will probably be out of range for the servos, so you should calibrate their extreme values by trial and error.

## Sample code

```javascript
servodriver.init(boardId.id0x40)
servodriver.setPWMFreq(60)

servodriver.setPin(0, 400, false)
servodriver.setPin(0, 1000, false)
```

## Supported targets

* for PXT/microbit

## License

MIT