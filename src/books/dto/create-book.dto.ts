import { ArrayNotEmpty, IsDate, IsEnum, IsString, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @MinLength(1)
    name: string;

    @ArrayNotEmpty()
    authorIds: number[];

    @ArrayNotEmpty()
    @IsEnum(['romance', 'horror', 'sci-fi', 'psychological', 'non-fiction', 'fiction'])
    genre: string[];

    @IsDate()
    datePublished: Date;
    
    @IsString()
    coverImage?: string;
}
