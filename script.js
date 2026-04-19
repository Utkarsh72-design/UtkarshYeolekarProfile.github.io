document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.createElement("div");
  lightbox.id = "image-lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close image view">&times;</button>
      <img class="lightbox-image" src="" alt="Expanded preview" />
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const backdrop = lightbox.querySelector(".lightbox-backdrop");

  function openLightbox(imageSrc, imageAlt) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt || "Expanded preview";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-expand-image]");
    if (trigger) {
      const imageSrc = trigger.getAttribute("data-image-src");
      const imageAlt = trigger.getAttribute("data-image-alt");
      if (imageSrc) {
        openLightbox(imageSrc, imageAlt);
      }
    }
  });

  closeButton.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
});
