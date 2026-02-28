document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".offer-container");
  const cardWrap = document.querySelector(".card-wrap");
  const glare = document.querySelector(".card-glare");

  // 1. REFINED 3D TILT (Subtle & Dampened)
  container.addEventListener("mousemove", (e) => {
    const rect = cardWrap.getBoundingClientRect();

    const cardX = e.clientX - rect.left;
    const cardY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // REDUCED INTENSITY: Changed from 15 to 5 for "Silent Luxury" feel
    const rotateX = ((cardY - centerY) / centerY) * -5;
    const rotateY = ((cardX - centerX) / centerX) * 5;

    // Apply transform with a smooth ease
    cardWrap.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Update Glare with smoother mapping
    const glareX = (cardX / rect.width) * 100;
    const glareY = (cardY / rect.height) * 100;
    glare.style.setProperty("--x", `${glareX}%`);
    glare.style.setProperty("--y", `${glareY}%`);
  });

  // 2. SMOOTH RESET
  container.addEventListener("mouseleave", () => {
    // Adding a transition here ensures it "floats" back to center
    cardWrap.style.transition = "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)";
    cardWrap.style.transform = `rotateX(0deg) rotateY(0deg)`;

    // Remove transition after it finishes to keep mousemove snappy
    setTimeout(() => {
      cardWrap.style.transition = "none";
    }, 1200);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Extraordinary Navbar Interactions ---
  const header = document.getElementById("main-header");
  const headerContainer = document.getElementById("header-container");
  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.querySelector(".search-bar-container");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // Scroll Effect: Change header styling on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("py-2");
      header.classList.remove("py-4");
      headerContainer.classList.add(
        "bg-white/80",
        "backdrop-blur-md",
        "shadow-md",
      );
    } else {
      header.classList.add("py-4");
      header.classList.remove("py-2");
      headerContainer.classList.remove(
        "bg-white/80",
        "backdrop-blur-md",
        "shadow-md",
      );
    }
  });

  // Search Bar Expansion
  searchToggle.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    if (searchContainer.classList.contains("active")) {
      searchContainer.querySelector("input").focus();
    }
  });

  // Mobile Menu Toggle
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  });

  // --- 2. Intersection Observer for Scroll Animations (Reveal Up) ---
  // This ensures high performance by only animating what is visible.
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // Trigger when 15% of element is visible
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);
  document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));

  // --- 3. Mousemove Parallax Effect for Hero Section (Subtle Dynamic Aesthetic) ---
  const heroSection = document.querySelector("section");
  heroSection.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    // Apply subtle movement to the floating elements
    document.querySelectorAll(".animate-float").forEach((el) => {
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
  // Reset on mouse leave
  heroSection.addEventListener("mouseleave", () => {
    document.querySelectorAll(".animate-float").forEach((el) => {
      el.style.transform = "";
    });
  });
});
