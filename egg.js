class Egg {
    constructor (pos, vel, color) {
        this.pos = pos;
        this.vel = vel;
        this.color = color;

        this.rotation = atan2(this.vel.x, this.vel.y);
    }

    update (force) {
        this.vel.add(force);
        this.pos.add(this.vel);
    }

    draw (sprite, size) {
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.rotation);
            rotate(-HALF_PI);

            this.rotation -= ((this.rotation - atan2(this.vel.y, this.vel.x)) / 100);
            this.rotation += 0.02;
            //this.rotation = atan2(this.vel.y, this.vel.x);

            tint(this.color);
            image(sprite, 0, -35, size.x, size.y);
        pop();
    }
}