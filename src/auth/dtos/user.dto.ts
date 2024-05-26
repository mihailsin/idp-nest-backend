import { PartialType } from '@nestjs/mapped-types';
import {
    IsDateString,
    IsNotEmpty,
    IsString,
    // IsDate,
    Length,
    MinLength,
    IsEmail,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    lastName: string;

    middleName: string;

    @IsDateString()
    @IsNotEmpty()
    @Length(10)
    dateOfBirth: string;
}

export class LoginUserDto extends PartialType(CreateUserDto) {}
