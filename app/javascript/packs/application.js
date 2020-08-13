// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("bootstrap/dist/js/bootstrap")
require("@fortawesome/fontawesome-free/js/all")
require("./long-press-event")

document.addEventListener("turbolinks:load", () => {
  const editForm = document.getElementById('edit-form')
  const editImages = document.querySelectorAll(".edit-img")
  const editBtns = document.querySelectorAll('.edit-btn')

  editImages.forEach((el) => {
    el.addEventListener("long-press", () => {
      editBtns.forEach((ele) => {
        ele.classList.remove("d-none")
      })
    })
  })

  editBtns.forEach((el) => {
    el.addEventListener("click", () => {
      el.parentNode.classList.add("d-none")
      editForm.insertAdjacentHTML('afterbegin', `<input type="hidden" name="indexes[]" value="${el.id}">`)
    })
  })
})


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)