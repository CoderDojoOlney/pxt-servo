// tests go here; this will not be compiled when this package is used as a library

servodriver.init(64)
servodriver.setPWMFreq(60)
servodriver.setPWM(0, 0, 150)
servodriver.setPin(1, 1000, false)
servodriver.setPWM(0, 0, 300)
servodriver.setPin(1, 300, false)

