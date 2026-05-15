// ============================================================
//  FRONTEND LAUNCHPAD — script.js
// ============================================================

// ─── SMOOTH SCROLL ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ─── INTERSECTION OBSERVER ───────────────────────────────────
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".fade-section, .fade-item")
  .forEach((el) => io.observe(el));

// ─── NAV SCROLL STYLE ────────────────────────────────────────
const nav = document.querySelector(".nav");
window.addEventListener(
  "scroll",
  () => {
    nav.style.borderBottomColor =
      window.scrollY > 40 ? "rgba(0,232,122,0.08)" : "var(--border)";
  },
  { passive: true },
);

// ─── FORM SUBMISSION ─────────────────────────────────────────
const form = document.getElementById("bootcamp-form");
const submitBtn = document.getElementById("submitBtn");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation feedback
    const required = form.querySelectorAll("[required]");
    let allValid = true;
    required.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#FF4444";
        field.style.boxShadow = "0 0 0 3px rgba(255,68,68,0.1)";
        allValid = false;
        field.addEventListener(
          "input",
          () => {
            field.style.borderColor = "";
            field.style.boxShadow = "";
          },
          { once: true },
        );
      }
    });
    if (!allValid) return;

    // Processing state
    const origText = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        form.reset();
        submitBtn.textContent = origText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        window.location.href = "./success.html";
      })
      .catch((err) => {
        console.error("Submission error:", err);
        submitBtn.textContent = origText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        showToast("Something went wrong. Please try again.");
      });
  });

  // bfcache reset
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      form.reset();
      submitBtn.textContent = "Get Payment Details →";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  });
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "28px",
      left: "50%",
      transform: "translateX(-50%) translateY(10px)",
      background: "#FF4444",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "99px",
      fontSize: "13px",
      fontWeight: "500",
      fontFamily: "'Outfit', sans-serif",
      zIndex: "999",
      opacity: "0",
      transition: "all 0.25s",
      whiteSpace: "nowrap",
      pointerEvents: "none",
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(10px)";
  }, 3200);
}

// ─── PRICING CARD CLICK → PRE-SELECT PLAN ────────────────────
document.querySelectorAll(".price-card .btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = document.getElementById("plan");
    if (!plan) return;
    if (btn.closest(".price-card.featured")) {
      plan.value = "Early Bird";
    } else {
      plan.value = "Regular";
    }
  });
});
