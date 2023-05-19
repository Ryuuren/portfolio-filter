// Waits for the DOM to be fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Assigns variables to the important HTML elements & containers
  const tags = document.querySelectorAll(".tag");
  const cardContainer = document.querySelector(".card-container");
  const tagCheckboxes = document.querySelectorAll(".tag-checkbox");
  // Assigns variables to the conditional checkboxes that appear once the primary checkboxes are checked
  const conditionalParentWrapper = document.querySelector(".conditional-parent-wrapper");
  const websitesCheckboxes = document.querySelector(".websites-checkboxes");
  const designCheckboxes = document.querySelector(".design-checkboxes");
  const digitalMarketingCheckboxes = document.querySelector(".digital-marketing-checkboxes");
  // Assigns all client cards in gallery to a variable
  let cards = Array.from(document.querySelectorAll(".card"));
  // Assigns variable to the searchbar input
  const filterInput = document.querySelector("#filterInput");
  // Assigns variable to the show all checkbox
  const showAllCheckbox = document.querySelector('input[value="all"]');

  // Event Listener function for clicking show all and resetting the filter system
  showAllCheckbox.addEventListener("change", function () {
    if (this.checked) {
      tagCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });

      const conditionalCheckboxes = document.querySelectorAll(".conditional-checkbox");
      conditionalCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  });

  tagCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      if (checkbox.value === "all" && checkbox.checked) {
        tagCheckboxes.forEach(function (cb) {
          if (cb !== checkbox) {
            cb.checked = false;
          }
        });
      } else {
        tagCheckboxes.forEach(function (cb) {
          if (cb.value === "all") {
            cb.checked = false;
          }
        });
      }

      const selectedPrimaryTags = Array.from(tagCheckboxes)
        .filter(function (checkbox) {
          return checkbox.checked && checkbox.value !== "all";
        })
        .map(function (checkbox) {
          return checkbox.value;
        });

      conditionalParentWrapper.classList.toggle("hidden", selectedPrimaryTags.length === 0);
      websitesCheckboxes.classList.toggle("hidden", !selectedPrimaryTags.includes("websites"));
      designCheckboxes.classList.toggle("hidden", !selectedPrimaryTags.includes("design"));
      digitalMarketingCheckboxes.classList.toggle(
        "hidden",
        !selectedPrimaryTags.includes("digital-marketing")
      );

      // Clear the checked state of conditional checkboxes when a primary tag checkbox is unchecked
      if (!checkbox.checked) {
        const conditionalCheckboxes =
          conditionalParentWrapper.querySelectorAll(".conditional-checkbox");
        conditionalCheckboxes.forEach(function (cb) {
          cb.checked = false;
        });
      }

      cards.forEach((card) => {
        const cardTags = card.getAttribute("data-tags").split(" ");
        const primaryTagsMatch = selectedPrimaryTags.every(function (tag) {
          return cardTags.includes(tag);
        });

        // Collect all selected conditional checkboxes
        const selectedConditionalCheckboxes = Array.from(
          conditionalParentWrapper.querySelectorAll(".conditional-checkbox:checked")
        );

        // Extract the values of the selected conditional checkboxes
        const selectedConditionalTags = selectedConditionalCheckboxes.map(function (checkbox) {
          return checkbox.value;
        });

        const conditionalTagsMatch =
          selectedConditionalTags.length === 0 ||
          selectedConditionalTags.some(function (tag) {
            return cardTags.includes(tag);
          });

        if (primaryTagsMatch && conditionalTagsMatch) {
          card.classList.add("show");
          card.classList.remove("hide");
        } else {
          card.classList.remove("show");
          card.classList.add("hide");
        }
      });
    });
  });

  // Event listener for conditional checkboxes
  const conditionalCheckboxes = document.querySelectorAll(".conditional-checkbox");
  conditionalCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const selectedPrimaryTags = Array.from(tagCheckboxes)
        .filter(function (checkbox) {
          return checkbox.checked && checkbox.value !== "all";
        })
        .map(function (checkbox) {
          return checkbox.value;
        });

      cards.forEach(function (card) {
        const cardTags = card.getAttribute("data-tags").split(" ");
        const primaryTagsMatch = selectedPrimaryTags.every(function (tag) {
          return cardTags.includes(tag);
        });

        // Collect all selected conditional checkboxes
        const selectedConditionalCheckboxes = Array.from(
          conditionalParentWrapper.querySelectorAll(".conditional-checkbox:checked")
        );

        // Extract the values of the selected conditional checkboxes
        const selectedConditionalTags = selectedConditionalCheckboxes.map(function (checkbox) {
          return checkbox.value;
        });

        const conditionalTagsMatch =
          selectedConditionalTags.length === 0 ||
          selectedConditionalTags.some(function (tag) {
            return cardTags.includes(tag);
          });

        if (primaryTagsMatch && conditionalTagsMatch) {
          card.classList.add("show");
          card.classList.remove("hide");
        } else {
          card.classList.remove("show");
          card.classList.add("hide");
        }
      });
    });
  });

  // Function to filter the cards based on search bar input
  function filterCards() {
    const filterValue = filterInput.value.toLowerCase();
    const selectedPrimaryTags = Array.from(tagCheckboxes)
      .filter(function (checkbox) {
        return checkbox.checked && checkbox.value !== "all";
      })
      .map(function (checkbox) {
        return checkbox.value;
      });

    cards.forEach(function (card) {
      const cardTags = card.getAttribute("data-tags").split(" ");
      const primaryTagsMatch = selectedPrimaryTags.every(function (tag) {
        return cardTags.includes(tag);
      });

      // Collect all selected conditional checkboxes
      const selectedConditionalCheckboxes = Array.from(
        conditionalParentWrapper.querySelectorAll(".conditional-checkbox:checked")
      );

      // Extract the values of the selected conditional checkboxes
      const selectedConditionalTags = selectedConditionalCheckboxes.map(function (checkbox) {
        return checkbox.value;
      });

      const conditionalTagsMatch =
        selectedConditionalTags.length === 0 ||
        selectedConditionalTags.some(function (tag) {
          return cardTags.includes(tag);
        });

      if (
        primaryTagsMatch &&
        conditionalTagsMatch &&
        card.textContent.toLowerCase().includes(filterValue)
      ) {
        card.classList.add("show");
        card.classList.remove("hide");
      } else {
        card.classList.remove("show");
        card.classList.add("hide");
      }
    });
  }

  filterInput.addEventListener("input", filterCards);

  // Resets the search bar when clear button is clicked
  const btnClear = document.querySelector(".btn-clear");
  btnClear.addEventListener("click", function () {
    filterInput.value = "";
    filterCards();
  });
});
