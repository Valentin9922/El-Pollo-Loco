class Chicken extends MovableObject {

    IMAGES_WALKING = [
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',

    ]
    currentImage = 0;
    offset = {
        top: 0,
        left:0,
        right:0,
        bottom:2,
    };

    constructor() {
        super().loadImage('img/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 1000 + Math.random() * 2500;
        this.speed = 0.05 + Math.random() * 1.5
        this.y = 370;
        this.height = 50;
        this.width = 70;
        this.energy = 10;
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

//Die Funktion ist für das animieren des Huhns verantwortlich
    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setInterval(() => this.objectDisapear(), 1000);
            } else
                this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 10);
    }

//Das Huhn soll sich nach links bewegen
    moveLeft() {
        setInterval(() => {
            if(this.isAlive()){
            super.moveLeft();
        }}, 1000 / 60);
    }
}