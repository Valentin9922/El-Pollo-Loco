let canvas;
let world;
let keyboard = new Keyboard();

let isPlaying = true;
let jumping_on_chicken = new Audio('audio/jump.mp3')
let throwing_bottle = new Audio('audio/throw_bottle.mp3')
let picking_coin = new Audio('audio/picking_coin.mp3');
let picking_bottle = new Audio('audio/picking_bottle.mp3');
let falling_endboss = new Audio('audio/endboss_is_falling.mp3');
let boss_scream = new Audio('audio/chicken_1.mp3');
let theme_music = new Audio('audio/background_music.mp3');
let bottlesplashsound = new Audio('audio/bottle_spalsh_sound.mp3');
let endbossdiesound = new Audio('audio/Endboss_dead_sound.mp3');
let gamewinningjingle = new Audio('audio/Game_win_sound.mp3');
let walking_sound = new Audio('audio/walking_sand.mp3');
let jumping_sound = new Audio('audio/jump.mp3');
let loosing_sound = new Audio('audio/loosing_sound.mp3');
let GameOver_sound = new Audio('audio/GameOver_sound.mp3');
let Pepehurt_sound = new Audio('audio/player_hurt_sound.mp3');
let winning = false;
let loosing = false;

function init() {
    document.getElementById('main-container').classList.remove('d-none');
    document.getElementById('background-fonts').classList.add('d-none');
    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard)

    setInterval(() => {
        if (isPlaying) {
            theme_music.volume = 0.1;
            theme_music.play();
        }
    }, 1000);
    this.bindKeyPressEvents();
    bindBtnPressEvents();
}
function bindBtnPressEvents() {
    document.getElementById('moveL-btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('moveL-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('moveR-btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('moveR-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('throw-bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D_KEY = true
    });

    document.getElementById('throw-bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D_KEY = false;
    });

    document.getElementById('jump-btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jump-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

function bindKeyPressEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = true;
        }

        if (e.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (e.keyCode == 68) {
            keyboard.D_KEY = true;
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }

        if (e.keyCode == 68) {
            keyboard.D_KEY = false;
        }
    });
}

function reloadPage() {
    location.reload();
}
function fullscreen() {
    canvas.requestFullscreen();
}

//Sorgt dafür das alle Sound oder Musik gestoppt wird
function muteMusic() {
    if (isPlaying == true) {
        isPlaying = false;
        theme_music.pause();
        document.getElementById('music-on').classList.remove('d-none');
        document.getElementById('music-off').classList.add('d-none');
    } else {
        theme_music.play();
        isPlaying = true;
        document.getElementById('music-off').classList.remove('d-none');
        document.getElementById('music-on').classList.add('d-none');
    }
}

//Zeigt den GameOver screen an
function showGameOverscreen() {
    setTimeout(() => {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('button-bar').classList.add('d-none');
        document.getElementById('button-bar2').classList.add('d-none');
        document.getElementById('game-over-container').classList.remove('d-none');
        document.getElementById('controls-container').classList.add('d-none');
        playWinningSound();
        playloosingSound();
        isPlaying = false;
        theme_music.pause();
    }, 1500);
}

//spielt einen Sound ab wenn man das Spiel gewinnt
function playWinningSound() {
    if (winning) {
        gamewinningjingle.play();
        setTimeout(() => {
            gamewinningjingle.pause();
            winning = false;
        }, 2000);
    }
}

//spielt einen Sound ab wenn man das SPiel verliert
function playloosingSound() {
    if (loosing && isPlaying) {
        loosing_sound.volume = 0.1;
        loosing_sound.play();
        GameOver_sound.play();
        setTimeout(() => {
            loosing_sound.pause();
            GameOver_sound.pause();
            loosing = false;
        }, 3000);
    }
}