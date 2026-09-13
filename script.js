const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const reveals = document.querySelectorAll(".reveal");
const checkoutLinks = document.querySelectorAll(".checkout-link");

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -35px" }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

// Preserve somente parâmetros de atribuição comuns ao encaminhar para o checkout.
const sourceParams = new URLSearchParams(window.location.search);
const allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];

checkoutLinks.forEach((link) => {
  const checkout = new URL(link.href);
  allowedParams.forEach((name) => {
    const value = sourceParams.get(name);
    if (value) checkout.searchParams.set(name, value);
  });
  link.href = checkout.toString();
});

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("details[open]").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});
