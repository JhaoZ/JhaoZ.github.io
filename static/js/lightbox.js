document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".image-gallery img");

    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.classList.add("lightbox-overlay");

        const enlarged = document.createElement("img");
        enlarged.src = img.src;
        enlarged.alt = img.alt;
        enlarged.classList.add("lightbox-image");

        const caption = document.createElement("p");
        caption.textContent = img.dataset.caption;
        caption.classList.add("lightbox-caption");

        const closeBtn = document.createElement("span");
        closeBtn.textContent = "×";
        closeBtn.classList.add("lightbox-close");

        closeBtn.addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) overlay.remove();
        });

        overlay.appendChild(enlarged);
        overlay.appendChild(caption);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
      });
    });
  });