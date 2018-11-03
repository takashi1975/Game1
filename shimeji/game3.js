// ゲーム3
function game3(){
  console.log("Game3");
  var scene = new Scene();
  core.replaceScene(scene);
  scene.backgroundColor = "yellow";
  scene.on(Event.TOUCH_START, function(){nextScene();});
}