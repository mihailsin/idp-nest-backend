import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() dto: CreateUserDto) {
        return await this.authService.signUp(dto);
    }

    @Post('/login')
    async login(@Body() dto: LoginUserDto) {
        return await this.authService.login(dto);
    }
}
