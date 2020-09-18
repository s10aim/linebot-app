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
  const postTextform = document.getElementById("post-text-form");
  const editBtns = document.querySelectorAll(".edit-btn");
  const postForm = document.getElementById("post-form");
  const changeForm = document.getElementById("change-form");
  const postDropzoneId = document.getElementById("post-dropzone");
  const textFormtitle = document.getElementById("post-text-title");
  const dropFormtitle = document.getElementById("post-drop-title");
  const formContent = document.getElementById("post_content");
  const postDropbtn = document.getElementById("post-drop-btn");
  const postTextbtn = document.getElementById("post-text-btn");
  const editDropbtn = document.getElementById("edit-drop-btn");
  const editTextbtn = document.getElementById("edit-text-btn");
  const keywords = document.getElementById('keywords')
  let keywordList

  // 新規投稿 & 編集
  if (keywords) {
    keywordList = JSON.parse(keywords.dataset.keywords)
  }

  // 新規投稿＆編集（Dropzoneあり）
  if (postDropzoneId) {
    postDropzoneId.classList.add("dropzone");

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

    postDropzone.on("sendingmultiple", function (data, xhr, formData) {
      document.querySelectorAll("#post-form input").forEach((e) => {
        formData.append(e.name, e.value);
      });
    });

    postDropzone.on("success", () => {
      location.href = `/posts`;
    });
  }

  // 新規投稿＆編集（Dropzoneなし）
  if (formContent) {
    [textFormtitle, formContent].forEach((form) => {
      form.addEventListener("keyup", () => {
        const keyword = textFormtitle.value
        const isKeywordDuplicate = keywordList.some(el => el == keyword)
        const textFormTitleEmpty = !textFormtitle.value
        const textContentTitleEmpty = !formContent.value

        if (isKeywordDuplicate) {
          textFormtitle.classList.add('is-invalid')
        } else {
          textFormtitle.classList.remove('is-invalid')
        }

        if (postTextbtn) {
          postTextbtn.disabled = (isKeywordDuplicate || textFormTitleEmpty || textContentTitleEmpty);
        } else {
          editTextbtn.disabled = (isKeywordDuplicate || textFormTitleEmpty || textContentTitleEmpty);
        }
      });
    });
  }

  // 新規投稿
  if (changeForm) {
    changeForm.addEventListener("click", () => {
      postForm.classList.toggle("d-none");
      postTextform.classList.toggle("d-none");
    });

    postDropbtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      document
        .querySelectorAll(".dropzone .dz-preview .dz-remove")
        .forEach((dz_remove_el) => {
          dz_remove_el.style.display = "none";
        });
      postDropzone.processQueue();
    });

    const postValidation = () => {
      const keyword = dropFormtitle.value
      const isKeywordDuplicate = keywordList.some(el => el == keyword)
      const dropFormTitleEmpty = !dropFormtitle.value
      const dropzoneContentEmpty = postDropzone.getQueuedFiles().length == 0

      if (isKeywordDuplicate) {
        dropFormtitle.classList.add('is-invalid')
      } else {
        dropFormtitle.classList.remove('is-invalid')
      }

      postDropbtn.disabled = (
        isKeywordDuplicate || dropFormTitleEmpty || dropzoneContentEmpty
      );
    };

    dropFormtitle.addEventListener("keyup", () => postValidation());

    postDropzone.on("addedfiles", () => postValidation());

    postDropzone.on("removedfile", () => postValidation());
  }

  // 編集（画像）
  if (editDropbtn) {
    editDropbtn.addEventListener("click", (e) => {
      if (postDropzone.getQueuedFiles().length > 0) {
        e.preventDefault();
        e.stopPropagation();
        document
          .querySelectorAll(".dropzone .dz-preview .dz-remove")
          .forEach((dz_remove_el) => {
            dz_remove_el.style.display = "none";
          });
        postDropzone.processQueue();
      }
    });

    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", () => {
        editBtn.parentNode.classList.add("d-none");
        postForm.insertAdjacentHTML(
          "afterbegin",
          `<input type="hidden" name="indexes[]" value="${editBtn.id}">`
        );
      });
    });

    const editValidation = () => {
      const postedEmpty =
        document.querySelectorAll(".edit").length -
        document.querySelectorAll(".edit-images .d-none").length ==
        0;
      const dropEmpty = postDropzone.getQueuedFiles().length == 0;
      const imagesEmpty = postedEmpty && dropEmpty;
      editDropbtn.disabled = !textFormtitle.value || imagesEmpty;
    };

    textFormtitle.addEventListener("keyup", () => editValidation());

    postDropzone.on("addedfiles", () => editValidation());

    postDropzone.on("removedfile", () => editValidation());

    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", () => editValidation());
    });
  }
});

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)