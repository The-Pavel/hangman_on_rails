import consumer from "./consumer"



document.addEventListener('DOMContentLoaded', ()=>{
  // GRAB AN ELEMENT FROM FRONTEND to GET PARAMS FOR THE
  // SOCKET CONNECTION
  const current_user = document.querySelector('h1')
  const channel_id = document.querySelector('[channel]').dataset.channelId

  // If element found
  if (current_user){consumer.subscriptions.create({channel: "KeystrokeChannel", channel_id: channel_id}, {
  connected() {

    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const key = data.key
    const user = data.user_id


      const div = document.createElement('div')
      div.style.width = "500px"
      div.style.textAlign = "center"
      div.innerText = key
      document.body.appendChild(div)

    // Called when there's incoming data on the websocket for this channel
  }

  })
}
    });
