document.addEventListener("DOMContentLoaded", () => {
  const sliderEl = document.querySelector(".first-swiper");

  if (!sliderEl) return;

  // < 800px the layout is fluid (428px artboard): slide 313px + gap 24px
  const mobileGap = () => Math.round((window.innerWidth * 24) / 428);

  const swiper = new Swiper(sliderEl, {
    loop: true,
    spaceBetween: mobileGap(),

    slidesPerView: 1.27,

    breakpoints: {
      // desktop (1440 artboard): slides keep their natural width, 27px gap
      800: {
        slidesPerView: "auto",
        // site is capped at 1440px wide
        spaceBetween: Math.round((Math.min(window.innerWidth, 1440) * 27) / 1440)
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

  window.addEventListener("resize", () => {
    if (window.innerWidth < 800) {
      swiper.params.spaceBetween = mobileGap();
      swiper.update();
    }
  });
});
