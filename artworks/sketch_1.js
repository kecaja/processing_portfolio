function setup() {
    createCanvas(500, 500);
    r = 1
    i = 1
    h = 1
    h_d = 1
    noStroke()
    background(220);
  }
  
  function draw() {
    
    circle(width/2, h, r)
    r += i
    if(r>width/1.4){
      i = -3
      fill(random(255), random(255), random(255), 2)
    }
    if (r<1){
      i = 6
    }
    if (h>height){
      h_d = -1
    }
    if (h<0){
      h_d = 1
    }
    h += h_d
    
  }