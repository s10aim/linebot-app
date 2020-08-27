// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");
require("bootstrap/dist/js/bootstrap");
require("@fortawesome/fontawesome-free/js/all");

const Dropzone = require("dropzone/dist/dropzone");

document.addEventListener("turbolinks:load", () => {
  const editForm = document.getElementById("edit-form");
  const editBtns = document.querySelectorAll(".edit-btn");
  const postForm = document.getElementById("post-form");

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      editBtn.parentNode.classList.add("d-none");
      editForm.insertAdjacentHTML(
        "afterbegin",
        `<input type="hidden" name="indexes[]" value="${editBtn.id}">`
      );
    });
  });

  if (postForm) {
    document.getElementById("post-dropzone").classList.add("dropzone");

    var postDropzone = new Dropzone("#post-dropzone", {
      url: postForm.action,
      autoProcessQueue: false,
      addRemoveLinks: true,
      uploadMultiple: true,
      dictRemoveFile: "削除",
    });
  }
});

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
