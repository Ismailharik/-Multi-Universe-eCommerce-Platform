export interface IMenuItem {
  id: number;
  link: string;
  title: string;
  mega_menu?: boolean;
  drop_down?: boolean;
  home_pages?: {
    id: number;
    title: string;
    img: string;
    link: string;
  }[];
  shop_mega_menus?: {
    link: string;
    title: string;
    list_menus: {
      title: string;
      link: string;
    }[];
  }[];
  product_menus?: {
    id: number;
    title: string;
    link: string;
    dropdown_menus: {
      title: string;
      link: string;
    }[];
  }[];
  dropdown_menus?: {
    title: string;
    link: string;
  }[];
}

// mobile menu type 
export interface IMobileType {
  id: number;
  homes?: boolean;
  sub_menu?: boolean;
  single_link?: boolean;
  title: string;
  link: string;
  home_pages?: {
    id: number;
    title: string;
    img: string;
    link: string;
  }[];
  sub_menus?: {
    title: string;
    link: string;
  }[];
}