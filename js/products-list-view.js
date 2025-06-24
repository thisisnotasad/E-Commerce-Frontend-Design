const toggleBtn = document.querySelectorAll(".toggle-btn");
const favBtns = document.querySelectorAll(".fav-container span");

favBtns.forEach((favBtn) => {
  favBtn.addEventListener("click", () => {
    const product = favBtn.closest(".product-item");
    console.log(product);
  });
});

toggleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.querySelector("img").classList.toggle("rotate");
    console.log("clicked");
    btn.nextElementSibling.classList.toggle("hide");
    console.log(toggleBtn.nextElementSibling);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const minRange = document.querySelector(".min-range");
  const maxRange = document.querySelector(".max-range");
  const minInput = document.querySelector(".min-input");
  const maxInput = document.querySelector(".max-input");
  const slider = document.querySelector(".slider");
  const sliderProgress = document.querySelector(".slider-progress");
  const applyBtn = document.querySelector(".apply-btn");

  // Set initial progress
  updateSliderProgress();

  // Update slider progress when range inputs change
  minRange.addEventListener("input", function () {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);

    if (minVal > maxVal) {
      minRange.value = maxVal;
      minInput.value = maxVal;
    } else {
      minInput.value = minVal;
    }

    updateSliderProgress();
  });

  maxRange.addEventListener("input", function () {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);

    if (maxVal < minVal) {
      maxRange.value = minVal;
      maxInput.value = minVal;
    } else {
      maxInput.value = maxVal;
    }

    updateSliderProgress();
  });

  // Update range inputs when number inputs change
  minInput.addEventListener("input", function () {
    const minVal = parseInt(minInput.value) || 0;
    const maxVal = parseInt(maxInput.value) || 999999;

    if (minVal < 0) {
      minInput.value = 0;
      minRange.value = 0;
    } else if (minVal > 999999) {
      minInput.value = 999999;
      minRange.value = 999999;
    } else if (minVal > maxVal) {
      minInput.value = maxVal;
      minRange.value = maxVal;
    } else {
      minRange.value = minVal;
    }

    updateSliderProgress();
  });

  maxInput.addEventListener("input", function () {
    const minVal = parseInt(minInput.value) || 0;
    const maxVal = parseInt(maxInput.value) || 999999;

    if (maxVal > 999999) {
      maxInput.value = 999999;
      maxRange.value = 999999;
    } else if (maxVal < minVal) {
      maxInput.value = minVal;
      maxRange.value = minVal;
    } else {
      maxRange.value = maxVal;
    }

    updateSliderProgress();
  });

  // Apply button functionality
  applyBtn.addEventListener("click", function () {
    const minPrice = minInput.value;
    const maxPrice = maxInput.value;
    alert(`Price range applied: $${minPrice} - $${maxPrice}`);
    // Here you would typically send this data to your server or filter results
  });

  function updateSliderProgress() {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);
    const minPercent = (minVal / 999999) * 100;
    const maxPercent = (maxVal / 999999) * 100;

    sliderProgress.style.left = minPercent + "%";
    sliderProgress.style.width = maxPercent - minPercent + "%";
  }
});
