export interface HomeSlider {
  id: number;
  preTitle: {
    text: string;
    price: number;
  };
  title: string;
  subtitle: {
    text1: string;
    percent: number;
    text2: string;
  };
  img: string;
  backgroundColor: string;
  backgroundImg: string;
  parent: string;
}
