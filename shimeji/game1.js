// ゲーム1
function game1() {
  console.log("Game1");

  var scene = new Scene();
  core.replaceScene(scene);

  //game
  game1Main(scene);

  //score
  showUIScore(scene);
}


//ゲーム部分
function game1Main(scene) {

  scene.backgroundColor = "gray";

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
    default:
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
  }


  //敵 梅ちゃん の 移動テスト(1)
  function test1(obj) {
      obj.tl.moveBy(-(scene.width + ume.width), 0, core.fps * 3);
      obj.tl.then(function() {
        obj.x = scene.width;
        //test1(obj);
        gameClear();
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
        gameClear();
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
      gameClear();
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

    gameOver(scene);
  });
}
