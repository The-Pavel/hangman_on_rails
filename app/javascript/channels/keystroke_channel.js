import consumer from "./consumer"


document.addEventListener('DOMContentLoaded', ()=>{
  // GRAB AN ELEMENT FROM FRONTEND to GET PARAMS FOR THE
  // SOCKET CONNECTION
  const current_user_id = document.querySelector('h1').dataset.userId
  const channel_id = document.querySelector('[channel]').dataset.channelId

  // If element found
  if (current_user_id) {

  consumer.subscriptions.create({channel: "KeystrokeChannel", channel_id: channel_id, user_id: current_user_id}, {

  connected() {
    console.log('connected')
    let iden = JSON.stringify({channel: "KeystrokeChannel",channel_id: channel_id, user_id: current_user_id})
    let dataToSend = JSON.stringify({ content: "You're on!", user_id: current_user_id})
    consumer.send(
      {identifier: iden,
       command: "message",
       action: "receive",
       data: dataToSend}
       )
      // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(data)
    let user_id = data.user_id
    let match = data.match
    let positions = data.pos
    let word = data.word
    if (match) {
      // if the latest guess was a match update the guessing word and check if game over
      let underscores = document.querySelectorAll('.letter')
      positions.forEach((index) => {
        underscores[index].innerText = word[index].toUpperCase()
      })

      // checking if word is fully guessed
      const letterIsFilled = (currentLetter) => currentLetter != "_";
      let currentLetters = []
      underscores.forEach((node) => {
        currentLetters.push(node.innerText)
      })

      if (currentLetters.every(letterIsFilled)) {
        if (current_user_id == user_id) {
          // winning message for the person sending in the last correct letter
          const h4 = document.querySelector('h4')
          h4.innerHTML = "<span style='color: green;'>You won 🏅!</span>"
        } else {
          // losing message for everyone else
          const h4 = document.querySelector('h4')
          h4.innerHTML = "<span style='color: red;'>You lost 😭!</span>"
        }

      }
    } else {
      // TODO
      // if the latest guess was incorrect
      // 1. show the player making the guess she/he is wrong
      // 2. reduce 1 life
      // 3. check if all lives are lost
      // 4. if so, disable the event listener for 'keyup' for that player
    }


      // adding a div with the key that another person pressed
      // const key = data.key
      // const user = data.user_id
      // const div = document.createElement('div')
      // div.style.width = "500px"
      // div.style.textAlign = "center"
      // div.innerText = key
      // document.body.appendChild(div)

    }

  })
  }
});
