# servodriver
micro:bit custom pxt package for Adafruit I2C servo board

# servodriver package

A simple set of control functions for the AdaFruit PCA9615 16 channel Servo board
using I2C

```sim
servodriver.init(boardId.id0x40)
servodriver.setPWMFreq(60)
basic.pause(500)
servodriver.setPin(0, 400, false)
servodriver.setPin(0, 1000, false)
```

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

## License

MIT