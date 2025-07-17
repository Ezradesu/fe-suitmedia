export interface Post {
  id: number;
  title: string;
  published_at: string;
  small_image: {
    id: number;
    mime: string;
    file_name: string;
    url: string;
  }[];
}

export interface ApiResponse {
  data: Post[];
  meta: {
    total: number;
  };
}
