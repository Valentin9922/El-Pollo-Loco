class StatusBarEndboss extends StatusBar {

    images_statusbar = [
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.images_statusbar);
        this.x = 500
        this.y = 60;
        this.height = 60;
        this.width = 0
        this.setPercentage(100)
    }
}