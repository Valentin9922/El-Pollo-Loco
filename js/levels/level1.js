
const level1 = new Level(
 
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
    ],

    [ 
        new Clouds()
    ],

    [ 
        new PickableCoin(300),
        new PickableCoin(350),
        new PickableCoin(400),
        new PickableCoin(620),
        new PickableCoin(670),
        new PickableCoin(3000),
        new PickableCoin(2900),
        new PickableCoin(980),
        new PickableCoin(1250),
        new PickableCoin(1800),
    ],

    [ 
        new PickableBottle(870, 350),
        new PickableBottle(1300, 350),
        new PickableBottle(1500, 350),
        new PickableBottle(2700, 350),
        new PickableBottle(3300, 350)
    ],
    
    
    [
       new SpawnEndbossButton(3500),   
    ],

    [
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png', 0 ),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png',719, 0 ),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/2.png',719, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/2.png',719, 0),

        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png', 719*2, 0 ),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719*2, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719*2, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/1.png',719*2, 0),
        
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png',719 *3, 0 ),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 *3, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/2.png',719 *3, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/2.png',719 *3, 0),

        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png',719 *4, 0 ),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 *4, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/1.png',719 *4, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/1.png',719 *4, 0),

        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/air.png',719 *5, 0 ),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 *5, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/2_second_layer/2.png',719 *5, 0),
        new BackgroundObject('img/img_pollo_locco/img/5_background/layers/1_first_layer/2.png',719 *5, 0),
    ],
);