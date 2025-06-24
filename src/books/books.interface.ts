export interface Book {
    id: number;
    name: string;
    authorId: string;
    genre: string[];
    datePublished: Date;
    coverImage: string;
}