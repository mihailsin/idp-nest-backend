import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [CharactersController],
    providers: [CharactersService, PrismaService],
    imports: [],
})
export class CharactersModule {}
