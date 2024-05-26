import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    async hashString(string: string, rounds: number = 10): Promise<string> {
        const salt = await bcrypt.genSalt(rounds);
        const hashed = await bcrypt.hash(string, salt);
        return hashed;
    }

    async compare(string: string, hashedString: string): Promise<boolean> {
        return bcrypt.compare(string, hashedString);
    }
}
