type EventName =
  | 'refetch-mood-list'
  | 'open-log-mood'
  | 'refetch-progress'
  | 'refetch-user-diary';
type Callable = (payload: any | null) => void;

const events: Record<EventName, Callable[]> = {
  'open-log-mood': [],
  'refetch-mood-list': [],
  'refetch-progress': [],
  'refetch-user-diary': [],
};

const addListener = (event: EventName, callback: Callable) => {
  events[event].push(callback);
};

const removeListener = (callback: Callable) => {
  Object.keys(events).map(key => {
    const eventName = key as EventName;
    for (let i = 0, l = events[eventName].length; i < l; i++) {
      if (callback === events[eventName][i]) {
        events[eventName].splice(i, 1);
      }
    }
  });
};

const fireEvent = (event: EventName, payload: any | null = null) => {
  if (events[event]) {
    events[event].forEach(callbacks => {
      callbacks(payload);
    });
  }
};

const useEventListener = () => {
  return {
    addListener,
    removeListener,
    fireEvent,
  };
};

export default useEventListener;
