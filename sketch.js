let port;
let connectBtn;
let touchValues = []; // Array to store touch sensor data

function setup() {
  createCanvas(600, 600);

  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 360);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background("white");

  // Read and parse data from the Arduino
  let vals = port.readUntil("\n"); // Read a line of data
  if (vals) {
    touchValues = vals.trim().split(" ").map(Number); // Parse the string into an array of numbers
  }


  // Visualize the touch data
  for (let i = 0; i < touchValues.length; i++) {
    console.log(touchValues);
    let x = map(i, 0, touchValues.length - 1, 50, width - 50);
    let size = map(touchValues[i], 100, 999, 10, 100); // Map sensor values to a range for circle size
    let color = map(touchValues[i], 100, 900, -50, 280);
    console.log(color);
    noStroke;
    fill(color);
    ellipse(x, height / 2, size, size);

  }
}

function connectBtnClick(){
    console.log("my button is clicked");
    if (!port.opened()) {
      port.open('Arduino', 9600);
    } else {
      port.close();
    }
  }