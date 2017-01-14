# servo blocks

Easily drive up to 16 servos at a time using the AdaFruit PCA9685  
board with only two micro:bit pins. This uses the I2C logic pins (19 and 20)
so does not block any of the other I/O you might want to do!



```sim
servo.init(boardId.id0x40)
servo.setPWMFreq(60)
basic.pause(500)
servo.setPin(0, 400, false)
servo.setPin(0, 1000, false)
```


### ~


