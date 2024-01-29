class BabyChicken extends MovableObject {


    IMAGES_WALKING = [
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    currentImage = 0;
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };
    randomNum = Math.floor(Math.random() * (9000 - 6000 + 1)) + 6000;

    constructor() {
        super().loadImage('img/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.x = 1400 + Math.random() * 2000;
        this.speed = 0.05 + Math.random() * 1.5
        this.y = 390;
        this.height = 40;
        this.width = 60;
        this.energy = 5;
        this.chickenaboveground;
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

//alle Funktionen für die animation vom babychicken werden aufgerufen//
    animate() {
        this.moveLeft()
        this.randomJump();
        this.applyGravity();
        this.checkBabyChickenDead();
    }

//wenn das babychicken am Leben ist, soll es sich nach links bewegen//
    moveLeft() {
        setInterval(() => {
            if(this.isAlive()){
            super.moveLeft();
        }}, 1000 / 60);
    }

//sobald das babychicken sterben sollte, werden die dementsprechende animation ausgeführt.
//Solange es am Leben ist wird die laufen animation ausgeführt.
    checkBabyChickenDead() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setInterval(() => this.objectDisapear(), 1000);
            } else
                this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 10);
    }
 
//Das babychicken soll zufällig hochspringen
    randomJump() {
        setInterval(() => {
            if(this.isAlive()){
            this.jump();
        }}, this.randomNum);
    }
}