import consumer from "./consumer"


document.addEventListener('DOMContentLoaded', ()=>{
  // GRAB AN ELEMENT FROM FRONTEND to GET PARAMS FOR THE
  // SOCKET CONNECTION
  const current_user_id = document.querySelector('h1').dataset.userId
  const channel_id = document.querySelector('[channel]').dataset.channelId
  const current_players = []

  // If element found
  if (current_user_id) {

    consumer.subscriptions.create({channel: "KeystrokeChannel", channel_id: channel_id, user_id: current_user_id}, {

      connected() {
        console.log('connected')
        let iden = JSON.stringify({channel: "KeystrokeChannel",channel_id: channel_id, user_id: current_user_id})
        let dataToSend = JSON.stringify({ content: "You're on!", user_id: current_user_id, channel_id: channel_id})
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
    // if joining a new game
    if (data.new_game) {
      data.players.forEach(p => {
        if (p != current_user_id && !current_players.includes(p)) {
          current_players.push(data.player_id)
          let newPlayer = document.createElement('div')
          newPlayer.setAttribute('id', `player${data.player_id}`)
          newPlayer.innerHTML = `
          <h3>😈</h3><br>
          <strong>Player ${p}</strong>
          `
          document.querySelector('.opponents').appendChild(newPlayer)
        }
      })
    }

    // adding a new opponent to your board
    if (data.new_player && data.player_id != current_user_id && !current_players.includes(data.player_id)) {
      current_players.push(data.player_id)
      let newPlayer = document.createElement('div')
      newPlayer.setAttribute('id', `player${data.player_id}`)
      newPlayer.innerHTML = `
      <h3>😈</h3><br>
      <strong>Player ${data.player_id}</strong>
      `
      document.querySelector('.opponents').appendChild(newPlayer)
    }
    // Called when there's incoming data on the websocket for this channel
    let notice = document.querySelector('.notice')
    console.log(data)
    let user_id = data.user_id
    let match = data.match
    let positions = data.pos
    let word = data.word
    if (match) {
      // did this user guess the letter?
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

      } else if (!currentLetters.every(letterIsFilled) && user_id == current_user_id) {
        notice.innerHTML = "<span style='color: green;'>Good one! ✅</span>"
        setTimeout(() => {
          notice.innerHTML = "Press Enter when you selected your key!"
        }, 1000)
      }
    } else {

      if (user_id == current_user_id) {
        notice.innerHTML = "<span style='color: red;'>Nope! ❌</span>"
        let livesBox = document.querySelector('.lives')
        let livesCount = document.querySelectorAll('.life').length
        livesBox.innerHTML = "<h4 class='life'><image width=30 height= 30 src='/assets/full-heart.png'/></h4>".repeat(livesCount - 1)
        livesBox.insertAdjacentHTML('beforeend', "<h4 class='empty-life'><image width=30 height= 30 src='/assets/empty-heart.png'/></h4>".repeat(6 - livesCount))
      // 3. check if all lives are lost
      if (livesCount == 1) {
        document.querySelector('.key-pressed').innerHTML = "<span style='color: red;'>Busted! ☠️</span>"
        notice.innerHTML = ""
      } else {
        setTimeout(() => {
          notice.innerHTML = "Press Enter when you selected your key!"
        }, 1000)
      }
    }

    }

  }

})
  }
});
