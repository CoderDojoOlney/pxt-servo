# servo driver blocks

Easily drive up to 16 servos at a time using the AdaFruit PCA9685  
board with only two micro:bit pins. This uses the I2C logic pins (19 and 20)
so does not block any of the other I/O you might want to do!



```sim
servodriver.init(boardId.id0x40)
servodriver.setPWMFreq(60)
basic.pause(500)
servodriver.setPin(0, 400, false)
servodriver.setPin(0, 1000, false)
```


### ~


