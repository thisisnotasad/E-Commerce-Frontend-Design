(function () {
  // Language & Currency Dropdown
  const langCurrencyDropdown = document.getElementById(
    "lang-currency-dropdown"
  );
  const langCurrencyToggle =
    langCurrencyDropdown.querySelector(".dropdown-content");
  const langCurrencyList = langCurrencyDropdown.querySelector(".dropdown-list");

  // Ship To Dropdown
  const shiptoDropdown = document.getElementById("shipto-dropdown");
  const shiptoToggle = shiptoDropdown.querySelector(".dropdown-content");
  const shiptoList = shiptoDropdown.querySelector(".dropdown-list");

  function toggleDropdown(dropdownWrapper, expand) {
    const expanded = dropdownWrapper.getAttribute("aria-expanded") === "true";
    const newExpanded = expand === undefined ? !expanded : !!expand;
    dropdownWrapper.setAttribute(
      "aria-expanded",
      newExpanded ? "true" : "false"
    );
  }

  function closeDropdown(dropdownWrapper) {
    toggleDropdown(dropdownWrapper, false);
  }

  // Update Language & Currency selected label
  function updateLangCurrencyLabel(button) {
    const flagUrl = button.dataset.flag;
    const labelText = button.dataset.label;
    const img = langCurrencyDropdown.querySelector("img.flags");
    const span = langCurrencyDropdown.querySelector(".label-text");

    if (img) img.src = flagUrl;
    if (img) img.alt = labelText + " flag";
    if (span) span.textContent = labelText;
  }

  // Update Ship To selected label
  function updateShiptoLabel(button) {
    const flagUrl = button.dataset.flag;
    const country = button.dataset.country;
    const img = shiptoDropdown.querySelector("img.flags");
    const span = shiptoToggle;

    if (img) {
      img.src = flagUrl;
      img.alt = country + " flag";
    }
    // Keep "Ship to " text followed by flag
    span.innerHTML = `Ship to <img class="flags" src="${flagUrl}" alt="${country} flag" style="margin-left: 0.5rem;" />`;
  }

  // Event listeners for Language & Currency Dropdown items
  langCurrencyList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      langCurrencyList
        .querySelectorAll("button")
        .forEach((b) => b.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");
      updateLangCurrencyLabel(button);
      closeDropdown(langCurrencyDropdown);
      langCurrencyDropdown.focus();
    });
  });

  // Event listeners for Ship To Dropdown items
  shiptoList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      shiptoList
        .querySelectorAll("button")
        .forEach((b) => b.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");
      updateShiptoLabel(button);
      closeDropdown(shiptoDropdown);
      shiptoDropdown.focus();
    });
  });

  // Toggle dropdown on click of toggle area
  langCurrencyToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded =
      langCurrencyDropdown.getAttribute("aria-expanded") === "true";
    toggleDropdown(langCurrencyDropdown, !expanded);
  });
  shiptoToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded = shiptoDropdown.getAttribute("aria-expanded") === "true";
    toggleDropdown(shiptoDropdown, !expanded);
  });

  // Keyboard navigation and interaction
  function setupKeyboardNavigation(wrapper, toggle, list) {
    toggle.addEventListener("keydown", (e) => {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        toggleDropdown(wrapper, true);
        const selected = list.querySelector('button[aria-selected="true"]');
        (selected || list.querySelector("button")).focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeDropdown(wrapper);
        wrapper.focus();
      }
    });

    list.addEventListener("keydown", (e) => {
      const active = document.activeElement;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (active.parentElement.nextElementSibling) {
          active.parentElement.nextElementSibling
            .querySelector("button")
            .focus();
        } else {
          list.querySelector("li:first-child button").focus();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (active.parentElement.previousElementSibling) {
          active.parentElement.previousElementSibling
            .querySelector("button")
            .focus();
        } else {
          list.querySelector("li:last-child button").focus();
        }
      } else if (["Enter", " "].includes(e.key)) {
        e.preventDefault();
        active.click();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeDropdown(wrapper);
        wrapper.focus();
      }
    });
  }

  setupKeyboardNavigation(
    langCurrencyDropdown,
    langCurrencyToggle,
    langCurrencyList
  );
  setupKeyboardNavigation(shiptoDropdown, shiptoToggle, shiptoList);

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!langCurrencyDropdown.contains(e.target)) {
      closeDropdown(langCurrencyDropdown);
    }
    if (!shiptoDropdown.contains(e.target)) {
      closeDropdown(shiptoDropdown);
    }
  });
})();

(function () {
  // Categories Dropdown
  const categoriesDropdown =
    document.querySelector("#categories-toggle").parentElement;
  const categoriesList = categoriesDropdown.querySelector(".dropdown-list");

  // Help Dropdown
  const helpDropdown = document.querySelector("#help-toggle").parentElement;
  const helpList = helpDropdown.querySelector(".dropdown-list");

  function toggleDropdown(dropdownWrapper) {
    const expanded = dropdownWrapper.getAttribute("aria-expanded") === "true";
    dropdownWrapper.setAttribute("aria-expanded", !expanded);
  }

  // Event listeners for Categories Dropdown
  categoriesDropdown.addEventListener("click", (e) => {
    e.preventDefault();
    toggleDropdown(categoriesDropdown);
  });

  // Event listeners for Help Dropdown
  helpDropdown.addEventListener("click", (e) => {
    e.preventDefault();
    toggleDropdown(helpDropdown);
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!categoriesDropdown.contains(e.target)) {
      categoriesDropdown.setAttribute("aria-expanded", "false");
    }
    if (!helpDropdown.contains(e.target)) {
      helpDropdown.setAttribute("aria-expanded", "false");
    }
  });

  // Keyboard navigation for dropdowns
  function setupKeyboardNavigation(dropdownWrapper, list) {
    const toggleButton = dropdownWrapper.querySelector("a");

    toggleButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDropdown(dropdownWrapper);
        const firstOption = list.querySelector("button");
        if (firstOption) firstOption.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        dropdownWrapper.setAttribute("aria-expanded", "false");
        toggleButton.focus();
      }
    });

    list.addEventListener("keydown", (e) => {
      const active = document.activeElement;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (active.parentElement.nextElementSibling) {
          active.parentElement.nextElementSibling
            .querySelector("button")
            .focus();
        } else {
          list.querySelector("button").focus();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (active.parentElement.previousElementSibling) {
          active.parentElement.previousElementSibling
            .querySelector("button")
            .focus();
        } else {
          list.querySelector("li:last-child button").focus();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        dropdownWrapper.setAttribute("aria-expanded", "false");
        toggleButton.focus();
      }
    });
  }

  setupKeyboardNavigation(categoriesDropdown, categoriesList);
  setupKeyboardNavigation(helpDropdown, helpList);
})();

const navContainer = document.querySelector(".nav-links");
const navCheck = document.querySelector(".nav-btn");

navCheck.addEventListener("click", () => {
  navContainer.classList.toggle("hide");
});
