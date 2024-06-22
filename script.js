document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-container img');
    const arrow = document.querySelector('.scroll-down-arrow');
    const textContainer = document.getElementById('text-container');
    const welcomeText = document.getElementById('welcome-text');
    const uxText = document.getElementById('ux-text');
    const softwareText = document.getElementById('software-text');
    const webText = document.getElementById('web-text');
    let currentIndex = 0;
    let autoAdvance;
  
    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
        if (i === index) {
          // Apply specific animation based on index
          if (index % 3 === 0) {
            img.style.animation = 'fadeIn 1s ease';
          } else if (index % 3 === 1) {
            img.style.animation = 'slideInFromRight 1s ease';
          } else {
            img.style.animation = 'scaleIn 1s ease';
          }
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
  
    // Text changing logic
    const textElements = [welcomeText, uxText, softwareText, webText];
    let textIndex = 0;
  
    function changeText() {
      textElements.forEach((text, i) => {
        text.style.display = i === textIndex ? 'block' : 'none';
      });
      textIndex = (textIndex + 1) % textElements.length;
    }
  
    setInterval(changeText, 3000); // Change text every 3 seconds
  });

