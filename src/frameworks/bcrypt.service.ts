import { hash, compare } from 'bcrypt';

export class BcryptService implements IBcrypt {

    private readonly saltOrRounds = 10;

    async compare(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }
    async hash(password: string): Promise<string> {
        return await hash(password, this.saltOrRounds);
    }
}