
/* ==========================================
   KGN STEEL WEBSITE
   JavaScript functionality
========================================== */

// 1. MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu after clicking a navigation link.
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}


// 2. PRODUCT ENQUIRY SELECTION

const productLinks = document.querySelectorAll("[data-product]");

productLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const productSelect = document.getElementById("productSelect");
    const messageBox = document.getElementById("message");

    if (!productSelect) return;

    const selectedProduct = link.dataset.product;

    // Find a matching product in the dropdown.
    const matchingOption = [...productSelect.options].find(
      function (option) {
        return option.text.toLowerCase() ===
          selectedProduct.toLowerCase();
      }
    );

    if (matchingOption) {
      productSelect.value = matchingOption.value;
    } else {
      productSelect.value = "Other";

      if (messageBox) {
        messageBox.value =
          "I am interested in: " + selectedProduct;
      }
    }
  });
});


// 3. WHATSAPP ENQUIRY FORM

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    // Prevent normal page reload.
    event.preventDefault();

    const name = document
      .getElementById("customerName")
      .value.trim();

    const phone = document
      .getElementById("customerPhone")
      .value.trim();

    const product = document
      .getElementById("productSelect")
      .value;

    const details = document
      .getElementById("message")
      .value.trim();

    // Name is required.
    if (!name) {
      alert("Please enter your name.");
      return;
    }

    // Build the WhatsApp message.
    const messageLines = [
      "Hello KGN Steel, I have a product enquiry.",
      "Name: " + name,
      phone ? "Phone: " + phone : "",
      "Product: " + product,
      details ? "Requirement: " + details : ""
    ];

    const whatsappMessage = messageLines
      .filter(Boolean)
      .join("\n");

    // IMPORTANT:
    // This number belongs to the WhatsApp recipient.
    // Change it if you want to receive enquiries
    // on a different WhatsApp number.
    const whatsappNumber = "919870917887";

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    // Open WhatsApp with the pre-filled message.
    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );
  });
}


// 4. AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}