#include <ArduinoBLE.h>

BLEService greetingService("180C");

BLEStringCharacteristic greetingCharacteristic("2A56", BLERead | BLENotify, 13);

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
}

void loop() {
  BLEDevice central = BLE.central();
  digitalWrite(LED_BUILTIN, HIGH);
  if (central) {
    Serial.print("Connected to central MAC: ");
    Serial.println(central.address());

    String str = "0";
    while (central.connected()){
      delay(500);
      if(str == "0") {
        digitalWrite(LED_BUILTIN, LOW);
        str = "1";
      } else {
        digitalWrite(LED_BUILTIN, HIGH);
        str = "0";
      }
      greetingCharacteristic.writeValue(str);
    }
  }
}
