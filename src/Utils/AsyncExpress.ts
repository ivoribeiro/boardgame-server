// Copyright 2018 Jonathan Simms
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
// this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
// this list of conditions and the following disclaimer in the documentation
// and/or other materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its
// contributors may be used to endorse or promote products derived from this
// software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import * as X from "express";
import { IRouter, PathParams } from "express-serve-static-core";
import * as fp from "lodash/fp";

export type AsyncRequestHandler = (req: X.Request, res: X.Response, next: X.NextFunction) => Promise<any>;

export type AsyncErrorRequestHandler = (
    err: any,
    req: X.Request,
    res: X.Response,
    next: X.NextFunction,
) => Promise<any>;

export type AsyncRequestHandlerParams =
    | AsyncRequestHandler
    | AsyncErrorRequestHandler
    | Array<AsyncRequestHandler | AsyncErrorRequestHandler>;

export interface IAsyncRouterMatcher<T> {
    (path: PathParams, ...handlers: AsyncRequestHandler[]): T;
    (path: PathParams, ...handlers: AsyncRequestHandlerParams[]): T;
}

export interface AsyncRouter extends IRouter {
    useAsync: IAsyncRouterMatcher<this>;
    getAsync: IAsyncRouterMatcher<this>;
    postAsync: IAsyncRouterMatcher<this>;
    putAsync: IAsyncRouterMatcher<this>;
    deleteAsync: IAsyncRouterMatcher<this>;
    patchAsync: IAsyncRouterMatcher<this>;
    optionsAsync: IAsyncRouterMatcher<this>;
    headAsync: IAsyncRouterMatcher<this>;
}

const wrapHandler = (handler: AsyncRequestHandler): AsyncRequestHandler => {
    return (req: X.Request, res: X.Response, _next: X.NextFunction) => {
        const next = fp.once(_next);
        return handler(req, res, next)
            .then((_: any) => (res.headersSent ? null : next()))
            .catch((err: Error) => (res.headersSent ? null : next(err)));
    };
};

const wrapMiddleware = (handler: X.ErrorRequestHandler): AsyncErrorRequestHandler => {
    return (err: any, req: X.Request, res: X.Response, _next: X.NextFunction) => {
        const next = fp.once(_next);
        return handler(err, req, res, next).then(next, next);
    };
};

type Wrappable = AsyncRequestHandler | AsyncErrorRequestHandler;

export const wrap = <T extends Wrappable>(arg: T): T => {
    if (arg.length === 3) {
        return wrapHandler(arg as AsyncRequestHandler) as T;
    } else if (arg.length === 4) {
        return wrapMiddleware(arg as AsyncErrorRequestHandler) as T;
    } else {
        throw new Error("unknown argument type");
    }
};

const wrapRouterMatcher = <T>(
    app: AsyncRouter,
    rm: X.IRouterMatcher<T>,
): IAsyncRouterMatcher<T> => {
    return (path: PathParams, ...handlers: AsyncRequestHandlerParams[]): T => {
        const wrapped = handlers.map((h) => (fp.isArray(h) ? h.map(wrap) : wrap(h)));

        return rm.apply(app, [path, ...wrapped]);
    };
};

export const DecorateAsync = (app: IRouter): AsyncRouter => {
    const wrapped: AsyncRouter = app as AsyncRouter;

    const useAsync = wrapRouterMatcher(wrapped, app.use);
    const getAsync = wrapRouterMatcher(wrapped, app.get);
    const postAsync = wrapRouterMatcher(wrapped, app.post);
    const putAsync = wrapRouterMatcher(wrapped, app.put);
    const deleteAsync = wrapRouterMatcher(wrapped, app.delete);
    const patchAsync = wrapRouterMatcher(wrapped, app.patch);
    const optionsAsync = wrapRouterMatcher(wrapped, app.options);
    const headAsync = wrapRouterMatcher(wrapped, app.head);

    return Object.assign(wrapped, {
        deleteAsync,
        getAsync,
        headAsync,
        optionsAsync,
        patchAsync,
        postAsync,
        putAsync,
        useAsync,
    });
};
