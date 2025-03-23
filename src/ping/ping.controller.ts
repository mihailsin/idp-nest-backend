import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
@Controller('ping')
export class PingController {
    @Get()
    async ping() {
        return 'pong';
    }
}
