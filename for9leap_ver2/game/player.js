
function addPlayer(scene, ume) {

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
    
    var sound = core.assets["sounds/se_jump_standard.mp3"].clone();
    sound.play();

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

    gameOver(scene);

    let label = new Label();
    label.x = 0;
    label.y = scene.height * 0.4;
    label.text = "劇 終";
    label.color = "#FFFFFF";
    label.font = "64pt 'PixelMplus10'";

    label.textWidth = scene.width;
    label.textAlign = "center";
    scene.addChild(label);
  });
}
