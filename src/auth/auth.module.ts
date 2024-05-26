import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/lib';

@Module({
    controllers: [AuthController],
    providers: [AuthService, BcryptService, PrismaService],
})
export class AuthModule {}
