
int analogTrigger = 1023 / 3;
int pinCount = 12;
int inputs[12] = {A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11};
int outputs[12] = {2,3,4,5,6,7,8,9,10,11,12,13};
void setup() {
  // put your setup code here, to run once:
  for(int a = 0; a < pinCount; a++) {
    pinMode(inputs[a], INPUT);
  }
  for(int a = 0; a < pinCount; a++) {
    pinMode(outputs[a], OUTPUT);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  for(int a = 0; a < pinCount; a++) {
    int val = analogRead(inputs[a]);
    digitalWrite(outputs[a], LOW);
    if(val >= analogTrigger) {
      digitalWrite(outputs[a], HIGH);
    }
  }

}
