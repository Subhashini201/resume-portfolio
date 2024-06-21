document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.image-container img');
  const arrow = document.querySelector('.scroll-down-arrow');
  const textContainer = document.getElementById('text-container');
  const dynamicText = document.getElementById('dynamic-text');
  let currentIndex = 0;
  let autoAdvance;

  // Define text phrases and their corresponding colors
  const texts = [
    { text: "Welcome", color: "#333" },
    { text: "Software Developer", color: "blue" },
    { text: "Web Developer", color: "green" }
  ];

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
      if (i === index) {
        const animation = img.getAttribute('data-animation');
        img.style.animation = `${animation} 1s ease`;
      }
    });

    // Hide arrow after the first image
    if (index === 0) {
      arrow.style.opacity = 1;
    } else {
      arrow.style.opacity = 0;
    }

    // Show or hide text container based on the current index
    if (index === 0) {
      textContainer.classList.add('visible');
    } else {
      textContainer.classList.remove('visible');
    }

    // Update dynamic text based on the current index
    if (index === 0) {
      dynamicText.textContent = texts[0].text; // Display "Welcome" initially
      dynamicText.style.color = texts[0].color;
    } else if (index === 3) {
      dynamicText.textContent = texts[1].text; // Display "Software Developer" on 4th image
      dynamicText.style.color = texts[1].color;
    } else if (index === 5) {
      dynamicText.textContent = texts[2].text; // Display "Web Developer" on 6th image
      dynamicText.style.color = texts[2].color;
    }
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  function startAutoAdvance() {
    autoAdvance = setInterval(showNextImage, 5000); // Adjust interval as needed
  }

  function stopAutoAdvance() {
    clearInterval(autoAdvance);
  }

  // Event listener for touch interactions
  document.addEventListener('touchstart', function(event) {
    stopAutoAdvance();
    const touchX = event.changedTouches[0].clientX;
    const touchY = event.changedTouches[0].clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (touchX > screenWidth * 0.8 || touchY > screenHeight * 0.8) {
      showNextImage();
    } else {
      showPreviousImage();
    }
    startAutoAdvance();
  });

  // Event listener for click interactions
  document.addEventListener('click', function(event) {
    stopAutoAdvance();
    const clickX = event.clientX;
    const clickY = event.clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (clickX > screenWidth * 0.8 || clickY > screenHeight * 0.8) {
      showNextImage();
    } else {
      showPreviousImage();
    }
    startAutoAdvance();
  });

  // Auto advance images every 5 seconds
  startAutoAdvance();
});
