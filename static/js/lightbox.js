document.addEventListener("DOMContentLoaded", function () {
  console.log("runner");
  const images = document.querySelectorAll("img");

  images.forEach(img => {
    // Skip emojis, icons, or other UI images if needed
    if (img.closest(".no-lightbox")) return;

    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.classList.add("lightbox-overlay");

      const enlarged = document.createElement("img");
      enlarged.src = img.src;
      enlarged.alt = img.alt;
      enlarged.classList.add("lightbox-image");

      const caption = document.createElement("p");
      caption.textContent = img.title || img.alt || "";
      caption.classList.add("lightbox-caption");

      const closeBtn = document.createElement("span");
      closeBtn.textContent = "×";
      closeBtn.classList.add("lightbox-close");

      closeBtn.addEventListener("click", () => overlay.remove());
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
      });

      overlay.appendChild(enlarged);
      if (caption.textContent) overlay.appendChild(caption);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
    });
  });
});
