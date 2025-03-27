export interface IBlogType {
  id: number;
  img?: string;
  list_img?: string;
  date: string;
  author: string;
  title: string;
  tags: string[];
  category: string;
  comments: number;
  sm_desc?: string;
  blog: string;
  slider?: boolean;
  audio?: boolean;
  video?: boolean;
  slider_images?: string[];
  desc?: string;
  audio_id?: string;
  video_id?: string;
  blockquote?: boolean;
}