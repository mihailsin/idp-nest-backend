import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { BcryptService } from '../lib';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '12h' },
        }),
    ],
    providers: [AuthService, BcryptService, PrismaService, JwtStrategy],
})
export class AuthModule {}
