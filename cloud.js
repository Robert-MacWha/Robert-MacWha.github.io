class Cloud {
    constructor (pos, speed, size) {
        this.pos = pos;
        this.speed = speed;
        this.size = size;
    }

    update () {
        this.pos.x += this.speed;
    }

    draw (sprite) {
        image(sprite, this.pos.x, this.pos.y, this.size, this.size);
    }
}