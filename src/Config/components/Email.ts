"use strict";

import Joi from "joi";

const emailSchema = {
    FROM_EMAIL: Joi.string().email(),
    SMTP_HOST: Joi.string().hostname(),
    SMTP_PORT: Joi.number().port(),
};

const emailAuthSchema = {
    SMTP_PASS: Joi.string(),
    SMTP_USER: Joi.string(),
};

const schema = Joi.object({ ...emailSchema, ...emailAuthSchema }).unknown();

const { error, value: env } = Joi.validate(process.env, schema);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    auth: {
        pass: env.SMTP_PASS || "83170d319d9ca2",
        user: env.SMTP_USER || "d55b7fdb18c00d",
    },
    fromEmail: env.FROM_EMAIL || "geral@accountingame.pt",
    host: env.SMTP_HOST || "smtp.mailtrap.io",
    port: parseInt(env.SMTP_PORT, 10) || 2525,
};
