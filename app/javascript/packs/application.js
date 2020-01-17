// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//= require cable

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


document.addEventListener('DOMContentLoaded', () => {

  // showing the key pressed to the user who pressed it
  document.addEventListener('keyup', (e) => {
    const key = e.key
    let livesCount = document.querySelectorAll('.life').length
    if (livesCount != 0) {
      if (key.toUpperCase() != "ENTER") {
      document.querySelector('.key-pressed').innerText = key.toUpperCase()
      }
    }

  })







  // adding dashes for word letters
  const word = document.querySelector('.word')
  let length = Number.parseInt(word.dataset.num, 10)
  word.innerHTML = "<h2 class='letter'>_</h2>".repeat(length)










})
