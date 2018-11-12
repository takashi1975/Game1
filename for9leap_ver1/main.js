var assets = [
    "images/title.png",// タイトル
    "images/do_daruma.png",
    "images/hat_tanu.png",
    "images/hat_ume.png",
];

var scenes = [game1, game2, game3];
//画面遷移 (ランダム)
function nextScene() {

  //処理切り替えフラグ
  let isShowStage = true;

  if (isShowStage) {
    //次のステージ番号を表示
    showNextStage();
  } else {
    //画面戦
    goNextScene();
  }


  //画面遷移
  function goNextScene() {
    let index = Math.floor(Math.random()*scenes.length);
    scenes[index]();
  }

  //次のステージ番号を表示
  function showNextStage() {

    var scene = new Scene();
    scene.backgroundColor = "black";
    core.replaceScene(scene);


    var label = new Label();

    label.color = "white";
    label.font = "32pt 'PixelMplus10'";
    label.width = scene.width;
    label.textAlign = "center";

    label.x = 0;
    label.y = scene.height * 0.5 - (32 * 0.5); //32...フォントサイズ

    label.text = "STAGE: " + (score + 1);

    scene.addChild(label);


    //遅延して画面遷移
    scene.tl.delay(core.fps);
    scene.tl.then(function(){
      goNextScene();
    });
  }
}


//ゲームクリア
function gameClear() {
  score++;
  nextScene();
}

//ゲームオーバー (半透明の黒を被せてみた)
function gameOver(scene, isShowGameOver, buttonColor, textColor) {

  //半透明
  var layer = new Sprite(scene.width, scene.height);
  layer.backgroundColor = "#00000080";
  scene.addChild(layer);

  //スコアを上書き
  showUIScore(scene);

  //ゲームオーバー 表記
  if ((isShowGameOver != undefined) && (isShowGameOver == true)) {
    showUIGameOverLabel("GAME OVER", 48, 12.5);
  }

  //Retry?
  showUIRetry(scene, buttonColor, textColor);

  //一時停止
  core.pause();


  //ラベル表示
  function showUIGameOverLabel(text, fontSize, dx) {

    if (text === void 0 /* undefined */) {
      text = "GAME OVER";
    }

    if (fontSize === void 0 /* undefined */) {
      fontSize = 32;
    }

    if (dx === void 0 /* undefined */) {
      dx = 0;
    }

    let label = new Label();
    label.x = 0 + dx;
    label.y = (scene.height - fontSize) * 0.5;
    label.color = "#FFFFFF";
    label.font = fontSize + "pt 'PixelMplus10'";

    label.textWidth = scene.width;
    label.textAlign = "center";
    label.text = text;

    scene.addChild(label);
  }
}


// タイトル画面
function titleStart(){
  var scene = gameManager.createTitleScene();
  core.replaceScene(scene);
  //core.pause();
  scene.on(enchant.Event.TOUCH_START, function(){
    nextScene();
  });
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
