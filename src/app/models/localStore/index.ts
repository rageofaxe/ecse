import { Store, createEffect, createStore, forward } from 'effector';

type LocalStore = <T>(key: string) => (value: T) => Store<T>;

const createLocalStore: LocalStore =
  <T>(key: string) =>
  (value: T) => {
    const $store = createStore(value);
    const loadFx = createEffect<string, T>();
    const saveFx = createEffect<T, T>();

    $store.on(loadFx.done, (state, { result }) => result || state);

    loadFx.use((key) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    });

    saveFx.use((value) => {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    });

    forward({
      from: $store,
      to: saveFx,
    });

    loadFx(key);

    return $store;
  };

export default createLocalStore;
