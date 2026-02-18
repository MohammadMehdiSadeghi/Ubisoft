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


