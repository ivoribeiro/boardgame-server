"use strict";

import Joi from "joi";

const siteSchema = {
    HOST: Joi.string().hostname(),
    HOST_PORT: Joi.number().port(),
    TOKEN_EXPIRES_IN: Joi.string(),
    TOKEN_SECRET: Joi.string(),
};

const schema = Joi.object(siteSchema).unknown();
const { error, value: env } = Joi.validate(process.env, schema);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    host: env.HOST || "localhost",
    hostPort: env.HOST_PORT || "30001",
    token_expires_in: env.TOKEN_EXPIRES_IN || "1 day",
    token_secret: env.TOKEN_SECRET || "1234",
};
