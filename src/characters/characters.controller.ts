import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dtos';
import { JwtAuthGuard } from '../auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('characters')
export class CharactersController {
    // comment1
    constructor(private charactersService: CharactersService) {}
    @Get()
    async getAll() {
        return await this.charactersService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        try {
            return await this.charactersService.getOne(id);
        } catch (e) {
            if (e.code === 'P2025') {
                throw new HttpException(
                    'Character not found',
                    HttpStatus.NOT_FOUND
                );
            }
        }
    }

    @Post()
    async create(@Body() dto: CreateCharacterDto) {
        return await this.charactersService.create(dto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCharacterDto) {
        try {
            return await this.charactersService.update(id, dto);
        } catch (e) {
            if (e.code === 'P2025') {
                throw new HttpException(
                    'Character not found',
                    HttpStatus.NOT_FOUND
                );
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.charactersService.delete(id);
        } catch (e) {
            if (e.code === 'P2025') {
                throw new HttpException(
                    'Character not found',
                    HttpStatus.NOT_FOUND
                );
            }
        }
    }
}
