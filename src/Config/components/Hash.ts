"use strict";

import Joi from "joi";

const hashSchema = {
    HASH_LENGTH: Joi.number(),
    HASH_ROUNDS: Joi.number(),
    HASH_SALT: Joi.string(),
};

const schema = Joi.object(hashSchema).unknown();
const { error, value: env } = Joi.validate(process.env, schema);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    salt: env.HASH_SALT || "$2a$10$NH3tXRj/M1YX6cXn2RmVI.CFOiKGJz59qfoD3Coe1rN1TJi9olK1S",
    saltLength: parseInt(env.HASH_LENGTH, 10) || 10,
    saltRounds: env.HASH_ROUNDS || 10,
};
