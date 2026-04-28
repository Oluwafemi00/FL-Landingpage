document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements with the fade-in class
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));
});

// --- Netlify Form AJAX Submission & Redirect ---
const bootcampForm = document.getElementById("bootcamp-form");

if (bootcampForm) {
  bootcampForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = bootcampForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;

    // Set processing state
    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    const formData = new FormData(bootcampForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // 1. Reset the form inputs and button state BEFORE redirecting
        bootcampForm.reset();
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;

        // 2. Force the browser to go to the success page
        window.location.href =
          "https://frontendlaunchpad.netlify.app/success.html";
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        alert("There was an error submitting your form. Please try again.");
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
  });

  // Handle the browser's Back-Forward Cache (bfcache)
  window.addEventListener("pageshow", function (event) {
    // event.persisted is true if the page is loaded from the browser's cache (e.g., Back button)
    if (event.persisted) {
      bootcampForm.reset();
      const submitBtn = bootcampForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerText = "Get Payment Details";
        submitBtn.disabled = false;
      }
    }
  });
}
