class StatusbarIconEndboss extends DrawableObject {
    x = 480;
    y = 62;
    width = 0;
    height = 70;
    imageIconEnbossStatusbar = [
        'img/img_pollo_locco/img/7_statusbars/3_icons/icon_health_endboss.png',
    ];

    constructor() {
        super().loadImage(this.imageIconEnbossStatusbar);
    }
}