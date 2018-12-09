var assets = [
    //image
    "images/title.png",// タイトル
    "images/do_daruma.png",
    "images/hat_tanu.png",
    "images/hat_ume.png",
    //sound
    "sounds/bgm_gameover_1.mp3",
    "sounds/jingle_1up.mp3",
    "sounds/se_discovery_1.mp3",
    "sounds/se_gyuin.mp3",
    "sounds/se_jump_standard.mp3",
    "sounds/se_pyuun.mp3",
    "sounds/se_quizright_1.mp3",
];

var scenes = [game1, game2];
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

    //遅延して画面遷移
    scene.tl.delay(core.fps);
    scene.tl.then(function(){
      goNextScene();
    });

    //ラベル表示
    let text = "STAGE: " + (score + 1);
    showLabel(text, 32);


    //ラベル表示処理
    function showLabel(text, fontSize) {
      if (fontSize === void 0 /* undefined */) {
        fontSize = 32;
      }

      if (text === void 0 /* undefined */) {
        return;
      }


      var label = new Label();

      label.color = "white";
      label.font = fontSize + "pt 'PixelMplus10'";
      label.width = scene.width;
      label.textAlign = "center";

      label.x = 0;
      label.y = scene.height * 0.5 - (fontSize * 0.5);

      label.text = text;

      scene.addChild(label);
    }
  }
}


//ゲームクリア
function gameClear() {

  //TODO: 音
  var sound = core.assets["sounds/jingle_1up.mp3"].clone();
  sound.play();

  score++;
  nextScene();
}


//ゲームオーバー (半透明の黒を被せてみた)
function gameOver(scene, isShowGameOver, buttonColor, textColor) {

  //TODO: 音
  var sound = core.assets["sounds/bgm_gameover_1.mp3"].clone();
  sound.play();

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


  //Retryボタン
  showUIRetry(scene, buttonColor, textColor, function(){

    //TODO: 音
    var sound = core.assets["sounds/se_gyuin.mp3"].clone();
    sound.play();

    //スコアリセット
    score = 0;

    //ページ遷移して、ゲーム再開
    nextScene();
    core.resume();
  });

  //Score送信ボタン
  showUIEnd(scene, buttonColor, textColor, function(){

    //TODO: 音
    var sound = core.assets["sounds/se_discovery_1.mp3"].clone();
    sound.play();

    //nineleap スコア送信
    core.end(score, "score" + score);
  });


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

  scene.addEventListener(enchant.Event.TOUCH_START, function(){

    //TODO: 音
    var sound = core.assets["sounds/se_gyuin.mp3"].clone();
    sound.play();

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
