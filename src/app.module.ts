import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
@Module({
    imports: [CharactersModule, ConfigModule.forRoot()],
    controllers: [],
    providers: [],
})
export class AppModule {}
