import { ArrayNotEmpty, IsArray, IsDateString, IsEnum, IsInt, IsOptional, IsString, MinLength } from "class-validator";
import { Genre } from "../../interfaces/book";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    name: string;

    @ApiPropertyOptional({ type: [Number] })
    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    authorIds: number[];

    @ApiProperty({ type: [String] })
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Genre, { each: true })
    genre: Genre[];

    @ApiProperty()
    @IsDateString()
    datePublished: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    coverImage?: string;
}
