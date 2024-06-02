import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, LoginUserDto } from './dtos/user.dto';
import { BcryptService } from 'src/lib';
import { User } from './user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private encryptor: BcryptService
    ) {}

    async getUser(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        return user;
    }

    async signUp({
        email,
        password,
        firstName,
        lastName,
        middleName,
        dateOfBirth,
    }: CreateUserDto) {
        const user = await this.getUser(email);
        if (user) {
            throw new HttpException(
                'Email already taken',
                HttpStatus.BAD_REQUEST
            );
        }
        const hashed = await this.encryptor.hashString(password, 8);
        const createdUser = await this.prisma.user.create({
            data: {
                email,
                password: hashed,
                firstName,
                lastName,
                middleName,
                dateOfBirth,
            },
        });

        if (createdUser) {
            const payload = { userId: createdUser.id };
            const jwt = this.jwtService.sign(payload);

            return { access_token: jwt };
        }
    }

    async login({ email, password }: LoginUserDto) {
        const user = await this.getUser(email);
        if (!user) {
            throw new HttpException(
                `User with email ${email} does not exists`,
                400
            );
        }
        const passwordIsValid = await this.encryptor.compare(
            password,
            user.password
        );
        if (!passwordIsValid)
            throw new HttpException('Wrong Password!', HttpStatus.UNAUTHORIZED);

        const payload = { userId: user.id };
        const jwt = this.jwtService.sign(payload);

        return { access_token: jwt };
    }
}
