export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
    this.columns = [];
    this.active = false; // default vals
    this.stopbtn = false; // default vals
  }

  create() {
    // SOUND LOADING
    this.sound.add('bgMUSIC').setLoop(true).play(); // add background music to the scene, set loop then play
    const spinsound = this.sound.add('spinEFFECT'); //  add spin sound effect
    //
    // SPRITES & IMAGES LOAD + DRAW
    this.spinbtn = this.add.image(0,300, 'spinBTN').setInteractive(); // draw spinbtn set Interactive true
    const container = this.add.image(0,0, 'container');// loads container to canvas
    this.cameras.main.centerOn(0,0); // center camera to container
      // DRAW RECTANGLE MASK to hide overflow
    const rect = new Phaser.Geom.Rectangle(-327,-180, 694, 419); // create rect inside container
    const graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } }); // create graphics of rect with color
    graphics.fillRectShape(rect).setVisible(false); // fill the rect and set to invisible
    // draw potions symbols
    for(let j=0;j<5;j++){ // loop 5 times
      this.columns[j] = this.add.group(); // create column group (reel)
      for(let i=0;i<4;i++){
        const potion = this.add.tileSprite(-257+j*139,-247+i*139,140,140,`potion${i+1}`); // pink symbols are a bit weried
        potion.name = `pot${i+1}`
        potion.mask = new Phaser.Display.Masks.BitmapMask(this, graphics); // add mask to each sprite [block overflow]
        this.columns[j].add(potion); // add symbol to column group (reel)
      }};
    // SPIN BTN Press and game state checks
    this.spinbtn.on('pointerdown', () => { // spin button event listener checks if pressed
      if (this.active === false){ // if spin state is not running
      this.spinbtn.setAlpha(0.5); // 50% opacity for spin button
      this.active = true; // start spin
      spinsound.play(); // play sound
      }
      else if (this.stopbtn && this.active === true) // checks spin is running and if user clicked btn again
      { // RESET SPIN
        console.log('test')
        this.spinbtn.setTexture('spinBTN');
        this.stopbtn = false;
        // load last spin here in future
      }
      else{ // spin is active and user clicked again switch to stop btn
        this.spinbtn.setTexture('stopBTN');
        this.stopbtn = true;
      }});
  }

  update() {

  }
}







// pseudo code
// ------------- basic -start with
// loop background music
// when spin button is clicked play sound effect lower alpha (opcaity) set spin active
// check if spin is active ? (Running)
// if spin active and spin button pressed change texture to stopBTN
// if stopBTN pressed stop spin load last round animation? | reset all props to start
// ------------- middle -after finish (search about mask and rectangle?)
// draw container set camera location to container
// set mask over container mageta color (symbols location)
// ------------- last part (search about tween + timers | maybe timeout during for loop?)
// loop symbols from top to button with half the symbol height jumps? ||| this is every round
// check if last round ? if last round tween symbols to desired position

  // async/await example
/*    const pause = ms => {
      return new Promise(resolve => {
        window.setTimeout(() => {
          resolve()
        }, ms)
      })
    }
    const asyncFunction = async () => {
      console.log('Before Pause')
      await pause(4000) // 4 seconds pause
      console.log('After Pause')
    }
    asyncFunction()*/
