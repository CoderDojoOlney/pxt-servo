// tests go here; this will not be compiled when this package is used as a library

servo.init(64)
servo.setPWMFreq(60)
servo.setPWM(0, 0, 150)
servo.setPin(1, 1000, false)
servo.setPWM(0, 0, 300)
servo.setPin(1, 300, false)

