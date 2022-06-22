const body = document.querySelector("body");
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const mainImage = document.querySelector(".main-img");
const mainContentThumbNails = document.querySelectorAll(
  ".main-content-thumbnails .thumbnail"
);
const addQuantity = document.querySelector(".plus");
const subtractQuantity = document.querySelector(".minus");
const quantity = document.querySelector(".quantity");
const lightBox = document.querySelector(".lightbox");
const lightBoxMainImage = document.querySelector(".lightbox-img");
const lightBoxThumbNails = document.querySelectorAll(".lightbox .thumbnail");
const lightBoxPreviousBtn = document.querySelector(".previous-button");
const lightBoxNextBtn = document.querySelector(".next-button");
const lightBoxCloseBtn = document.querySelector(".close-button");
const mobileNavBarIcon = document.querySelector(".mobile-navbar-icon");
const mobileNavBar = document.querySelector(".mobile-navbar");
const mobileNavBarOverlay = document.querySelector(".mobile-navbar-overlay");
const mobileCloseBtn = document.querySelector(".mobile-close-button");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const trashIcon = document.querySelector(".fa-trash-can");

const thumbNailOverLay = document.querySelector(".thumbnail-overlay");
const cartMain = document.querySelector(".cart main");
const cartNotification = document.querySelector('.cart-notification')

let productQuantity = 0;
let imgSourcesIndex = 0;
let productCost = 125;

const imgSources = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

// Making the cart appear upon click of cart icon.

cartIcon.addEventListener("click", function () {
  if (cart.style.display) {
    cart.style.display = null;
  } else {
    cart.style.display = "block";
  }
});

// Making the add quanity button work
addQuantity.addEventListener("click", function () {
  productQuantity++;
  quantity.innerText = productQuantity;
  productCost = 125 * productQuantity;
});

// Making the subtract quanity button work
subtractQuantity.addEventListener("click", function () {
  if (productQuantity > 1) {
    productQuantity--;
    quantity.innerText = productQuantity;
    productCost = productCost - 125;
  }
});

// -Making the lightbox appear upon clicking the main img.
// -Making the correct lightbox img show.
mainImage.addEventListener("click", function () {
  for (let source of imgSources) {
    if (mainImage.getAttribute("src") === source) {
      lightBox.style.display = "flex";
      lightBoxMainImage.src = source;
    }
  }
});

// Making the lightbox close when click on the backdrop filter.
lightBox.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  lightBox.style.display = "none";
});

// -Adding click events to all main content thumbnails.
// -Making the selected main content thumbnail as the main img.
// -Removing the active class from all the lightbox thumbnails.
// -Adding the the active class to the current selected img.
for (let i = 0; i < mainContentThumbNails.length; i++) {
  mainContentThumbNails[i].addEventListener("click", function () {
    mainImage.src = imgSources[i];
    lightBoxThumbNails.forEach(removeActiveClass);
    mainContentThumbNails.forEach(removeActiveClass);
    imgSourcesIndex = i;

    function removeActiveClass(element) {
      element.classList.remove("active");
    }
    lightBoxThumbNails[i].classList.add("active");
    mainContentThumbNails[i].classList.add("active");
  });
}

// Making the lightbox previous button work.
lightBoxPreviousBtn.addEventListener("click", function () {
  lightBoxThumbNails.forEach(removeActiveClass);

  function removeActiveClass(element) {
    element.classList.remove("active");
  }

  if (imgSourcesIndex <= 0) {
    imgSourcesIndex = imgSources.length;
  }

  imgSourcesIndex--;
  lightBoxMainImage.setAttribute("src", imgSources[imgSourcesIndex]);

  lightBoxThumbNails[imgSourcesIndex].classList.add("active");
});

// Making the lightbox next button work.
lightBoxNextBtn.addEventListener("click", function () {
  lightBoxThumbNails.forEach(removeActiveClass);

  function removeActiveClass(element) {
    element.classList.remove("active");
  }

  if (imgSourcesIndex >= imgSources.length - 1) {
    imgSourcesIndex = -1;
  }
  imgSourcesIndex++;
  lightBoxMainImage.setAttribute("src", imgSources[imgSourcesIndex]);

  lightBoxThumbNails[imgSourcesIndex].classList.add("active");
});

mobileNavBarIcon.addEventListener("click", function () {
  mobileNavBar.style.display = "block";
  mobileNavBarOverlay.style.display = "block";
});

mobileCloseBtn.addEventListener("click", function () {
  mobileNavBar.style.display = "none";
  mobileNavBarOverlay.style.display = "none";
});

addToCartBtn.addEventListener("click", function () {
  const productInShoppingCartHTML = ` 
  <img src="images/image-product-1-thumbnail.jpg" alt="" />
  <div class="cart-product-details">
    <span class="cart-product-name">Fall Limited Edition Sneakers</span>
    <div>
      <span class="cart-quantity">$125.00 x ${productQuantity}</span>
      <span class="cart-total-cost">$${productCost}</span>
    </div>
  </div>
  <i onclick="emptyCart()"class="fa-solid fa-trash-can"></i>
  <button class="cart-checkout-button">Checkout</button>`;
  cartMain.innerHTML = productInShoppingCartHTML;
  cartMain.style.padding = 20 + "px";
  cartNotification.innerHTML = productQuantity;
  cartNotification.style.display = "block";
});

function emptyCart() {
  cartMain.innerHTML = `<span class="cart-empty-message">This cart is empty.</span>`;
  cartMain.style.padding = 80 + "px";
  productCost = productCost;
  productQuantity = productQuantity;
  cartNotification.innerHTML = 0;
  cartNotification.style.display = "none";
}

