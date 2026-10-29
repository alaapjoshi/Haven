#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

const int trigPin = 9;
const int echoPin = 10;
const int buzzerPin = 8; 

long duration;
int distance;

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);

  lcd.init();
  lcd.backlight();

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT); 
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  
  distance = duration * 0.034 / 2;
  
  lcd.setCursor(0, 0);
  lcd.print("Distance:");
  lcd.setCursor(0, 1);
  lcd.print(distance);
  lcd.print(" cm");

  if (distance >= 55 || distance <= 40) {
    tone(buzzerPin, 1000);
    Serial.println("Hi");
    delay(100); 
  } else {
    noTone(buzzerPin);
  }
  
  delay(1000);
}
