// ゲーム1
function game1(){
  console.log("Game1");
  var scene = new Scene();
  core.replaceScene(scene);
  scene.backgroundColor = "red";
  scene.on(Event.TOUCH_START, function(){nextScene();});
}

// ゲーム2
function game2(){
  console.log("Game2");
  var scene = new Scene();
  core.replaceScene(scene);
  scene.backgroundColor = "blue";
  scene.on(Event.TOUCH_START, function(){nextScene();});
}

// ゲーム3
function game3(){
  console.log("Game3");
  var scene = new Scene();
  core.replaceScene(scene);
  scene.backgroundColor = "yellow";
  scene.on(Event.TOUCH_START, function(){nextScene();});
}