const images = [
    { src: "./assets/Avengers Assemble Captain America Vs Thanos Army.jpeg" },
    { src: "./assets/download (1).jpeg" },
    { src: "./assets/download.jpeg" },
    { src: "./assets/Groot and Rocket.jpeg"},
    { src: "./assets/Hulk.jpeg" },
    { src: "./assets/i could do this all day long.jpeg" },
    { src: "./assets/marvel.jpeg" },
    { src: "./assets/Miles Morales_ Into the Spider-Verse Vibes!.jpeg" },
    { src: "./assets/RDJ.jpeg" },
    { src: "./assets/Silver surfer.jpeg" },
    { src: "./assets/spiderman saluda a todos _.jpeg" },
    { src: "./assets/with great power comes great responsibility.jpeg" },
    { src: "./assets/Daredevil Series iPhone Wallpaper _ 그림, 마블, 한국화.jpeg" },
    { src: "./assets/•doctor strange aesthetic•.jpeg" },
    { src: "./assets/IronFist Game.jpeg" },
    { src: "./assets/Cyclops was right_.jpeg" },
    { src: "./assets/download (2).jpeg" },
  ];
  
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const close = document.getElementById("close");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  
  let currentIndex = 0;


  
const storedImages = JSON.parse(localStorage.getItem("clientImages")) || [];
storedImages.forEach((img, i) => {
  images.push({ src: img.src, title: img.title });
});


const uploadInput = document.getElementById("uploadInput");
uploadInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const title = prompt("Enter a title for this image:", "Client Image");
      const newImage = { src: reader.result, title: title || "Untitled" };
      images.push(newImage);
      storedImages.push(newImage);
      localStorage.setItem("clientImages", JSON.stringify(storedImages));
      renderGallery();
    };
    reader.readAsDataURL(file);
  });
});

  
function renderGallery() {
    gallery.innerHTML = ""; // Clear existing
    images.forEach((img, i) => {
      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.title;
      image.dataset.index = i;
      image.addEventListener("click", () => openLightbox(i));
      gallery.appendChild(image);
    });
  }
  
  renderGallery();
  
  
  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    updateLightbox();
  }
  
  function updateLightbox() {
    lightboxImg.src = images[currentIndex].src;
    caption.innerText = `${images[currentIndex].title} (${currentIndex + 1} of ${images.length})`;
  }
  
  function closeLightbox() {
    lightbox.style.display = "none";
  }
  
  function navigate(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    updateLightbox();
  }
  
  close.addEventListener("click", closeLightbox);
  prev.addEventListener("click", () => navigate(-1));
  next.addEventListener("click", () => navigate(1));
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") navigate(1);
      else if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "Escape") closeLightbox();
    }
  });
  