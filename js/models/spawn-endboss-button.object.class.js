class SpawnEndbossButton extends DrawableObject {
    button = 'img/box/button-img/button.png';
    buttonPressed = 'img/box/button-img/pressed-button.png';

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    constructor(x) {
        super()
        this.x = x;
        this.y = 380;
        this.width = 50;
        this.height = 50;
        this.animate();

    }
    animate() {
        this.playButton();
    }

//solbald der Charakter auf den Knopf springt wird er animiert
    playButton() {
        setInterval(() => {
            if (!this.buttonIsPressed()) {
                this.loadImage(this.button);
            }
            if (this.buttonIsPressed()) {
                this.loadImage(this.buttonPressed);
            };
        }, 1000 / 60);
    }

    buttonIsPressed() {
        return this.buttonpressed == true;
    }
}