import { ISliderConfig } from "@/types/slider-type";

// Home Slider
export let HomeSlider: ISliderConfig = {
  loop: true,
  nav: true,
  dots: true,
  navClass: ['tp-slider-button-prev', 'tp-slider-button-next'],
  navText: ['<i class="fa-solid fa-chevron-up fa-rotate-270"></i>', '<i class="fa-solid fa-chevron-up fa-rotate-90"></i>'],
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 1
    },
    768: {
      items: 1
    },
    992: {
      items: 1
    },
    1200: {
      items: 1
    }
  },
};
// Home Slider
export let HomeSliderTwo: ISliderConfig = {
  loop: true,
  nav: false,
  dots: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 1
    },
    768: {
      items: 1
    },
    992: {
      items: 1
    },
    1200: {
      items: 1
    }
  },
};

// ProductOfferSlider config
export let ProductOfferSlider: ISliderConfig = {
  loop: false,
  dots: true,
  margin: 30,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 1
    },
    768: {
      items: 2
    },
    992: {
      items: 3
    },
    1200: {
      items: 3
    }
  },
};

// Product banner config
export let ProductBannerConfig: ISliderConfig = {
  loop: false,
  dots: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 1
    },
    768: {
      items: 1
    },
    992: {
      items: 1
    },
    1200: {
      items: 1
    }
  },
};

// ProductOfferSlider config
export let NewArrivalProductSliderConfig: ISliderConfig = {
  loop: false,
  dots: false,
  margin: 30,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 1
    },
    768: {
      items: 2
    },
    992: {
      items: 3
    },
    1200: {
      items: 4
    }
  },
};

// electronic blog config
export let ElectronicBlogConfig: ISliderConfig = {
  loop: true,
  dots: false,
  margin: 20,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 1
    },
    768: {
      items: 2
    },
    992: {
      items: 2
    },
    1200: {
      items: 3
    }
  },
};
