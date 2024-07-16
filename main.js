const swiper = new Swiper(".swiper", {
  loop: true,
  //autoplay: {
  //  delay: 2500,
  //  disableOnInteraction: false,
  //},

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    1180: {
      slidesPerView: 2,
    },
  },
});

document.getElementById("burger-menu").addEventListener("click", function () {
  document.getElementById("sidebar_wrapper").classList.add("open");
  document.body.classList.add("no-scroll");
});

document.getElementById("close-btn").addEventListener("click", function () {
  document.getElementById("sidebar_wrapper").classList.remove("open");
  document.body.classList.remove("no-scroll");
});
