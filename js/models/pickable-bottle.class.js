class PickableBottle extends DrawableObject {

    offset = {
        top: 10,
        left: 30,
        right: 10,
        bottom: 10,
    };

    constructor(x, y) {
        super().loadImage('img/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.checkBottleIsCollected()
    }

//solbald die Salsa Flasche aufgesammelt wird, verschwindet sie
    checkBottleIsCollected() {
        setInterval(() => {
            if (this.objectCollected == 0) {
                this.objectDisapear();
            }
        }, 1000 / 10);
    }
}