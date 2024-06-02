import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Module({
    controllers: [CharactersController],
    providers: [CharactersService, PrismaService, JwtAuthGuard],
    imports: [],
})
export class CharactersModule {}
