abstract class IBcrypt {
    abstract compare(password: string, hash: string): Promise<boolean>;
    abstract hash(password: string): Promise<string>;
}