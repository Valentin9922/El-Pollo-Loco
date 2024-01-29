collided = false
class ThrowableObject extends MovableObject {

    IMAGES_BOTTLEROTAION = [
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    ]


    cooldown = 0;

    constructor(x, y, changeDirection,) {
        super().loadImage('img/img_pollo_locco/img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLEROTAION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 100;
        this.throw(changeDirection);
    }

    throw(changeDirection) {
        this.addGravityToBottle(changeDirection);
        this.animateBottle();
    };

    addGravityToBottle(changeDirection) {

        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            if (changeDirection == true) {
                this.x -= 12;
            } else {
                this.changeDirection;
                this.x += 12;
            }
        }, 25);
    }

    animateBottle() {
        setInterval(() => {
            if (this.collided == true) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.BottleSplashSound();
                setTimeout(() => {
                    this.width = 0;
                }, 300);
            }
            else {
                this.playAnimation(this.IMAGES_BOTTLEROTAION);
                setTimeout(() => {
                    this.width = 0;
                }, 3000);

            }
        }, 1000 / 20)
    }

    BottleSplashSound() {
        if (this.cooldown < 1 && isPlaying) {
            bottlesplashsound.play();
            this.cooldown = 2;
        }
    }

}