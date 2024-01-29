class StatusBarCoins extends StatusBar {

    images_statusbar = [
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',

    ];

    percentage = 100;

    constructor() {
        super().loadImage('img/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.images_statusbar);
        this.x = 0
        this.y = 100;
        this.height = 60;
        this.width = 200;
        this.setPercentage(0,)
    }   
}
