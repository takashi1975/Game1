//ゲーム 3
function game3() {
  console.log("Game3");

  var scene = new Scene();
  core.replaceScene(scene);

  //game
  game3Main(scene);

  //score
  showUIScore(scene);
}


//ゲーム部分
function game3Main(scene) {

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
}
