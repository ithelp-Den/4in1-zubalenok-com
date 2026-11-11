document.addEventListener("DOMContentLoaded", () => {
  const sliderEl = document.querySelector(".first-swiper");

  if (!sliderEl) return;

  new Swiper(sliderEl, {
    loop: true,
    spaceBetween: 20,

    slidesPerView: 1.3, // базове значення (до 440px)

    breakpoints: {
      440: {
        slidesPerView: 2
      },
      600: {
        slidesPerView: 3
      },
      700: {
        slidesPerView: 4
      },
      800: {
        slidesPerView: 5 // максимум
      }
    },

    pagination: {
      el: ".first-slider-pagination",
      type: "progressbar"
    },

    navigation: {
      nextEl: ".first-slider-next",
      prevEl: ".first-slider-prev"
    }
  });
});

