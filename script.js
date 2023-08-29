// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Function to filter and display cards based on selected tags and checkboxes
  function filterCards() {
    // Get active tag buttons
    let activeTags = Array.from(document.querySelectorAll(".tag-button"))
      .filter(function (tag) {
        return tag.classList.contains("active");
      })
      .map(function (tag) {
        return tag.dataset.value;
      });

    // Get active conditional buttons for selected tags
    let activeConditionalButtons = [];
    activeTags.forEach(function (tag) {
      let conditionalButtons = Array.from(
        document.querySelectorAll("." + tag + "-checkbox")
      ).filter(function (button) {
        return button.classList.contains("active");
      });
      activeConditionalButtons = activeConditionalButtons.concat(conditionalButtons);
    });

    // Iterate through cards and show/hide them based on filters
    cards.forEach(function (card) {
      let tags = card.getAttribute("data-tags").split(" "),
        hasAllTags = activeTags.every(function (tag) {
          return tags.includes(tag);
        }),
        hasAnyConditional = activeConditionalButtons.map(function (button) {
          return button.dataset.value;
        });
      hasAnyConditional =
        0 === hasAnyConditional.length ||
        hasAnyConditional.some(function (conditional) {
          return tags.includes(conditional);
        });
      let showAllActive = document
        .querySelector('button[data-value="all"]')
        .classList.contains("active");
      if ((hasAllTags && hasAnyConditional) || showAllActive) {
        card.classList.add("show");
        card.classList.remove("hide");
      } else {
        card.classList.remove("show");
        card.classList.add("hide");
      }
    });
  }

  // Get all tag buttons and cards
  let tags = document.querySelectorAll(".tag-button"),
    cards = Array.from(document.querySelectorAll(".card"));

  // Add click event listeners to tag buttons
  tags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      this.classList.toggle("active");
      if (this.dataset.value === "all" && this.classList.contains("active")) {
        tags.forEach(function (tag) {
          tag !== this && tag.classList.remove("active");
        }, this);
        document.querySelectorAll(".conditional-button").forEach(function (button) {
          button.classList.remove("active");
        });
        document.querySelectorAll(".conditional-button").forEach(function (button) {
          button.classList.add("hidden");
        });
      } else {
        document.querySelector('button[data-value="all"]').classList.remove("active");
        if (this.classList.contains("active")) {
          document
            .querySelectorAll("." + this.dataset.value + "-checkbox")
            .forEach(function (button) {
              button.classList.remove("hidden");
            });
        } else {
          document
            .querySelectorAll("." + this.dataset.value + "-checkbox")
            .forEach(function (button) {
              button.classList.add("hidden");
            });
        }
      }
      filterCards();
    });
  });

  // Add click event listeners to conditional checkboxes
  document.querySelectorAll(".conditional-button").forEach(function (button) {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      filterCards();
    });
  });

  // Initial call to filterCards to set initial state
  filterCards();
});
