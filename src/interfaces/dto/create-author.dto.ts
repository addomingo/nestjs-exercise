import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    lastName: string;
}
