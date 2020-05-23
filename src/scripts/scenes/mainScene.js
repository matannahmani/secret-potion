import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

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
