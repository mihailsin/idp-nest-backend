import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PingModule } from './ping/ping.module';

@Module({
    imports: [CharactersModule, ConfigModule.forRoot(), AuthModule, PingModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
