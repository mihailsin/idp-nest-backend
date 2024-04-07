import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dtos';

@Controller('characters')
export class CharactersController {
    constructor(private charactersService: CharactersService) {}

    @Get()
    async getAll() {
        return await this.charactersService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return await this.charactersService.getOne(id);
    }

    @Post()
    async create(@Body() dto: CreateCharacterDto) {
        return await this.charactersService.create(dto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCharacterDto) {
        return await this.charactersService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.charactersService.delete(id);
    }
}
