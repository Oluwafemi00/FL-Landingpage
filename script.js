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
    e.preventDefault(); // Stop the default Netlify 404 routing

    // Change button text to show it's loading
    const submitBtn = bootcampForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    // Gather the form data
    const formData = new FormData(bootcampForm);

    // Send the data silently to Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // Convert the FormData to the URL-encoded string Netlify expects
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // Force the browser to go to the success page
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
}
