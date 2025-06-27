import { IsString, MinLength } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    @MinLength(1)
    firstName: string;

    @IsString()
    @MinLength(1)
    lastName: string;
}
