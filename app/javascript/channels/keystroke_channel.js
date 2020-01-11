import consumer from "./consumer"



consumer.subscriptions.create("KeystrokeChannel", {
  connected() {

    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const key = data.key
    const div = document.createElement('div')
    div.style.width = "500px"
    div.style.textAlign = "center"
    div.innerText = key
    document.body.appendChild(div)
    // Called when there's incoming data on the websocket for this channel
  }
});
