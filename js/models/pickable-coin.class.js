class PickableCoin extends DrawableObject {

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    constructor(x, y) {
        super().loadImage('img/img_pollo_locco/img/8_coin/coin_1.png');
        this.x = x;
        this.y = 100 + Math.random() * 120;
        this.width = 120;
        this.height = 120;
        this.objectCollected = 1
        this.checkCoinIsCollected();
    }

//solbald der Coin aufgesammelt wird, verschwindet er
    checkCoinIsCollected() {
        setInterval(() => {
            if (this.objectCollected == 0) {
                this.objectDisapear();
            }
        }, 1000 / 10);
    }
}

