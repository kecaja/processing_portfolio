function setup() {
    createCanvas(500, 500);
  }
  
  function draw() {
    background(220);
    translate(width / 2, height / 2);
    rotate(radians(frameCount));
    rectMode(CENTER);
    rect(0, 0, 100, 100);
  }