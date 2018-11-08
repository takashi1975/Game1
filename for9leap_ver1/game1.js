// ゲーム1
function game1(){
  console.log("Game1");
  var scene = new Scene();
  core.replaceScene(scene);
  scene.backgroundColor = "red";
  scene.on(Event.TOUCH_START, function(){nextScene();});
}