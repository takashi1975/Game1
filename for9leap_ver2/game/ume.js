
function createUme(scene) {

  var ume = new Sprite(32, 32);
  ume.image = core.assets["images/hat_ume.png"];
  ume.x = scene.width;
  ume.y = scene.height * 0.75 - ume.height;
  ume.frame = [ 3, 3, 2, 2, 1, 1, 0, 0, ];

  return ume;
}
