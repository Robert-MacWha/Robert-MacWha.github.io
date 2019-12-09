const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("showcase");
  colorMode(HSB, 100);
  frameRate(30);

  alignSlider = createSlider(0, 2, 1, 0.1);
  alignSlider.parent("alignSlider");

  cohesionSlider = createSlider(0, 2, 0.75, 0.1);
  cohesionSlider.parent("cohesionSlider");

  separationSlider = createSlider(0, 2, 1.5, 0.1);
  separationSlider.parent("separationSlider");

  for (let i = 0; i < 50; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(255);
  for (let boid of flock) {
    boid.flock(flock);
    boid.edges();
    boid.update();
    boid.show();
  }
}