var assets = [
    "images/title.png",// タイトル
    "images/do_daruma.png",
    "images/hat_tanu.png",
    "images/hat_ume.png",
];

var scenes = [game1, game2, game3];

function nextScene(){
  let index = Math.floor(Math.random()*scenes.length);
  scenes[index]();
}

function titleStart(){// タイトル画面
    var scene = gameManager.createTitleScene();
    core.replaceScene(scene); core.pause();
    scene.on(enchant.Event.TOUCH_START, function(){nextScene();});
}

//==========
// EnchantJS
enchant();
var gameManager;
var core;
var scene;
window.onload = function(){
    gameManager = new common.GameManager();
    core = gameManager.createCore(320, 320);
    core.preload(assets);
    core.onload = function(){titleStart();};
    core.start();
}
