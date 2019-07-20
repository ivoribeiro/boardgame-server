import bcrypt from "bcrypt";

export interface IHash {
    salt: string;
    saltLength: number;
    hash(data: any): Promise<any>;
    compare(plainData: any, hash: string): Promise<any>;
}

export default class Hash implements IHash {
    public salt: string;
    public saltLength: number;

    constructor(salt: string, saltLength: number) {
        this.salt = salt;
        this.saltLength = saltLength;
    }
    /**
     * Hash the passed data.
     *
     * @param data      Data to hash.
     * @param _config   Additional configuration. Doesn't needed by default.
     */
    public async hash(data: any) {
        // generate a hash for the given data
        return new Promise((resolve, reject) => {
            bcrypt.hash(data, this.salt || this.saltLength, (error, hash) => error ? reject(error) : resolve(hash));
        });
    }

    /**
     * Check if the plain data is the hash equivalent.
     *
     * @param plainData     Plain data.
     * @param hash          Hash to compare with.
     * @returns {Promise}
     */
    public async compare(plainData: any, hash: string) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainData, hash, (error, equal) => error ? reject(error) : resolve(equal));
        });
    }
}
