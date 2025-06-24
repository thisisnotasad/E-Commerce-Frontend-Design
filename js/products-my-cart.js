const cartBtns = document.querySelectorAll(".move-to-cart-btn");
const myCartContainer = document.querySelector(".my-cart");
const savedProductsWrapper = document.querySelector(".saved-products-wrapper");
const savedProductsContainer = document.querySelector(
  ".saved-products-container"
);
const removeCartBtns = document.querySelectorAll(".remove-from-cart-btn");
const savdedInCartBtns = document.querySelector(".save-in-cart-btn");
const emptyAllCartBtn = document.querySelector(".empty-all-cart-btn");
const cartItemQuantity = document.querySelector(".cart-item-quantity");

// FUNCTION TO ADD PRODUCT TO CART CONTAINER
const addProductToContainer = (name, price, image) => {
  const cartItem = document.createElement("div");

  // CHECKING IF CART IS EMPTY
  if (myCartContainer.classList.contains("flex-style")) {
    myCartContainer.classList.remove("flex-style");
    const firstElement = myCartContainer.children[0];
    myCartContainer.removeChild(firstElement);
    if (emptyAllCartBtn.disabled) {
      emptyAllCartBtn.disabled = false;
    }
  }

  cartItem.innerHTML = `
         <div class="cart-item">
            <div class="left-cart">
              <div class="img-wrapper">
                <img src=${image} alt="" />
              </div>
              <div class="product-wrapper">
                <p class="product-title black-text">
                  ${name}
                </p>
                <p class="product-about gray-text">
                  Size: medium, Color: blue, Material: Plastic Seller: Artel
                  Market
                </p>
                <div class="btn-options d-flex gap-2">
                  <button class="btn btn-opt remove-from-cart-btn" style="color: red">Remove</button>
                  <button class="btn btn-opt saved-in-cart-btn" style="color: blue">
                    Save for later
                  </button>
                </div>
              </div>
            </div>
            <div class="right-cart">
              <p class="product-price black-text">${price}</p>
              <input type="number" placeholder="Qty:" />
            </div>
          </div>
    
    `;

  myCartContainer.prepend(cartItem);
  updateCartItemQty();
};

// FUNCTION TO REMOVE PRODUCT FROM CART
const removeProductFromCart = (removeCartBtn) => {
  removeCartBtn.addEventListener("click", () => {
    const removedProduct = removeCartBtn.closest(".cart-item");
    removedProduct.remove();
    const noOfCartProducts =
      myCartContainer.querySelectorAll(".cart-item").length;
    console.log("69-No Of Cart Products: ", noOfCartProducts);
    if (noOfCartProducts === 0) {
      displayEmptyCartMessage();
      emptyAllCartBtn.disabled = true;
    }
    updateCartItemQty();
  });
};

// FUNCTION TO DISPLAY EMPTY CART MESSAGE
const displayEmptyCartMessage = () => {
  myCartContainer.classList.add("flex-style");
  const emptyCartMessage = document.createElement("h2");
  emptyCartMessage.textContent = "Your cart is empty!";
  emptyCartMessage.classList.add("black-text", "text-center", "m-auto");
  myCartContainer.prepend(emptyCartMessage);
};

// FUNCTION TO EMPTY CART
const emptyAllCart = () => {
  const toBeRemovedCartProduct = myCartContainer.querySelectorAll(".cart-item");
  if (toBeRemovedCartProduct.length > 0) {
    toBeRemovedCartProduct.forEach((cartProduct) => {
      cartProduct.remove();
    });
  }
};

// FUNCTION TO SAVE PRODUCT FOR LATER
const saveProductForLater = (cartItem) => {
  const name = cartItem.querySelector(".product-title").textContent;
  const price = cartItem.querySelector(".product-price").textContent;
  const imgSrc = cartItem.querySelector(".img-wrapper img").src;

  const savedProduct = document.createElement("div");

  savedProduct.innerHTML = `
          <div class="image-wrapper">
            <img src=${imgSrc} alt="" class="product-image" />
          </div>
          <p class="price product-price">${price}</p>
          <p class="gray-text product-name">${name}</p>
          <button class="move-to-cart-btn d-flex gap-2 justify-content-center">
            <img src="../images/icons/shopping_cart.png" alt="" />
            <p>Move to Cart</p>
          </button>
        `;
  savedProduct.classList.add("saved-product");

  savedProductsWrapper.append(savedProduct);
  if (savedProductsContainer.classList.contains("hide")) {
    savedProductsContainer.classList.remove("hide");
  }
};

// FUNCTION TO UPDATE CART ITEM QUANTITY
const updateCartItemQty = () => {
  const noOfCartProducts =
    myCartContainer.querySelectorAll(".cart-item").length;
  cartItemQuantity.innerHTML = `<h2 class="cart-item-quantity">My cart(${noOfCartProducts})</h2>`;
  console.log("127-No Of Cart Products: ", noOfCartProducts);
};

// EVENT LISTENERS
emptyAllCartBtn.addEventListener("click", emptyAllCart);

myCartContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const cartItem = event.target.closest(".cart-item");
    if (cartItem) {
      console.log("140-Deleted Item: ", cartItem);
      cartItem.remove();
      updateCart();
    }
  }

  if (event.target.classList.contains("saved-in-cart-btn")) {
    const cartItem = event.target.closest(".cart-item");
    saveProductForLater(cartItem);
    cartItem.remove();
    updateCart();
  }
  const noOfCartProducts =
    myCartContainer.querySelectorAll(".cart-item").length;
  updateCartItemQty();

  if (emptyAllCartBtn.disabled) {
    return;
  }
  if (noOfCartProducts === 0) {
    displayEmptyCartMessage();
    emptyAllCartBtn.disabled = true;
  }
});

savedProductsWrapper.addEventListener("click", (event) => {
  if (event.target.classList.contains("move-to-cart-btn")) {
    const savedProduct = event.target.closest(".saved-product");

    console.log(savedProduct);

    const product = {
      name: savedProduct.querySelector(".product-name").textContent,
      price: savedProduct.querySelector(".product-price").textContent,
      image: savedProduct.querySelector(".product-image").src,
    };

    savedProduct.remove();
    const noOfSavedProducts =
      savedProductsWrapper.querySelectorAll(".saved-product").length;
    console.log("111-No of Saved Products: ", noOfSavedProducts);
    if (noOfSavedProducts === 0) {
      savedProductsContainer.classList.add("hide");
      console.log("hide it");
    }

    const { name, price, image } = product;
    addProductToContainer(name, price, image);
  }
});

const cartContainer = document.querySelector(".my-cart");
const subtotalValue = document.querySelector(".subtotal-value");
const discountValue = document.querySelector(".discount-value");
const taxValue = document.querySelector(".tax-value");
const totalValue = document.querySelector(".total-value");
const emptyCartBtn = document.querySelector(".empty-all-cart-btn");

const discountAmount = 60.0;
const discountThreshold = 500.0;
const taxRate = 0.1;

// Event delegation for all cart interactions
cartContainer.addEventListener("input", function (e) {
  const qtyInput = e.target.closest('input[type="number"]');
  if (qtyInput) {
    updateCart();
  }
});

function updateCart() {
  const cartItems = document.querySelectorAll(".cart-item");
  let subtotal = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(
      item.querySelector(".product-price").textContent.replace("$", "")
    );
    const quantity =
      parseInt(item.querySelector('input[type="number"]').value) || 0;
    subtotal += price * quantity;
  });

  const appliedDiscount = subtotal > discountThreshold ? discountAmount : 0;
  const tax = subtotal * taxRate;
  const total = subtotal - appliedDiscount + tax;

  subtotalValue.textContent = `$${subtotal.toFixed(2)}`;
  discountValue.textContent = `- $${appliedDiscount.toFixed(2)}`;
  taxValue.textContent = `+ $${tax.toFixed(2)}`;
  totalValue.textContent = `$${total.toFixed(2)}`;
}

// Initial calculation
updateCart();
