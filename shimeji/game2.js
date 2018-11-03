// ゲーム2
function game2(){
  console.log("Game2");
  var scene = new Scene();
  core.replaceScene(scene);
  scene.backgroundColor = "blue";
  scene.on(Event.TOUCH_START, function(){nextScene();});
}