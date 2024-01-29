class Character extends MovableObject {
    y = 200;
    width = 100;
    height = 230;
    x = 120;


    IMAGES_WALKING = [
        'img/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img/img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img/img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img/img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img/img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img/img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img/img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img/img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img/img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_SLEEPING = [
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    world;
    currentImage = 0;
    speed = 5;
    walking_sound = new Audio('audio/walking_sand.mp3')
    jumping_sound = new Audio('audio/jump.mp3')

    offset = {
        top: 100,
        bottom: -30,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImage('img/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEPING);
        this.animate();
    }

    animate() {
        this.applyCharacterGravity();
        //------ Character control and moving animation ------//
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 100);
    }

//die Funktion ist für das Bewegen des Charakters zuständig
    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
            if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

//Die Funktion ist für alle Variationen der animierung zuständig
    playCharacter() {
        if (this.isDead())
            this.characterDie();
        else if (this.isHurt()) {
            this.animationHurt();
            if (this.soundIsEnabled())
                Pepehurt_sound.play();
        } else if (this.isAboveGround()) {
            this.animateJump();
        } else if (this.isWalking()) {
            this.playAnimation(this.IMAGES_WALKING);  // <== Mudulus //arbeitet mit Rest bsp: 1:6 = 0 Rest: 1
        } if (this.characterSleep())                  //Der Modulo-Operator (%) gibt den Restwert zurück, der übrig bleibt wenn ein Operand durch einen anderen geteilt
            this.playAnimation(this.IMAGES_SLEEPING); // wird. Das Vorzeichen ergibt sich aus der Wahl der Quotienten.
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

//Charakter bewegt sich nach rechts
    moveRight() {
        super.moveRight();
        if (isPlaying) {
            walking_sound.play()
        };
        this.changeDirection = false;
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 100;
    }

//Charakter bewegt sich nach links
    moveLeft() {
        super.moveLeft();
        if (isPlaying)
            walking_sound.play();
        this.changeDirection = true;
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

//Charakter sprint nach oben
    jump() {
        super.jump();
        if (isPlaying)
            jumping_sound.play();
    }

//Wenn der charakter stirbt wird die dementsprechende animation ausgefüht und der GameOver screen wird angezeigt
    characterDie() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        showGameOverscreen();
        document.getElementById('win-or-loose-msg').innerHTML = "you Lost! an opponent has defeated you";  
        loosing = true;
    }

    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    characterSleep() {
        return !this.isWalking() && !this.isHurt() && !this.isAboveGround();
    }

    animationHurt() {
        return this.playAnimation(this.IMAGES_HURT);
    }

    animateJump() {
        return this.playAnimation(this.IMAGES_JUMPING);
    }

    soundIsEnabled() {
        return isPlaying
    }

//sorgt dafür das der Charakter realistisch fällt nach dem Sprung
    applyCharacterGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
}