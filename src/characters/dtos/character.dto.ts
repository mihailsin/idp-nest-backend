import { PartialType } from '@nestjs/mapped-types';
import {
    IsDateString,
    IsNotEmpty,
    IsString,
    Length,
    MinLength,
} from 'class-validator';

export class CreateCharacterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    lastName: string;

    @IsDateString()
    @IsNotEmpty()
    @Length(10)
    dateOfBirth: string;

    @IsString()
    image: string;
}

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
