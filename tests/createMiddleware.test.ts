import createMiddleware from '../src/createMiddleware';
import { Store } from '../src/types/svelte-store';
import { apply } from 'call-bind';

const store : Store<any, any> = {
    getState: () => {},
    dispatch: () => {},
    getWritable: () => {}
}

const middleware1 = store => next => action => {
    next(action)
}

const middleware2 = store => next => action => {
    next(action)
}

const middleware3 = store => next => action => {
    switch (action.type) {
        case "TEST_ACTION_1":
            const newAction = { ...action, payload: "TEST_PAYLOAD_1"}
            next(newAction);
            break;
        default:
            return next(action);
    }
}

describe("createMiddleware", () => {
    it('Returns a function, which returns a promise', () => {
        const applyMiddleware = createMiddleware([], store);
        expect(typeof applyMiddleware).toBe('function');
        expect(typeof applyMiddleware({}).then).toBe('function')
    });

    it('Calls middleware', () => {
        const middlewareMock1 = jest.fn(middleware1);
        const middlewareMock2 = jest.fn(middleware2);
        const middlewareMock3 = jest.fn(middleware3);
        const applyMiddleware = createMiddleware([middlewareMock1, middlewareMock2, middlewareMock3], store);
        applyMiddleware({ type: "TEST_ACTION" });
        expect(middlewareMock1.mock.calls.length).toEqual(1);
        expect(middlewareMock2.mock.calls.length).toEqual(1);
        expect(middlewareMock3.mock.calls.length).toEqual(1);
    });

    it('Passes middleware array immutably', async () => {
        const middlewareList = [middleware1, middleware2, middleware3];
        const applyMiddleware = createMiddleware(middlewareList, store);
        applyMiddleware({});
        expect(middlewareList).toEqual([middleware1, middleware2, middleware3]);
    });
})


