//ゲーム 1
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
  var ume = createUme(scene);
  umeGroup.addChild(ume);


  //プレイヤーを追加
  addPlayer(scene, ume);


  //ゲーム
  switch (getRandom(1, 3)) {
    case 1:
    default:
      test1(ume);
      break;

    case 2:
      test2(umeGroup, ume);
      break;

    case 3:
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
}
