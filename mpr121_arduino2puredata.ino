//connect mpr121 to arduini
#include <MPR121.h>
#include <Wire.h>

#define numElectrodes 12

void setup() {
  Serial.begin( 9600 );
  Wire.begin();

  // setup mpr121 sensor
  MPR121.begin( 0x5A );
  MPR121.setInterruptPin( 4 );
  MPR121.setTouchThreshold( 400 );
  MPR121.setReleaseThreshold( 2 );
}

void loop() {
  // update new data
  MPR121.updateTouchData();
  MPR121.updateFilteredData();


  for (uint8_t i=0; i<12; i++) {

   Serial.print(map(MPR121.getFilteredData(uint8_t(i)), 0, 1020, 100, 999));

   if (i < 11) {
      Serial.print(" "); // seperate data values
    } else {
      Serial.println(" "); //new line for each 12 data values
    }
  

}
  //  delay(50);
}