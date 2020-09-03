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
const maxFiles = 10;
const maxFilesize = 30;

document.addEventListener("turbolinks:load", () => {
  const editForm = document.getElementById("edit-form");
  const editBtns = document.querySelectorAll(".edit-btn");
  const postForm = document.getElementById("post-form");
  const changeForm = document.getElementById("change-form");

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      editBtn.parentNode.classList.add("d-none");
      postForm.insertAdjacentHTML(
        "afterbegin",
        `<input type="hidden" name="indexes[]" value="${editBtn.id}">`
      );
    });
  });

  if (changeForm) {
    changeForm.addEventListener("click", () => {
      postForm.classList.toggle("d-none");
      editForm.classList.toggle("d-none");
    });
  }

  if (postForm) {
    document.getElementById("post-dropzone").classList.add("dropzone");

    var postDropzone = new Dropzone("#post-dropzone", {
      url: postForm.action,
      autoDiscover: false,
      autoProcessQueue: false,
      addRemoveLinks: true,
      dictRemoveFile: "削除",
      uploadMultiple: true,
      parallelUploads: maxFiles,
      maxFilesize: maxFilesize,
      dictFileTooBig: `ファイルサイズは最大${maxFilesize}MBです`,
      maxFiles: maxFiles,
      dictMaxFilesExceeded: `ファイルの最大数は${maxFiles}です`,
      dictDefaultMessage: "Click here to upload images",
    });

    document.getElementById("post-btn").addEventListener("click", (e) => {
      if (postDropzone.getQueuedFiles().length > 0) {
        e.preventDefault();
        e.stopPropagation();
        document
          .querySelectorAll(".dropzone .dz-preview .dz-remove")
          .forEach((el) => {
            el.style.display = "none";
          });
        postDropzone.processQueue();
      }
    });

    postDropzone.on("sendingmultiple", function (data, xhr, formData) {
      document.querySelectorAll("#post-form input").forEach((e) => {
        formData.append(e.name, e.value);
      });
    });

    postDropzone.on("success", () => {
      location.href = `/posts`;
    });
  }
});

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
