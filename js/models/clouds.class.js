class Clouds extends MovableObject {
    y = 30;
    width = 900;
    height = 350;
    speed = 0.1;

    constructor() {
        super().loadImage('img/img_pollo_locco/img/5_background/layers/4_clouds/1.png')
        this.x = 1 + Math.random() * 500
        this.animate();
    }

//Die Wolken sollen sich langsam nach links bewegen
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}







