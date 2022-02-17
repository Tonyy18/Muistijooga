#include <ArduinoBLE.h>

BLEService greetingService("180C");

BLEStringCharacteristic greetingCharacteristic("2A56", BLERead | BLENotify, 13);

int pinCount = 22;
int analogTrigger = 1023 / 3;
int inputPins[22] =  {A0,A1,A2,A3,A4,A5,A6,A7,0,1,2,3,4,5,6,7,8,9,10,11,12,13};

void setup() {
  Serial.begin(9600);
  BLE.begin();

  BLE.setLocalName("Muistijooga 1");
  BLE.setAdvertisedService(greetingService);
  greetingService.addCharacteristic(greetingCharacteristic);
  BLE.addService(greetingService);

  BLE.advertise();
  Serial.print("Peripheral device MAC: ");
  Serial.println(BLE.address());
  Serial.println("Waiting for connections...");
  pinMode(LED_BUILTIN, OUTPUT);

  for(int a = 0; a < pinCount; a++) {
    pinMode(inputPins[a], INPUT);
  };
}

void loop() {
  BLEDevice central = BLE.central();
  digitalWrite(LED_BUILTIN, HIGH);
  if (central) {
    Serial.print("Connected to central MAC: ");
    Serial.println(central.address());

    String data = "0";
    while (central.connected()){
      String data = "";
      for(int a = 0; a < pinCount; a++) {
        int pin = inputPins[a];
        int val = 0;
        if(a < 8) {
          //Analog pin
          int analog = analogRead(pin); 
          if(analog >= analogTrigger) {
            //Enough pressure
            val = 1;
          };
        } else {
          //Digital pin
          val = digitalRead(pin);
        };
        if(val == 1) {
          data += String(a) + ":";
        };
        
      };
      greetingCharacteristic.writeValue(data);
    }
  }
}
