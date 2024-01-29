class World {

    character = new Character();
    endboss = new Endboss();
    level = level1;
    statusbarhealth = new StatusBarHealth();
    statusbarcoins = new StatusBarCoins();
    statusbarbottles = new StatusBarBottles();
    statusbarendboss = new StatusBarEndboss();
    statusbarendbossicon = new StatusbarIconEndboss();
    throwableobject = [];
    pickedbottle = 0;
    bottleThrowed = false;
    bottleCdn = false;
    endbossspawning = false;
    z = 1 + Math.random() * 500;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0) // verschiebt die welt um die angegebene x achse
        // dies wird allerding gany oft pro sekunde ausgeführt
        // und das Programm kann abschmieren
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addStatusbarsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addLifelessObjects();
        this.addToMap(this.endboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableobject);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0)
        //Nachdem alles gezeichnet wurde wird es wieder zurückgeschoben 
        // und es wird von vorne gezeichnet
        //draw wird immer wieder aufgerufen, je nach dem wie es deine grafikkarte zulässt
        let self = this;
        requestAnimationFrame(function () { //weil this nicht mehr funktioniert muss man es als variable definieren
            self.draw();
        })
    }

    addStatusbarsToMap() {
        this.addToMap(this.statusbarhealth);
        this.addToMap(this.statusbarcoins);
        this.addToMap(this.statusbarbottles);
        this.addToMap(this.statusbarendboss);
        this.addToMap(this.statusbarendbossicon);
    }

    addLifelessObjects() {
        this.addObjectsToMap(this.level.endbossbutton);
        this.addObjectsToMap(this.level.pickablecoin);
        this.addObjectsToMap(this.level.pickablebottle);
    }

//Canvas wird gecleart
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.changeDirection) { //wird ausgeführt wenn sich die Richtung wechselt
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawHitboxes(this.ctx);
        if (mo.changeDirection)
            this.flipImageBack(mo)
    }

//Checkt alle funktionen die mit dem Charakter interagieren können
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkPickableCoin();
            this.checkPickableBottle();
            this.checkButtonColliding();
            this.checkEndbossCollision();
        }, 1000 / 30);
        setInterval(() => this.checkThrowObjects(), 1000 / 10);
    }

// checkt alle Funktionen die mit dem Charakter Kollidieren können
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.checkJumpCollision(enemy);
            this.checkBottleCollision(enemy);
            this.checkCollision(enemy);
        })
    };

    checkCollision(enemy) {
        //gilt für jeden gegener
        if (enemy.isAlive())
            if (this.character.isColliding(enemy)) {//wenn pepe getroffe wird, wird folgendes ausgeführt
                this.character.gotHitted(); //sobaldd pepe getroffen wurde wird ihm energie abgezogen
                this.statusbarhealth.setPercentage(this.character.energy)
                // wenn Pepe getroffen wird, wird die statusbar angepasst
            }
    }

//Checkt ob der Charakter mit dem Endboss kollidiert
    checkEndbossCollision() {
        if (this.character.isColliding(this.endboss)) {
            this.character.gotHitted();
            this.statusbarhealth.setPercentage(this.character.energy)
            this.endboss.attack = true;
        } else {
            this.endboss.attack = false;
        }
    }

//checkt ob der Endboss mit den geworfenen Flaschen kollidiert
    checkBottleCollision(enemy) {
        this.throwableobject.forEach((bottle) => {
            if (bottle.isColliding(enemy) || bottle.isColliding(this.endboss)) {
                this.endboss.endbossdamage = true
                bottle.collided = true;
            } if (this.endboss.endbossdamage == true) {
                this.statusbarendboss.setPercentage(this.endboss.energy);
                setTimeout(() => this.endboss.endbossdamage = false, 500);
            }
        })
    }

//checkt ob der Charakter beim springen auf ein Chicken kollidiert
    checkJumpCollision(enemy) {
        if (enemy.isAlive())
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.chickenaboveground && this.character.speedY <10) {
                enemy.energy = 0;
                if (isPlaying) {
                    jumping_on_chicken.play()
                };
                this.character.jumpAfterKilledCgicken();
            }
    }

//checkt ob der Charakter mit einem Coin kollidiert und sammelt ihn ein
    checkPickableCoin() {
        this.level.pickablecoin.forEach((coin) => {
            if (this.character.isColliding(coin) && coin.objectCollected == 1) {
                this.character.speed += 0.3;
                this.character.getCoin();
                if (isPlaying) {
                    picking_coin.play()
                };
                this.statusbarcoins.setPercentage(this.character.coins)
                coin.objectCollected = 0;
            }
        });
    }

//checkt ob der Charakter mit dem Knopf kollidiert
    checkButtonColliding() {
        if (this.buttonCollied()) {
            this.endboss.y = -700;
            this.level.endbossbutton[0].buttonpressed = true;
            this.endboss.loadAnimations = true;
            this.statusbarendboss.width = 200;
            this.statusbarendbossicon.width = 70;
            if (isPlaying) {
                boss_scream.play();
                falling_endboss.play()
            };
            this.endbossspawning = true;
        }
    }

    buttonCollied() {
        return this.character.isColliding(this.level.endbossbutton[0]) && this.character.isAboveGround() && this.level.endbossbutton[0].buttonpressed == false;
    }

//Checkt ob der charakter mit der Salsa Bottle kollidiert und sammelt diese ein
    checkPickableBottle() {
        this.level.pickablebottle.forEach((bottle) => {
            if (this.bottleIsPickable(bottle)) {
                this.character.getBottle();
                if (isPlaying) {
                    picking_bottle.play()
                };
                bottle.objectCollected = 0;
                this.statusbarbottles.setPercentage(this.character.bottles)
                this.pickedBottleCounter(bottle)
            }
        })
    }

//checkt ob die Salsa Bottle aufsammelbar ist
    bottleIsPickable(bottle) {
        return this.character.isColliding(bottle) && bottle.objectCollected == 1;
    }

    pickedBottleCounter(bottle) {
        if (this.pickedbottle == 5)
            this.pickedbottle = 5;
        else
            this.pickedbottle++;
    }

    checkThrowObjects() {
        if (this.bottleIsThrowable()) {
            this.bottleThrowed = true;
            this.checkThrowObjectsFunction();
        }
        else
            this.ThrowableBottleCooldown()
    }

    bottleIsThrowable(){
        return this.keyboard.D_KEY && this.pickedbottle > 0 && !this.bottleCdn && this.endbossspawning;
    }

    checkThrowObjectsFunction() {
        this.bottleCdn = true;
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.changeDirection);
        this.throwableobject.push(bottle);
        if (isPlaying) {
            throwing_bottle.play()
        };
        this.pickedbottle--;
        this.character.throwedBottle();
        this.statusbarbottles.setPercentage(this.character.bottles)
        console.log(this.character.bottlesw)
    }

    ThrowableBottleCooldown() {
        if (this.bottleThrowed) {
            this.bottleThrowed = false;
            setTimeout(() => {
                this.bottleCdn = false;
            }, 500);
        }
    }

    flipImage(mo) {
        this.ctx.save();   // speichert den aktuellen status ab 
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1); // Bild wird gespiegelt
        mo.x = mo.x * -1; // bsp 100 * -1 = -100 
    }

    flipImageBack(mo) {
        this.ctx.restore(); // der vorher gespiecherte Status wird wiederhergestellt
        mo.x = mo.x * -1; // bsp 100 * -1 = -100 
    }
}