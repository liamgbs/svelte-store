import createMiddleware from "./createMiddleware";
import type { State, Store, Middleware, IStoreConfig } from "./types/svelte-store";
import dispatcher from "./dispatcher";

const createStore = <S, AA>(config: IStoreConfig<AA>[], middleware: Middleware<S, AA>[]): Store<S, AA> => {
    let fullState: State<S>;

    const updateFullState = (action?: AA) => {
        config.forEach(sc => sc.store.update(state => {

            const newStateSlice = action ? sc.reducer(state, action) : state;

            fullState = {
                ...fullState,
                [sc.name]: newStateSlice
            };

            return newStateSlice;
        }))
    }

    let store: Store<S, AA> = {
        dispatch: () => { },
        getState: () => fullState,
        getWritable: (name: string) => config.find(c => c.name === name)?.store
    };

    const applyMiddleware = createMiddleware<S, AA>(middleware, store);

    // initialise full state
    updateFullState(null);

    store.dispatch = dispatcher(async (action: AA) => {
        const finalAction = await applyMiddleware(action);
        updateFullState(finalAction);
    })

    return store;
}


export default createStore;