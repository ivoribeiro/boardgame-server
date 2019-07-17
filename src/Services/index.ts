import { default as config } from "../Config";
import Hash, { IHash } from "../Utils/Hash";
import Email, { IEmail } from "./Email";

const host = config.email.host;
const port = config.email.port;
const auth = { user: config.email.auth.user, pass: config.email.auth.pass };

const salt = config.hash.salt;
const saltLength = config.hash.saltLength;

export const email: IEmail = new Email(host, port, auth);
export const hash: IHash = new Hash(salt, saltLength);
