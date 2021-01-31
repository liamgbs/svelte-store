import dispatcher from '../src/dispatcher';
import { Store } from '../src/types/svelte-store';
// const store : Store<any, any> = {
//     getState: () => {},
//     dispatch: () => {},
//     getWritable: () => {}
// }

describe("", () => {

    it('Returns a function, which returns a promise', () => {
        const dispatch = dispatcher(async () => {});
        expect(typeof dispatch).toBe('function');
        expect(typeof dispatch({}).then).toBe('function')
    });

    // it("queues actions for dispatch", () => {
    // });


})