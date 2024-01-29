class DrawableObject {
    x = 120;
    y = 250;
    height = 200;
    width = 120;
    img;
    buttonpressed = false;
    objectCollected = 1;
    imageCache = {};
    currentImage = 0; loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height,);
    }

    drawHitboxes(ctx) {
        if (this.instancesof()) {
            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        };
    }

    drawInnerHitboxes(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.rect(this.y, this.width, this.height);
            ctx.stroke();
        };
    }

    coinCollected() {
        return this.objectCollected = 0
    }

    objectDisapear() {
        this.width = 0;
        this.height = 0;
}

    instancesof() {
        return this instanceof Character || this instanceof Chicken || this instanceof Box | this instanceof SpawnEndbossButton;
    }
}