export class CreateBookDto {
    name: string;
    authorId: string;
    genre: string[];
    datePublished: Date;
    coverImage: string;
}
