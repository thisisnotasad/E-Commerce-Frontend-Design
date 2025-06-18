const listElements = document.querySelectorAll("li");
const filterContainer = document.querySelector(".filter-container");

function UncheckFilter(text) {
  listElements.forEach((li) => {
    if (li.textContent === text) {
      console.log("Text: ", text);
      console.log("li.textContent: ", li.textContent);
      const inputCheckBox = li.querySelector(
        'input[type="radio"], input[type="checkbox"]'
      );

      if (inputCheckBox) {
        inputCheckBox.checked = !inputCheckBox.checked;
      }

      const categoryBox = li.querySelector("p");
      if (categoryBox) {
        const categoryText = categoryBox.innerText.trim();
        removeFromFilterContainer(categoryText);
      }
    }
  });
}

// Using event delegation for filter items
filterContainer.addEventListener("click", (event) => {
  const filterBtn = event.target.closest(".filter-btn");
  if (filterBtn) {
    filterBtn.classList.add("hide");
  }
  if (filterBtn.innerText) {
    UncheckFilter(filterBtn.innerText);
  }
});

const addToFilterContainer = (itemText) => {
  const existingFilter = Array.from(filterContainer.children).find((btn) => {
    const pElem = btn.querySelector("p");
    return pElem && pElem.innerText.trim() === itemText.trim();
  });

  if (existingFilter) {
    console.log("Filter already exists");
    return;
  }

  // Create filter button with all its elements
  const filterBtn = document.createElement("button");
  const filterName = document.createElement("p");
  const filterCross = document.createElement("img");

  // Set attributes and classes
  filterBtn.classList.add(
    "btn",
    "btn-primary",
    "filter-btn",
    "d-flex",
    "gap-2",
    "align-items-center"
  );
  filterName.classList.add("d-inline-block", "m-0");

  filterCross.src = "../images/icons/cross.png";
  filterCross.alt = "remove filter";
  filterCross.classList.add("filter-cross");

  filterName.innerText = itemText;

  // Append elements
  filterBtn.append(filterName, filterCross);
  filterContainer.appendChild(filterBtn);
  updateFilterContainerVisibility();
};

listElements.forEach((li) => {
  li.addEventListener("click", function () {
    const inputCheckBox = li.querySelector(
      'input[type="radio"], input[type="checkbox"]'
    );

    const categoryBox = li.querySelector("p");
    if (categoryBox) {
      const categoryText = categoryBox.innerText.trim();
      addToFilterContainer(categoryText);
      console.log(categoryText);
    }

    if (inputCheckBox) {
      // Toggle the checked state of the checkbox
      inputCheckBox.checked = !inputCheckBox.checked;

      // Check if the checkbox is checked or unchecked
      if (inputCheckBox.checked) {
        // If checked, add to filter container
        if (inputCheckBox.name == "ratings") {
          addToFilterContainer(inputCheckBox.value);
        } else {
          addToFilterContainer(li.innerText);
        }
      } else {
        // If unchecked, remove from filter container
        if (inputCheckBox.name == "ratings") {
          removeFromFilterContainer(inputCheckBox.value);
        } else {
          removeFromFilterContainer(li.innerText);
        }
      }
    }
  });
});

function removeFromFilterContainer(value) {
  // Find the filter element that matches the value and remove it
  const filterItem = Array.from(filterContainer.children).find(
    (item) => item.innerText === value
  );
  if (filterItem) {
    filterContainer.removeChild(filterItem);
    updateFilterContainerVisibility();
  }
}

function filtersExist() {
  return Array.from(filterContainer.children).some((child) => {
    const p = child.querySelector("p");
    return p && p.textContent.trim() !== "";
  });
}

function updateClearButtonVisibility() {
  if (filtersExist()) {
    clearFiltersBtn.classList.remove("hidden");
  } else {
    clearFiltersBtn.classList.add("hidden");
  }
}

updateClearButtonVisibility();

// JavaScript: toggle .hidden class on .filter-container depending on children presence
function updateFilterContainerVisibility() {
  const filterContainer = document.querySelector(".filter-container");
  if (!filterContainer) return;

  // Check element children count, ignore text nodes
  const hasElementChildren = Array.from(filterContainer.childNodes).some(
    (node) => node.nodeType === 1
  );

  console.log(hasElementChildren);

  if (hasElementChildren) {
    filterContainer.classList.remove("hidden");
  } else {
    filterContainer.classList.add("hidden");
  }
}
