/**
 * CleanAura - Animation System
 * Using Tailwind classes for animations
 */

class AnimationManager {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initHoverAnimations();
    this.initPageTransitions();
  }

  initScrollAnimations() {
    // Create Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to trigger Tailwind transitions
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "translate-x-0"
            );
            entry.target.classList.remove(
              "opacity-0",
              "translate-y-6",
              "translate-x-6",
              "translate-x-[-6]"
            );
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      this.observer.observe(el);
    });
  }

  initHoverAnimations() {
    // Button hover effects are already handled by Tailwind
    // Just add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "button, a, input, select, .hover\\:shadow-xl, .hover\\:-translate-y-1"
    );

    interactiveElements.forEach((el) => {
      if (!el.style.transition) {
        el.style.transition = "all 0.3s ease";
      }
    });
  }

  initPageTransitions() {
    // Smooth internal link transitions
    document.querySelectorAll('a[href^="./"], a[href^=""]').forEach((link) => {
      if (
        !link.hash &&
        !link.target &&
        link.href.includes(window.location.origin)
      ) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const href = link.getAttribute("href");

          // Add fade out using Tailwind classes
          document.body.classList.add("opacity-50");

          setTimeout(() => {
            window.location.href = href;
          }, 300);
        });
      }
    });

    // Remove opacity on page load
    window.addEventListener("load", () => {
      document.body.classList.remove("opacity-50");
    });
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const animationManager = new AnimationManager();

  // Add mobile optimization
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    // On mobile, show all elements immediately
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add("opacity-100", "translate-y-0", "translate-x-0");
      el.classList.remove("opacity-0", "translate-y-6", "translate-x-6");
    });
  }

  // Handle reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document
      .querySelectorAll(".animate-on-scroll, .animate-float")
      .forEach((el) => {
        el.classList.remove("animate-on-scroll", "animate-float");
        el.classList.add("opacity-100", "translate-y-0", "translate-x-0");
      });
  }
});
