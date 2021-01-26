import type { Middleware, Store } from "./types/main";

const createMiddleware = <S, AA>(middlewareList: Middleware<S, AA>[], store: Store<S, AA>) => {

    const next = (action: AA, middleware: typeof middlewareList, resolveMiddleware: (action: AA) => void) => {        
        const nextMw = middleware.shift();

        if (!nextMw) {
            resolveMiddleware(action);
            return;
        }

        const _next = (_action: AA) => next(_action, middleware, resolveMiddleware)

        nextMw(store)(_next)(action)

    }

    return (action: AA) => new Promise<AA>(res => {
        next(action, [...middlewareList], res);
    })
}

export default createMiddleware;
