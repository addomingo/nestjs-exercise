export interface Book {
    id: number;
    name: string;
    authorIds: number[];
    genre: Genre[];
    datePublished: string;
    coverImage?: string;
}

export enum Genre {
  Romance = "romance",
  Horror = "horror",
  SciFi = "sci-fi",
  Psychological = "psychological",
  NonFiction = "non-fiction",
  Fiction = "fiction",
}