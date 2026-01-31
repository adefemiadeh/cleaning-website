/**
 * CleanAura - Main JavaScript
 * Modular, clean architecture for premium cleaning website
 */

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("M&C Cleaning - Premium Cleaning Services");

  // Initialize modules
  initFAQToggle();
  initScrollToTop();
  initMobileMenu();
  initServiceCards();

  // Add loading class removal
  document.body.classList.add("loaded");
});

// Mobile Menu Toggle (NEW - This is what you're missing!)
function initMobileMenu() {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);

      // Toggle mobile menu visibility
      if (isExpanded) {
        mobileMenu.classList.remove("translate-y-0", "opacity-100", "visible");
        mobileMenu.classList.add("-translate-y-full", "opacity-0", "invisible");
      } else {
        mobileMenu.classList.remove(
          "-translate-y-full",
          "opacity-0",
          "invisible"
        );
        mobileMenu.classList.add("translate-y-0", "opacity-100", "visible");
      }

      // Animate hamburger to X
      const spans = this.querySelectorAll("span");
      if (spans.length === 3) {
        if (isExpanded) {
          spans[0].style.transform = "";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "";
        } else {
          spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
          spans[1].style.opacity = "0";
          spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        }
      }
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.click();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        if (mobileMenu.classList.contains("visible")) {
          menuToggle.click();
        }
      }
    });
  }
}

// FAQ Toggle Functionality (UPDATED)
function initFAQToggle() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector("i");
      const isOpening = answer.classList.contains("hidden");

      // Close all other FAQs
      document.querySelectorAll(".faq-answer").forEach((otherAnswer) => {
        if (otherAnswer !== answer) {
          otherAnswer.classList.add("hidden");
          const otherIcon =
            otherAnswer.previousElementSibling.querySelector("i");
          if (otherIcon) otherIcon.classList.remove("rotate-180");
          otherAnswer.previousElementSibling.classList.remove("bg-teal-50");
        }
      });

      // Toggle current FAQ
      answer.classList.toggle("hidden");
      if (icon) icon.classList.toggle("rotate-180");
      this.classList.toggle("bg-teal-50");

      // Smooth scroll if opening
      if (isOpening) {
        setTimeout(() => {
          this.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    });
  });
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollBtn.className =
    "fixed bottom-8 right-8 w-12 h-12 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transform hover:-translate-y-1 transition-all duration-300 opacity-0 invisible z-40";
  scrollBtn.id = "scrollToTop";
  scrollBtn.setAttribute("aria-label", "Scroll to top");

  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove("opacity-0", "invisible");
      scrollBtn.classList.add("opacity-100", "visible");
    } else {
      scrollBtn.classList.remove("opacity-100", "visible");
      scrollBtn.classList.add("opacity-0", "invisible");
    }
  });
}

// Service Cards Interaction
function initServiceCards() {
  const serviceCards = document.querySelectorAll(".group.bg-white.rounded-2xl");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".w-14.h-14");
      if (icon) {
        icon.style.transform = "rotate(12deg)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".w-14.h-14");
      if (icon) {
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#" || href === "#!") return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize on load
window.addEventListener("load", function () {
  initSmoothScroll();
});
