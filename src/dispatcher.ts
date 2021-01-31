type DispatcherFunction<AA> = (action: AA) => Promise<void>;

const dispatcher = <AA>(dispatchFn: DispatcherFunction<AA>) => {
    let dispatchInProg = false;
    let actionQueue: AA[] = [];

    return async function dispatch(action: AA) {
        if (dispatchInProg) {
            actionQueue.push(action);            
            return;
        }

        dispatchInProg = true;        
        await dispatchFn(action);
        dispatchInProg = false;

        if (actionQueue.length) {
            return dispatch(actionQueue.shift())
        }
        
    }
}

export default dispatcher;
