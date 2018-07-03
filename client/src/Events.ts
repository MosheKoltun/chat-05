function Events() {
    const events = {};

    function off(name: string, listener: Function) {
        const listeners = events[name];
        if (!listeners) {
            return;
        }

        const index = listeners.indexOf(listener);
        if (index != -1) {
            listeners.splice(index, 1);
        }
    }

    function on(name: string, listener: Function) {
        const listeners = events[name] = events[name] || [];
        listeners.push(listener);
    }

    function emit(name: string, args: any[]) {
        const listeners = events[name];
        if (!listeners) {
            return;
        }

        for (var listener of listeners) {
            listener.apply(undefined, args);
        }
    }

    return {
        on,
        off,
        emit,
    };
}

export default Events