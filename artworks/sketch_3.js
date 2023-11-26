function setup() {
    createCanvas(500, 500);
    strokeWeight(0.5);
  }
  
function draw() {
background(220);
bs = 50;

diff_i = 2
len = 50

for(i=0;i<len;i++){
    p1_x = 0
    p2_x = width
    p1_y = i*diff_i*i * 0.03
    p2_y = height - p1_y
    // p2_y = height
    line(p1_x, p1_y, p2_x, p2_y)
    }
}