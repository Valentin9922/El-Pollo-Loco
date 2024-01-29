class MovableObject extends DrawableObject {
    speed = 0.15;
    changeDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    lastCoin = 0;
    lastBottle = 0;
    bottles = 0;
    coins = 1;
    bottlehit = false;
    chickenaboveground = false;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

//sorgt dafür das man realistisch fällt nach dem Sprung
    applyGravity() {
        setInterval(() => {
            if (this.isChickenAboveGround() || this.speedY > 0) {
                this.chickenaboveground = true;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.chickenaboveground = false;
            }
        }, 1000 / 25);
    }

    jumpAfterKilledCgicken() {
        this.speedY = 20
    }

    isChickenAboveGround() {
        return this.y < 380;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject)
            return true;
        else
            return this.y < 200;
    }

    gotHitted() {
        this.energy -= 2;
        if (this.energy <= 0)
            this.energy = 0;
        else
            this.lastHit = Date.now(); //Zeigt an wie viele Millisekunden seit 1970 vergangen sind 
    }

    getCoin() {
        this.coins += 10;
        if (this.coins >= 100)
            this.coins = 100;
        else
            this.lastCoin = Date.now(); //Zeigt an wie viele Millisekunden seit 1970 vergangen sind
    }

    getBottle() {
        this.bottles += 20;
        if (this.bottles >= 100)
            this.bottles = 100;
        else
            this.lastBottle = Date.now(); //Zeigt an wie viele Millisekunden seit 1970 vergangen sind   
    }

    throwedBottle() {
        this.bottles -= 20;
    }

    isAlive() {
        return this.energy > 0;
    }

    checkBottleHitEndboss() {
        this.ThrowableObject.splash()
    }

    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    ChickenIsDead() {
        return this.ChickenEnergy = 0;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed
    }

    jump() {
        this.speedY = 20;
    }

}