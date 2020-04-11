let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let egg;
let carrot;
let grass;
let hill;
let cloud;

let eggs = [];
let carrots = [];
let clouds = [];

const cloudSpawnChance = 0.002;

let eggSpawnChance = 0.02; // Out of 10
const eggSpawnRate = 0.0005;  // Rate that the spawnChance increases by
const carrotCount  = 15;

const burstRange   = 50;    // Dist from the mouse an egg has to be to explode

let eggSize;
let carrotSize;

let grassWidthCounter = 0;  // used to make the grass move

let score = 0;

function preload() {
    eggSize = createVector(50, 70);
    carrotSize = createVector(20, 20);

    egg = loadImage("./egg.png");
    carrot = loadImage("./carrot.png");
    grass = loadImage("./grass.png");
    hill = loadImage("./hill.png");
    cloud = loadImage("./clouds.png");

    eggs.push(new Egg(createVector(-10, windowHeight+10), createVector(5, -10), color(random(100), 100, 100)));
}

function setup () {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
}

function draw () {
    background(score*10 % 100, 43, 92, 50);

    // Clouds
    for(let i = 0; i < clouds.length; i ++) {
        clouds[i].update();
        clouds[i].draw(cloud);
        if (clouds[i].pos.x > windowWidth + 600 || clouds[i].pos.x < -600) {
            clouds.splice(i, 1);
        }
    }

    // Spawning clouds
    if(random() < cloudSpawnChance) {
        if (random() < 0.5) {
            clouds.push(new Cloud(createVector(-500, random(0, windowHeight-500)), random(0.5, 1), random(400, 500)));
        } else {
            clouds.push(new Cloud(createVector(windowWidth + 500, random(0, windowHeight-500)), -random(0.5, 1), random(400, 500)));
        }
    }

    // Background
    image(hill, 0, windowHeight-(windowWidth/4), windowWidth, windowWidth/3.2);

    // Carrots
    for(let i = 0; i < carrots.length; i ++) {
        carrots[i].update(createVector(0, 0.2));
        carrots[i].draw(carrot, carrotSize);

        if(carrots[i].pos.y > windowHeight + 10) {
            carrots.splice(i, 1);
        }
    }

    // Eggs
    for(let i = 0; i < eggs.length; i ++) {
        eggs[i].update(createVector(0, 0.1));
        eggs[i].draw(egg, eggSize);

        if(eggs[i].pos.y > windowHeight + 10) {
            eggs.splice(i, 1);
        }
    }

    // Spawning eggs
    if (random() < eggSpawnChance) {
        let pos = createVector(random(-20, windowWidth+20), windowHeight+10);
        let vel = createVector(random(-5, 5), -random(8, 10));

        eggs.push(new Egg(pos, vel, color(random(100), 100, 100)));
        eggSpawnChance += eggSpawnRate;
        if (eggSpawnChance > 0.03) {
            eggSpawnChance = 0.03;
        }
    }

    // Grass
    image(grass, -((sin(grassWidthCounter*1.1)+1)*15), windowHeight-(windowWidth/2.5), windowWidth + ((sin(grassWidthCounter)+1)*40), windowWidth/2.25);
    grassWidthCounter += 0.01;

    // Score
    textSize(50)
    fill(100, 0, 100);
    stroke(100, 0, 0);
    strokeWeight(4);
    text(score, windowWidth-80, 50);

    // Dynamic canvas size
    if (window.innerWidth != windowWidth || window.innerHeight != windowHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        resizeCanvas(windowWidth, windowHeight);
    }
}

function mouseClicked () {
    for(let i = 0; i < eggs.length; i ++) {
        if (dist(mouseX, mouseY, eggs[i].pos.x, eggs[i].pos.y) < burstRange) {
            for(let j = 0; j < floor(random()*(carrotCount-5)) + 5; j ++) {
                // Spawn some carrots
                carrots.push(new Carrot(createVector(random(6)-3, -random(2, 8)), createVector(eggs[i].pos.x, eggs[i].pos.y)));
            }

            eggs.splice(i, 1);
            score ++;
            carrotCount += 0.5;
        }
    }
}
