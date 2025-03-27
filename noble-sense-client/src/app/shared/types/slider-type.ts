// slider config
export type ISliderConfig = {
  loop?: boolean;
  nav?: boolean;
  dots?: boolean;
  margin?: number;
  navClass?: string[];
  navText?: string[];
  responsive: {
      0: {
          items: number;
      };
      576: {
          items: number;
      };
      768: {
          items: number;
      };
      992: {
          items: number;
      };
      1200: {
          items: number;
      };
  };
}

// home hero slider data
export type ISliderData = {
  id: number;
  pre_title: {
    text: string;
    price: number;
  };
  title: string;
  subtitle: {
    text_1: string;
    percent: number;
    text_2: string;
  };
  img: string;
  green_bg?: boolean;
  is_light?: boolean;
};
