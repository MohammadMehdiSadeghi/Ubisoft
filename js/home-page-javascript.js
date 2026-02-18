"use strict";

// open modal box

const gameBtnOnHeader = document.querySelector(".game-btn-on-header");
const gameBtnOnHeaderIcon = document.querySelector(".bx-chevron-down");
const openModalheaderSection = document.querySelector(
  ".open-modal-header-section",
);

gameBtnOnHeader.addEventListener("mouseover", () => {
  openModalheaderSection.classList.add("transform-for-modal-box");
  gameBtnOnHeaderIcon.classList.add("iconDeg");
});

gameBtnOnHeader.addEventListener("mouseleave", () => {
  openModalheaderSection.classList.remove("transform-for-modal-box");
  gameBtnOnHeaderIcon.classList.remove("iconDeg");
});

openModalheaderSection.addEventListener("mouseover", () => {
  openModalheaderSection.classList.add("transform-for-modal-box");
  gameBtnOnHeaderIcon.classList.add("iconDeg");
});

openModalheaderSection.addEventListener("mouseleave", () => {
  openModalheaderSection.classList.remove("transform-for-modal-box");
  gameBtnOnHeaderIcon.classList.remove("iconDeg");
});

// change img - first slider

const allBtn = document.querySelectorAll(".change-box");
const allBox = [...document.querySelectorAll(".top-slider-boxs")];

allBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    let indexNum = index;
    if (indexNum == 0) {
      allBox.map((box) => {
        box.classList.add("hide-box");
        allBox[0].classList.remove("hide-box");
      });
    } else if (indexNum == 1) {
      allBox.map((box) => {
        box.classList.add("hide-box");
        allBox[1].classList.remove("hide-box");
      });
    } else if (indexNum == 2) {
      allBox.map((box) => {
        box.classList.add("hide-box");
        allBox[2].classList.remove("hide-box");
      });
    } else if (indexNum == 3) {
      allBox.map((box) => {
        box.classList.add("hide-box");
        allBox[3].classList.remove("hide-box");
      });
    }
  });
});
