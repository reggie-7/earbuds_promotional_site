// Canvas scroll animation IIFE
(() => {
  console.log("Canvas IIFE Called");

  const canvas = document.querySelector("#earbuds-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const frameCount = 301;
  const images = [];

  const buds = {
    frame: 0
  };

  // I'm loading all the webp frames into an array
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/final_${i.toString().padStart(5, '0')}.webp`;
    images.push(img);
  }
  
  console.log("Total images loaded:", images.length);

 
  
  gsap.to(buds, {
    frame: frameCount - 1,
    snap: "frame",
    scrollTrigger: {
      trigger: ".sequence-container",
      pin: true,
      scrub: 1,
      start: "top top",
      markers: true
    },
    onUpdate: render
  });

  images[0].addEventListener("load", render);

  function render() {
    console.log("Rendering frame:", buds.frame);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }

})();

// Hotspots IIFE
(() => {
  console.log("Hotspots IIFE Called");

  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
    {
      image: "images/no-sound.png",
      title: "Noise-cancelling microphones",
      text: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience."
    },
    {
      image: "images/audio.png",
      title: "360 AUDIO",
      text: "360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience."
    },
    {
      image: "images/earpiece.png",
      title: "Comfortable fit",
      text: "Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place."
    },
    {
      image: "images/charging.png",
      title: "Ultra Fast Charging",
      text: "Charge your earbuds in 30 minutes or less with our hyper charging technology."
    }
  ];

  // I'm dynamically creating the hotspot content from the array
  function loadInfo() {
    infoBoxes.forEach(function(infoBox, index) {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const imageElement = document.createElement('img');
      imageElement.src = infoBox.image;

      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.title;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.text;

      selected.appendChild(imageElement);
      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
  }

  function showInfo() {
    let selected = this.querySelector('.HotspotAnnotation');
    gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = this.querySelector('.HotspotAnnotation');
    gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }

  loadInfo();

  hotspots.forEach(function(hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

// X-Ray Slider IIFE
(() => {

    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");

    function moveDivisor() {
        // console.log(slider.value);
        divisor.style.width = `${slider.value}%`;
    }

    function resetSlider() {
        slider.value = 50;
    }

    slider.addEventListener("input", moveDivisor);
    window.addEventListener("load", resetSlider);
})();

// Hamburger Menu IIFE
(() => {
  console.log("Hamburger Menu Called");

  const hamburger = document.querySelector("#hamburger");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const buyButtonMobile = document.querySelector(".buy-button-mobile");

  function toggleMenu() {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", toggleMenu);
    
    mobileLinks.forEach(function(link) {
      link.addEventListener("click", closeMenu);
    });

    if (buyButtonMobile) {
      buyButtonMobile.addEventListener("click", closeMenu);
    }
  }

})();