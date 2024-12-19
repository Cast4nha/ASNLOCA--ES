function getYear() {
    const yearElement = document.getElementById('year'); // Altere para o ID correto
    if (yearElement) {
      yearElement.innerHTML = new Date().getFullYear();
    }
  }

// Owl carousel script
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 20,
  nav: true,
  navText: [],
  autoplay: true,
  autoplayHoverPause: true,
  responsive: {
      0: { items: 1 },
      1000: { items: 2 }
  }
});

// Google map script
function myMap() {
  var mapProp = {
      center: new google.maps.LatLng(40.712775, -74.005973),
      zoom: 18,
  };
  new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// Function to handle smooth scrolling
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var navbarHeight = document.querySelector('.navbar').offsetHeight;
  var distance = targetPosition - navbarHeight;
  var startTime = null;

  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Function to handle active menu item
function handleActiveMenuItem() {
  const navItems = document.querySelectorAll('.navbar-nav .nav-item .nav-link');

  navItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent default anchor behavior

          // Remove 'active' class from all items
          navItems.forEach(navItem => navItem.classList.remove('active'));
          
          // Add 'active' class to clicked item
          this.classList.add('active');

          // Get the target section id
          const targetId = this.getAttribute('href');

          // Smooth scroll to the target section
          if ('scrollBehavior' in document.documentElement.style) {
              window.scrollTo({
                  top: document.querySelector(targetId).offsetTop - 60,
                  behavior: 'smooth'
              });
          } else {
              smoothScroll(targetId, 1000);
          }
      });
  });

  // Set active class based on URL hash on page load
  function setActiveOnLoad() {
      const hash = window.location.hash;
      if (hash) {
          const activeItem = document.querySelector(`.navbar-nav .nav-link[href="${hash}"]`);
          if (activeItem) {
              navItems.forEach(item => item.classList.remove('active'));
              activeItem.classList.add('active');
          }
      }
  }

  window.addEventListener('load', setActiveOnLoad);
}

// Initialize the brands slider
function initBrandsSlider() {
  $('.brands-slider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      responsive: [
          { breakpoint: 768, settings: { slidesToShow: 4 } },
          { breakpoint: 520, settings: { slidesToShow: 3 } }
      ]
  });
}

// Initialize the portfolio slider
function initPortfolioSlider() {
  $('.portfolio-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      dots: true,
      responsive: [
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 520, settings: { slidesToShow: 1 } }
      ]
  });
}

// Close mobile menu when clicking on a nav item
function closeMobileMenu() {
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

  navLinks.forEach(navLink => {
      navLink.addEventListener('click', function() {
          if (window.innerWidth < 992) {
              bsCollapse.hide();
          }
      });
  });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  handleActiveMenuItem();
  initBrandsSlider();
  initPortfolioSlider(); // Inicializa o carrossel do portfólio
  closeMobileMenu(); // Fecha o menu móvel
});
