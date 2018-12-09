//スコア送信ボタン
var endButton;

//ボタンのラベル
var endButtonLabel;


//みんなに呼んでもらうメソッド
/**
 * ボタンの色を設定
 *
 * buttonColor: ボタンの色
 * textColor: ラベルの文字色
 * listener: ボタンをクリックした時の処理
 */
function setUIEnd(buttonColor, textColor) {

  //ボタン色
  if ((buttonColor != undefined) && (endButton != undefined)) {
    endButton.backgroundColor = buttonColor;
  }

  //ラベル色
  if ((textColor != undefined) && (endButtonLabel != undefined)) {
    endButtonLabel.color = textColor;
  }
}


//みんなに呼んでもらうメソッド
/**
 * [Score Send]ボタン を画面に表示
 *
 * scene: 現在表示しているscene
 * buttonColor: ボタンの色
 * textColor: ラベルの文字色
 */
function showUIEnd(scene, buttonColor, textColor, listener) {

  if (buttonColor === void 0 /* undefined */) {
    buttonColor = "white";
  }

  if (textColor === void 0 /* undefined */) {
    textColor = "black";
  }

  //処理
  showButton(scene, "Score Send", textColor, "16pt 'PixelMplus10'", buttonColor, 115, 25);


  //内部関数(実処理部分)
  function showButton(scene, text, textColor, font, buttonColor, width, height) {

    var group = new Group();
    scene.addChild(group);

    //ボタン(背景)
    var button = new Sprite(width, height);
    button.backgroundColor = buttonColor;
    button.x = scene.width * 0.5 + ((scene.width * 0.5) - button.width) * 0.5;
    button.y = (scene.height * 0.9) - button.height * 0.5;
    group.addChild(button);

    //ラベル
    var label = new Label();
    label.color = textColor;
    label.font = font;
    label.textAlign = "center";

    label.width = button.width;
    label.height = button.height;
    label.x = button.x;
    label.y = button.y;
    label.touchEnabled = false;

    label.text = text;

    group.addChild(label);


    //タップした時の処理
    // button.addEventListener(Event.TOUCH_START, function(e){
    //   //ポーズにすると...色も変えられない
    // });

    button.addEventListener(Event.TOUCH_END, function(e){
      listener();
    });


    //変数に格納
    endButton = button;
    endButtonLabel = label;
  }
}
