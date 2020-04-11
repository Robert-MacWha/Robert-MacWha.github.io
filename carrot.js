class Carrot {
    constructor (vel, pos) {
        this.pos = pos;
        this.vel = vel;
    }

    update (force) {
        this.vel.add(force);
        this.pos.add(this.vel);
    }

    draw (sprite, size) {
        push();
            translate(this.pos.x, this.pos.y);
            rotate(atan2(this.vel.y, this.vel.x));
            //rotate(HALF_PI);
            rotate(-HALF_PI*1.5);

            image(sprite, 0, 0, size.x, size.y);
        pop();
    }
}