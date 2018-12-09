//ゲーム 2
function game2() {
  console.log("Game2");

  var scene = new Scene();
  core.replaceScene(scene);

  //game
  game2Main(scene);

  //score
  showUIScore(scene);
}


//ゲーム部分
function game2Main(scene) {

  scene.backgroundColor = "gray";

  var umeGroup = new Group();
  scene.addChild(umeGroup);

  //敵の梅ちゃん
  var ume = createUme(scene);
  umeGroup.addChild(ume);

  //プレイヤーを追加
  addPlayer(scene, ume);


  switch (getRandom(1, 3)) {
    case 1:
    default:
      test1(ume, 10.0);
      break;

    case 2:
      test1(ume, 15.0);
      break;
  }


  //敵 梅ちゃん の 移動テスト(1)
  function test1(obj, speed) {
    let height = 100;

    let dx = scene.width * 0.2;
    let time = Math.sqrt(dx * dx) / speed;

    //アクション！
    obj.tl.moveBy(-(dx * 0.5), 0.0, time);
    obj.tl.then(function() {
      test2();
    });

    function test2() {

      var isJump = getRandom(1, 2) % 2 == 0;

      obj.tl.delay(core.fps * 0.5);

      obj.tl.moveBy(-(dx), 0.0, time);
      if (isJump) {
        obj.tl.and();
        obj.tl.moveBy(0.0, -(height), time, enchant.Easing.QUAD_EASEOUT);
      }

      obj.tl.moveBy(-(dx), 0.0, time);
      if (isJump){
        obj.tl.and();
        obj.tl.moveBy(0.0, +(height), time, enchant.Easing.QUAD_EASEIN);
      }

      obj.tl.then(function() {
        console.log("test");

        if ((obj.x - obj.width) < 0) {
          gameClear();
        } else {
          test2();
        }
      });
    }
  }
}
