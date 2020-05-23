export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
    this.columns = []; // this the reel group when create fuction is called it addeds the symbols to the reel
    this.active = false; // default vals
    this.stopbtn = {clickable: false,pauseable: false}; // default vals
    this.timers = []; // this the reels timer so each reel fires at a diffrent time
  // async/await
    this.pause = ms => { // basic es6 pause func
      return new Promise(resolve => {
        window.setTimeout(() => {
          resolve()
        }, ms)
      })
    }
    this.spin = async () => { // starts the spin for all the reels
      for (let i=0;i<=4;i++){
        console.log(new Date().getSeconds()) // log current seconds
        this.timers.push(this.time.addEvent({ // this fires a reel spin
          delay: 62.5,                // ms working values 62.5 by 32 spins
          callback: this.spincolumn,
          args: [i],
          callbackScope: this,
          repeat: 32
      }));
        await this.pause(100); // 0.1 second delay between each reel
      }
    }
    this.spincolumn = (column) =>{ // reel spin gets a column number and spins it untill timer is done
      this.columns[column].children.entries.forEach((symbol,number)=> {
         if(this.timers[column] === undefined|| this.timers[column].repeatCount === 0){ // check if last spin for current reel
          console.log(new Date().getSeconds()); // compare to see if hit 2 seconds
          switch (number) { // here you choose each symbol location
            case 1: // symbol 1
              this.tweens.add({ // set symbol to design position
                                // posibility to rewrite the tweens to a function which will take symbol and y so wont need to rewrite same functions
                                // kept it for sake of understanding
                targets: symbol,
                y: -250,
                ease: 'Linear',
                duration: 10,
                repeat: 0
              });
              break;
            case 0: // symbol 2
              this.tweens.add({ // set symbol to design position
                targets: symbol,
                y: -250+140,
                ease: 'Linear',
                duration: 10,
                repeat: 0
              });
              break;
            case 2: // symbol 3
              this.tweens.add({ // set symbol to design position
                targets: symbol,
                y: -250+2*140,
                ease: 'Linear',
                duration: 10,
                repeat: 0
              });
              break;
              case 3: // symbol 4
                this.tweens.add({ // set symbol to design position
                  targets: symbol,
                  y: -250+3*140,
                  ease: 'Linear',
                  duration: 10,
                  repeat: 0
                });
                break;
          }
           if(column === 4 && number === 3) { // checks if current reel is last reel and last symbol
             this.timers = [];
             this.spinbtn.alpha = 1;
             this.active = false;
             this.spinbtn.setTexture('spinBTN');
             this.stopbtn = {clickable: false,pauseable: false,}
           }
         }
         else { // spins the reel mimik it by lowering each symbol half of current hight
                // when reaches bottom teleport to top
           if (symbol.y < 239){ // if below bottom
             this.tweens.add({
               targets: symbol,
               y: '+=70',
               ease: 'Linear',
               duration: 10,
               repeat: 0
             });
           }
           else // reached bottom
             this.tweens.add({ // teleports to top
               targets: symbol,
               y: -249,
               ease: 'Linear',
               duration: 10,
               repeat: 0
             });
           }
         });
       }
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
    this.spinbtn.on('pointerdown', async () => { // spin button event listener checks if pressed
      if (this.active === false){ // if spin state is not running
      this.spinbtn.setAlpha(0.5); // 50% opacity for spin button
      this.active = true; // start spin
      spinsound.play(); // play sound
      this.spin();
      await this.pause(1000);
      this.stopbtn.clickable = true;
      }
      else if (this.stopbtn.pauseable && this.active === true) // checks spin is running and if user clicked btn again
      { // RESET SPIN                                         // while 1 second pass from start of the spin
        this.stopbtn = {clickable: false,pauseable: false,}
        this.timers.forEach(((timer) => timer.repeatCount = 8)); // set spins to 8 so will get nice last spin effect
        // this.timers.forEach((timer) => (timer.repeatCount > 8 && timer.repeatCount < 10) ? timer.repeatCount = 6 : timer.repeatCount = 8) // set repeat Count to 4 so end with smooth
      }
      else if (this.stopbtn.clickable){ // spin is active and user clicked again switch to stop btn and 1 second pass from start
        this.spinbtn.setTexture('stopBTN');
        this.stopbtn.pauseable = true;
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
