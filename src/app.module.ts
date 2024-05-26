import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CharactersModule, ConfigModule.forRoot(), AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
