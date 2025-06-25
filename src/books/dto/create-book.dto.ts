import { ArrayNotEmpty, IsArray, IsDateString, IsEnum, IsInt, IsOptional, IsString, MinLength } from "class-validator";
import { Genre } from "../books.interface";

export class CreateBookDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({each: true})
    authorIds: number[];

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Genre, { each: true })
    genre: Genre[];

    @IsDateString()
    datePublished: string;
    
    @IsOptional()
    @IsString()
    coverImage?: string;
}
