var assets = [
    "images/title.png",// タイトル
    "images/do_daruma.png",
    "images/hat_tanu.png",
    "images/hat_ume.png",
];

//(仮)スコア ... どこかで存在させる
var score = 0;

//(仮)みんなに呼んでもらうメソッド
function showUI(scene) {
  showScore(scene, "white", "24pt 'PixelMplus10'", score);
}

//内部
function showScore(scene, color, font, score) {

  var label = new Label();

  label.color = color;
  label.font = font;
  label.width = scene.width;
  label.textAlign = "right";

  var sp = 10;
  label.x = -sp;
  label.y = +sp;

  label.text = "SCORE: " + score;

  scene.addChild(label);

  return label;
}


function gameStart(){
    // ゲーム画面
    scene = new Scene();
    core.replaceScene(scene);
    core.resume();

    //==========
    // ここから
    //==========

    scene.backgroundColor = "gray";

    //技術的調査1
    //1. addChild
    //2. moveBy
    //3. frame

    //技術的調査2
    //1. group
    //2. addCollision
    //3. addEventListener

    //技術的調査3
    //1. delay
    //2. then
    //3. function
    //4. loop


    var umeGroup = new Group();
    scene.addChild(umeGroup);

    //敵の梅ちゃん
    var ume = new Sprite(32, 32);
    ume.image = core.assets["images/hat_ume.png"];
    ume.x = scene.width;
    ume.y = scene.height * 0.75 - ume.height;
    ume.frame = [ 3, 3, 2, 2, 1, 1, 0, 0, ];
    umeGroup.addChild(ume);

    //
    var label = new Label();
    label.x = 0.0;
    label.y = 10;
    label.text = "";
    label.textWidth = scene.width;
    label.textAlign = "center";
    scene.addChild(label);

    switch (getRandom(1, 3)) {
      case 1:
        label.text = "test1";
        test1(ume);
        break;
      case 2:
        label.text = "test2";
        test2(umeGroup, ume);
        break;
      case 3:
        label.text = "test3";
        test3(ume, 10.0);
        break;
      default:
        gameStart();
    }

    showUI(scene);


    //敵 梅ちゃん の 移動テスト(1)
    function test1(obj) {
        obj.tl.moveBy(-(scene.width + ume.width), 0, core.fps * 3);
        obj.tl.then(function() {
          obj.x = scene.width;
          //test1(obj);
          score++;
          gameStart();
        });
    }

    //敵 梅ちゃん の 移動テスト(2)
    function test2(grp, obj) {
        grp.tl.moveBy(-(scene.width + ume.width), 0, core.fps * 3);

        obj.tl.delay( core.fps * 1.5);
        obj.tl.moveBy(0, -100, core.fps * 0.5, enchant.Easing.QUAD_EASEOUT);
        obj.tl.moveBy(0, +100, core.fps * 0.5, enchant.Easing.QUAD_EASEIN);

        grp.tl.then(function() {
          grp.x = 0;
          //test2(grp, obj);
          score++;
          gameStart();
        });
    }

    //敵 梅ちゃん の 移動テスト(3)
    function test3(obj, speed) {

      let height = 100;

      let dx1 = scene.width * 0.5;
      let time1 = Math.sqrt(dx1 * dx1) / speed;

      let dx2 = scene.width * 0.2;
      let time2 = Math.sqrt(dx2 * dx2) / speed;

      let dx3 = scene.width * 0.1;
      let time3 = Math.sqrt(dx3 * dx3) / speed;


      obj.tl.moveBy(-(dx1), 0.0, time1);

      obj.tl.moveBy(-(dx2), 0.0, time2);
      obj.tl.and();
      obj.tl.moveBy(0.0, -(height), time2, enchant.Easing.QUAD_EASEOUT);

      obj.tl.moveBy(-(dx2), 0.0, time2);
      obj.tl.and();
      obj.tl.moveBy(0.0, +(height), time2, enchant.Easing.QUAD_EASEIN);

      obj.tl.moveBy(-(dx3), 0.0, time3);

      obj.tl.then(function() {
        obj.x = scene.width;
        //test3(obj, speed);
        score++;
        gameStart();
      });
    }


    //プレイヤー
    var tanu = new Sprite(32, 32);
    tanu.image = core.assets["images/hat_tanu.png"];
    tanu.x = scene.width * 0.3;
    tanu.y = scene.height * 0.75 - tanu.height;
    tanu.isJump = false;
    scene.addChild(tanu);

    //タップしたら...
    scene.addEventListener(Event.TOUCH_START, function(e){
      //たぬきがジャンプ中なら...処理しない
      if (tanu.isJump) {
        return;
      }

      //たぬきがジャンプ (空中で滞留)
      let jumpHeight = 100;
      tanu.isJump = true;

      tanu.tl.moveBy(0, -jumpHeight, core.fps * 0.2);
      tanu.tl.delay(core.fps * 0.7);
      tanu.tl.and();
      tanu.tl.then(function(){
        this.frame = [ 1, 3, 1, 3, ];
      });
      tanu.tl.then(function(){
        this.frame = [0];
      });
      tanu.tl.moveBy(0, +jumpHeight, core.fps * 0.2);
      tanu.tl.then(function(){
        this.isJump = false;
      });
    })


    //敵との当たり判定
    tanu.addCollision(ume);
    tanu.addEventListener(Event.COLLISION, function(){
      console.log("collision !!");

      let label = new Label();
      label.x = 0;
      label.y = scene.height * 0.4;
      label.text = "劇 終";
      label.color = "#FFFFFF";
      label.font = "64pt 'PixelMplus10'";

      label.textWidth = scene.width;
      label.textAlign = "center";
      scene.addChild(label);

      core.stop();
    });

    //==========
    // ここまで
    //==========
}

function titleStart(){// タイトル画面
    var scene = gameManager.createTitleScene();
    core.replaceScene(scene); core.pause();
    scene.on(enchant.Event.TOUCH_START, function(){gameStart();});
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
