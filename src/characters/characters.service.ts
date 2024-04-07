import { Injectable } from '@nestjs/common';
import { Character } from './characters.interface';
import { PrismaService } from 'src/prisma.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dtos';

@Injectable()
export class CharactersService {
    constructor(private prisma: PrismaService) {}
    async getAll(): Promise<Character[]> {
        return this.prisma.character.findMany();
    }

    async getOne(id: string): Promise<Character> {
        return this.prisma.character.findUnique({
            where: { character_id: id },
        });
    }

    async create({
        firstName,
        lastName,
        dateOfBirth,
    }: CreateCharacterDto): Promise<Character> {
        return this.prisma.character.create({
            data: { firstName, lastName, dateOfBirth },
        });
    }

    async update(id: string, dto: UpdateCharacterDto): Promise<Character> {
        return this.prisma.character.update({
            where: { character_id: id },
            data: { ...dto },
        });
    }

    async delete(id: string): Promise<Character> {
        return this.prisma.character.delete({ where: { character_id: id } });
    }
}
