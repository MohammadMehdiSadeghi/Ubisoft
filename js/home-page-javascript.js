"use strict";

// location menu

const provinceRoot = document.querySelector(".province-root");
const closeIconLocationBox = document.querySelector(".close-icon-location-box");
const openLocationBox = document.querySelector(".location");
const locationText = document.querySelector(".location-text");
const locationTitle = document.querySelector(".location-title");
const cityRoot = document.querySelector(".city-root");
const provinceModal = document.querySelector(".province-modal");

let isActiveOpenModal = false;

closeIconLocationBox.addEventListener("click", () => {
  provinceModal.classList.add("hide-modal");
});

openLocationBox.addEventListener("click", () => {
  if (!isActiveOpenBestBox) {
    provinceModal.classList.remove("hide-modal");
    isActiveOpenModal = true;
  } else {
    provinceModal.classList.add("hide-modal");
    isActiveOpenModal = false;
  }
});

(async () => {
  try {
    const res = await fetch("https://iranplacesapi.liara.run/api/provinces");
    const data = await res.json();
    data.forEach((item) => {
      provinceRoot.innerHTML += `
        <div class="province-box" id="${item.id}">
          <h2>${item.name}</h2>
          <p>></p>
        </div>
      `;
    });

    const provinceBox = document.querySelectorAll(".province-box");

    provinceBox.forEach((province) => {
      const provinceId = province.id;
      province.addEventListener("click", async () => {
        const provinceName = province.querySelector("h2").textContent;
        locationText.textContent = provinceName;
        cityRoot.classList.add("city-root-disabled");
        provinceRoot.classList.add("province-root-disabled");
        try {
          const res = await fetch(
            `https://iranplacesapi.liara.run/api/provinces/id/${provinceId}/cities`,
          );
          const data = await res.json();
          data.forEach((item) => {
            cityRoot.innerHTML += `
        <div class="city-box">
          <h2>${item.name}</h2>
        </div>
      `;
          });
          const cityBox = document.querySelectorAll(".city-box");
          cityBox.forEach((city) => {
            city.addEventListener("click", () => {
              const cityName = city.querySelector("h2").textContent;
              let selectedProvinceName = provinceName;
              locationText.textContent = ` ${selectedProvinceName} ، ${cityName}`;
              provinceModal.classList.add("hide-modal");
            });
          });
        } catch (error) {
          console.log(error.message);
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
})();

// top silder

const slides = document.querySelectorAll(".imgs-slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prive-btn");
const sliderContainer = document.querySelector(".imgs-slider")?.parentElement;

let currentSlide = 0;
let autoSlideInterval = null;

const showSlide = (index) => {
  slides.forEach((slide) => slide.classList.remove("show-slide"));
  slides[index]?.classList.add("show-slide");
};

const nextSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
};

const prevSlide = () => {
  currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  showSlide(currentSlide);
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

const handleSlideChange = (slideFunction) => {
  stopAutoSlide();
  slideFunction();
  startAutoSlide();
};

nextBtn.addEventListener("click", () => handleSlideChange(nextSlide));
prevBtn.addEventListener("click", () => handleSlideChange(prevSlide));

startAutoSlide();

// timer offer

let totalSeconds = 5 * 60 * 60;

const numberOne = document.querySelector(".nubmer-one");
const numberTwo = document.querySelector(".nubmer-two");
const numberThree = document.querySelector(".nubmer-three");
const numberFour = document.querySelector(".nubmer-four");
const numberFive = document.querySelector(".nubmer-five");
const numberSix = document.querySelector(".nubmer-six");

function updateTimer() {
  if (totalSeconds <= 0) {
    numberOne.textContent = "0";
    numberTwo.textContent = "0";
    numberThree.textContent = "0";
    numberFour.textContent = "0";
    numberFive.textContent = "0";
    numberSix.textContent = "0";
    clearInterval(timerInterval);
    return;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  numberOne.textContent = secondsStr[1];
  numberTwo.textContent = secondsStr[0];
  numberThree.textContent = minutesStr[1];
  numberFour.textContent = minutesStr[0];
  numberFive.textContent = hoursStr[1];
  numberSix.textContent = hoursStr[0];

  totalSeconds--;
}

updateTimer();

const timerInterval = setInterval(updateTimer, 1000);

// offer products api

const productsRoot = document.querySelector(".products-list");

(async () => {
  try {
    const res = await fetch("/backend/offer-products.json");
    const data = await res.json();
    data.products.forEach((item) => {
      productsRoot.innerHTML += `        
      <div class="product-card">
          <img src="${item.image}" alt="" />
          <h2>${item.title.split(" ").splice(0, 6).join(" ")} ...</h2>
          <div class="products-price">
            <p>${item.discount}%</p>
            <p>${item.price.toLocaleString()} تومان</p>
          </div>
          <p>${item.originalPrice} تومان</p>
        </div>
        `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

// offer market products api

const productsMarketOnOfferRoot = document.querySelector(
  ".products-offer-on-market-root",
);

(async () => {
  try {
    const res = await fetch("/backend/market-products-on-offer.json");
    const data = await res.json();
    data.marketProducts.forEach((item) => {
      productsMarketOnOfferRoot.innerHTML += `        
        <div class="img-and-offer-price-box">
          <img src="${item.image}" alt="" />
          <p>${item.discount}%</p>
        </div>
        `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

// part products api part 1-4

const columnOne = document.querySelector(".column-one");
const columnTwo = document.querySelector(".column-two");
const columnThree = document.querySelector(".column-three");
const columnFour = document.querySelector(".column-four");

(async () => {
  try {
    const res = await fetch("/backend/part-products-1-4.json");
    const data = await res.json();
    data.productsPartImg.slice(0, 4).forEach((item) => {
      columnOne.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

(async () => {
  try {
    const res = await fetch("/backend/part-products-1-4.json");
    const data = await res.json();
    data.productsPartImg.slice(4, 8).forEach((item) => {
      columnTwo.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

(async () => {
  try {
    const res = await fetch("/backend/part-products-1-4.json");
    const data = await res.json();
    data.productsPartImg.slice(8, 12).forEach((item) => {
      columnThree.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

(async () => {
  try {
    const res = await fetch("/backend/part-products-1-4.json");
    const data = await res.json();
    data.productsPartImg.slice(12, 16).forEach((item) => {
      columnFour.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

// best products api

const bestProductsRoot = document.querySelector(".best-products-root");

(async () => {
  try {
    const res = await fetch("/backend/best products.json");
    const data = await res.json();
    data.forEach((item) => {
      bestProductsRoot.innerHTML += `
        <div class="best-product-card">
          <img src="${item.img}" alt="" />
          <h2>${item.id}</h2>
          <p>${item.title.split(" ").splice(0, 10).join(" ")}...</p>
        </div>
      `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

// open all products for best products
const openAllProducts = document.querySelector(".open-all-products");
const bestProductRoot = document.querySelector(".best-products-root");
let isActiveOpenBestBox = false;

openAllProducts.addEventListener("click", () => {
  if (isActiveOpenBestBox) {
    bestProductRoot.classList.remove("p-height");
    openAllProducts.classList.remove("rotate-icon");
    isActiveOpenBestBox = false;
  } else {
    bestProductRoot.classList.add("p-height");
    openAllProducts.classList.add("rotate-icon");
    isActiveOpenBestBox = true;
  }
});

// part products api part 1-4

const columnOnePartTwo = document.querySelector(".column-one-part-two");
const columnTwoPartTwo = document.querySelector(".column-two-part-two");
const columnThreePartTwo = document.querySelector(".column-three-part-two");
const columnFourPartTwo = document.querySelector(".column-four-part-two");

(async () => {
  try {
    const res = await fetch("/backend/part-products-5-8.json");
    const data = await res.json();
    data.productsPartImg.slice(0, 4).forEach((item) => {
      columnOnePartTwo.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

(async () => {
  try {
    const res = await fetch("/backend/part-products-5-8.json");
    const data = await res.json();
    data.productsPartImg.slice(4, 8).forEach((item) => {
      columnTwoPartTwo.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

(async () => {
  try {
    const res = await fetch("/backend/part-products-5-8.json");
    const data = await res.json();
    data.productsPartImg.slice(8, 12).forEach((item) => {
      columnThreePartTwo.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

(async () => {
  try {
    const res = await fetch("/backend/part-products-5-8.json");
    const data = await res.json();
    data.productsPartImg.slice(12, 16).forEach((item) => {
      columnFourPartTwo.innerHTML += ` <img src="${item.image}" alt="" /> `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

// offer products api part 2

const offerAllProductsRoot = document.querySelector(".offer-products-root");

(async () => {
  try {
    const res = await fetch("/backend/offer-all-products.json");
    const data = await res.json();
    data.allOfferProducts.forEach((item) => {
      offerAllProductsRoot.innerHTML += `
        <div class="offer-product-card">
          <img src="${item.image}" alt="" />
          <div class="offer-products-price">
            <p>${item.discount}%</p>
            <p>${item.price.toLocaleString()} تومان</p>
          </div>
          <p>${item.originalPrice.toLocaleString()} تومان</p>
        </div>
      `;
    });
  } catch (error) {
    console.log(error.message);
  }
})();

// open all offer products for best products

const allOfferProductsBox = document.querySelector(".offer-products-root");
const openAllProductsHot = document.querySelector(".open-all-products-hot");
let isActiveOpenOfferBox = false;

openAllProductsHot.addEventListener("click", () => {
  if (isActiveOpenOfferBox) {
    allOfferProductsBox.classList.remove("p-offer-height");
    openAllProductsHot.classList.remove("rotate-icon");
    isActiveOpenOfferBox = false;
  } else {
    allOfferProductsBox.classList.add("p-offer-height");
    openAllProductsHot.classList.add("rotate-icon");
    isActiveOpenOfferBox = true;
  }
});

// open all information text on footer

const btnOpenAndCloseAllInformationText = document.querySelector(
  ".btn-open-and-close-all-information-text",
);
const informationBox = document.querySelector(".information");

let isActiveOpenInformationBox = false;

btnOpenAndCloseAllInformationText.addEventListener("click", () => {
  if (isActiveOpenInformationBox) {
    informationBox.classList.remove("open-and-max-height");
    isActiveOpenInformationBox = false;
  } else {
    informationBox.classList.add("open-and-max-height");
    isActiveOpenInformationBox = true;
  }
});

const goToTopPage = document.querySelector(".go-to-top-page");

goToTopPage.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
