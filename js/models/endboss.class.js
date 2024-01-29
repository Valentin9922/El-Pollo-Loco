
class Endboss extends MovableObject {

    IMAGES_INTRO = [
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    IMAGES_ATTACK = [
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    currentImage = 0;
    hadFirstContact = false;
    loadAnimations = false;
    attack = false;
    currentime = 0;
    fallingtime = 0;

    constructor() {
        super().loadImage(this.IMAGES_INTRO[0]);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 3800;
        this.width = 250;
        this.height = 400;
        this.y = 10000;
        this.acceleration = 0.3;
        this.animate();
        this.speed = 15
        this.endbossdamage = false;
        this.energy = 150;
        this.gothitted = false;
    }

//Die Funktion ist für das animieren vom Endboss verantwortlich
    animate() {
        this.playEndboss();
        this.moveLeft();
        this.applyEndbossGravity();
    }

//Die Funktion ist für alle Variationen der animierung zuständig
    playEndboss() {
        setInterval(() => {
            if (this.introIsPlayable()) {
                this.playAnimation(this.IMAGES_INTRO);
                this.fallingtime++;
            }
            this.checkEndbossGotDmg();
            this.checkEndboosIsdead();
            this.checkEndbossIsAttacking();
            this.isEndbossOutOfMap();
            if (this.endbossWalkAnimation()) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 1000 / 4);
    }

//sorgt dafür das der Endbos realistisch fällt nach dem der Knopf gedrückt wird
    applyEndbossGravity() {
        setInterval(() => {
            if (this.isEndbossAboveGround() || this.speedY > 0 && this.energy > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isEndbossAboveGround() {
        return this.y < 70;
    }

    isEndbossOutOfMap(){
        if(this.x < 0){
            showGameOverscreen();
            document.getElementById('win-or-loose-msg').innerHTML = "you lost! the final boss ran out of the map";        }
    }

//Endboss bewegt sich nach links
    moveLeft() {
        setInterval(() => {
            if (this.endbossWalkLeft()) {
                super.moveLeft();
            }
        }, 1000 / 10);
    }

    introIsPlayable() {
        return this.loadAnimations == true && this.fallingtime < 20;
    }

    endbossWalkAnimation() {
        return this.fallingtime == 20 && this.endbossdamage == false && this.energy > 0 && !this.attack;
    }

    endbossWalkLeft() {
        return this.fallingtime == 20 && this.isAlive();
    }

    enbossIsDead() {
        return this.energy <= 0;
    }

    showimage() {
        document.getElementById('game-over-container').classList.remove('d-none');
    }

//Endboss wird getroffen und bekommt Schaden
    checkEndbossGotDmg() {
        if (this.endbossdamage == true) {
            this.energy -= 20;
            this.playAnimation(this.IMAGES_HURT)
        }
    }

//Wenn der Endboss besiegt wurde wird eine dementsprechende animation ausgeführt und der GameOver screen geladen
    checkEndboosIsdead() {
        if (this.enbossIsDead()) {
            setTimeout(() => this.playAnimation(this.IMAGES_DEAD), 500);
            this.EndbossIsDeadSound();
            this.EndbossFallingWhenisDead();
            showGameOverscreen()
            document.getElementById('win-or-loose-msg').innerHTML = "you won! You beat the Final Boss!";  
        }
    }

    EndbossIsDeadSound() {
        if (this.deadSoundIsPlayable()) {
            endbossdiesound.play()
            setTimeout(() => winning = true, 3200);
            this.currentime = 2;
        }
    }

    deadSoundIsPlayable() {
        return this.currentime < 1 && isPlaying;
    }

//sobald der Endboss in Reichweite ist, soll er den Charakter angreifen und eine andere animation wird ausgeführt
    checkEndbossIsAttacking() {
        if (this.attack) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

//sobald der Endboss besiegt wurde soll er nach untern fallen
    EndbossFallingWhenisDead() {
        setTimeout(() => {
            setInterval(() => {
                this.y += 4
            }, 1000 / 30);
        }, 1000);
    }
}

