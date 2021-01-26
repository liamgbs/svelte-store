import type { Writable } from "svelte/store";

export interface IStoreConfig<S, AA> {
    name: string,
    store: Writable<S>,
    reducer: Reducer<any, AA>,
}

export type State<S> = {} & S;
export type Reducer<S, AA> = (state: State<S>, action: AA) => State<S>;

export type Middleware<S, AA> = 
    (state: Store<S, AA>) => 
    (next: (action: AA) => void) => 
    (action: AA) => 
    void

export type Store<S, AA> = {
    getState(): State<S>;
    getWritable<T = any>(name: string): Writable<T>
    dispatch(action: AA): void;
}