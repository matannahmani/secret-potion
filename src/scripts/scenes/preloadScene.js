export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // loads audio + images
    this.load.image('container', 'assets/img/slotContainer.png');
    this.load.image('spinBTN', 'assets/img/button_spin.png');
    this.load.image('stopBTN', 'assets/img/button_stop.png');
    for (var i = 1; i <=4; i++) {
      this.load.image(`potion${i}`, `assets/img/potion${i}.png`)
    }
    this.load.audio('bgMUSIC', 'assets/sound/BG_Music.wav');
    this.load.audio('spinEFFECT', 'assets/sound/Spin.wav');
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
