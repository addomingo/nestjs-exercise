export interface Book {
    id: number;
    name: string;
    authorIds: number[];
    genre: string[];
    datePublished: Date;
    coverImage?: string;
}