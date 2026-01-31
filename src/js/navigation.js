import "../style.css";
/**
 * CleanAura - Navigation System
 * Responsive, accessible navigation with smooth transitions
 */

class NavigationManager {
  constructor() {
    this.nav = document.querySelector("nav");
    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initNavScroll();
    this.initAccessibility();
    this.initActiveLinks();
  }

  initMobileMenu() {
    // Create mobile menu toggle button

    const navContent = this.nav.querySelector("div:first-child");
    const toggleButton = document.createElement("button");
    toggleButton.className =
      "md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1.5";
    toggleButton.innerHTML = ` 
            <span class="block w-6 h-0.5 bg-gray-700 transition-all duration-300"></span> 
            <span class="block w-6 h-0.5 bg-gray-700 transition-all duration-300"></span> 
            <span class="block w-6 h-0.5 bg-gray-700 transition-all duration-300"></span> 
        `;
    toggleButton.setAttribute("aria-label", "Toggle menu");

    // Insert toggle button before nav content
    this.nav.insertBefore(toggleButton, navContent);

    // Create mobile menu container
    const mobileMenu = document.createElement("div");
    mobileMenu.className =
      "md:hidden fixed inset-x-0 top-20 bg-white shadow-xl z-40 transform -translate-y-full opacity-0 transition-all duration-300";
    mobileMenu.id = "mobileMenu";

    // Clone and modify desktop nav for mobile
    const desktopNav = this.nav.querySelector(".hidden.md\\:flex");
    if (desktopNav) {
      const mobileNav = desktopNav.cloneNode(true);
      mobileNav.className = "flex flex-col p-6 space-y-4";

      mobileMenu.appendChild(mobileNav);
      document.body.appendChild(mobileMenu);
    }

    // Toggle mobile menu
    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      toggleButton.setAttribute("aria-expanded", !isExpanded);

      // Animate hamburger to X
      const spans = toggleButton.querySelectorAll("span");
      if (isExpanded) {
        mobileMenu.classList.remove("translate-y-0", "opacity-100");
        mobileMenu.classList.add("-translate-y-full", "opacity-0");

        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      } else {
        mobileMenu.classList.remove("-translate-y-full", "opacity-0");
        mobileMenu.classList.add("translate-y-0", "opacity-100");

        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      }
    });

    // Close mobile menu when clicking links
    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("translate-y-0") &&
        !mobileMenu.contains(e.target) &&
        !toggleButton.contains(e.target)
      ) {
        toggleButton.click();
      }
    });
  }

  initNavScroll() {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        this.nav.classList.add("shadow-lg");
        this.nav.classList.remove("shadow-sm");
      } else {
        this.nav.classList.remove("shadow-lg");
        this.nav.classList.add("shadow-sm");
      }

      // Hide/show nav on scroll
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        this.nav.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up
        this.nav.style.transform = "translateY(0)";
      }

      lastScroll = currentScroll;
    });
  }

  initAccessibility() {
    // Add keyboard navigation
    this.nav.addEventListener("keydown", (e) => {
      const links = Array.from(this.nav.querySelectorAll("a"));
      const currentIndex = links.indexOf(document.activeElement);

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < links.length - 1) {
            links[currentIndex + 1].focus();
          }
          break;

        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            links[currentIndex - 1].focus();
          }
          break;

        case "Home":
          e.preventDefault();
          links[0].focus();
          break;

        case "End":
          e.preventDefault();
          links[links.length - 1].focus();
          break;
      }
    });

    // Add focus styles
    this.nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("focus", () => {
        link.classList.add("ring-2", "ring-teal-500", "ring-offset-2");
      });

      link.addEventListener("blur", () => {
        link.classList.remove("ring-2", "ring-teal-500", "ring-offset-2");
      });
    });
  }

  initActiveLinks() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = this.nav.querySelectorAll("a[href]");

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href");
      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html") ||
        (currentPage === "index.html" && linkPage === "")
      ) {
        link.classList.add("text-teal-600", "font-semibold");
        link.classList.add("border-b-2", "border-teal-600");
      } else {
        link.classList.remove("text-teal-600", "font-semibold");
        link.classList.remove("border-b-2", "border-teal-600");
      }
    });
  }
}

// Initialize navigation
document.addEventListener("DOMContentLoaded", () => {
  window.navigationManager = new NavigationManager();
});
