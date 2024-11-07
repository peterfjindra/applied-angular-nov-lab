import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
type CountByOptions = 1 | 3 | 5;
type CounterState = {
  current: number;
  by: CountByOptions;
};
export const CounterStore = signalStore(
  withState<CounterState>({
    current: 0,
    by: 1,
  }),
  withMethods((store) => {
    return {
      setCountBy: (by: CountByOptions) => patchState(store, { by }),
      increment: () =>
        patchState(store, { current: store.current() + store.by() }),
      decrement: () =>
        patchState(store, { current: store.current() - store.by() }),
    };
  }),
  withComputed((store) => ({
    decrementDisabled: computed(() => store.current() - store.by() < 0),
    fizzBuzz: computed(() => fizzBuzzer(store.current())),
  })),
  withHooks({
    onInit(store) {
      // check the local storage for stored values, and if they are there, use those.

      const savedJson = localStorage.getItem('counter');
      if (savedJson !== null) {
        const state = JSON.parse(savedJson) as unknown as CounterState;
        patchState(store, state);
      }
      // every time the state changes, write it to local store.

      watchState(store, (state) => {
        localStorage.setItem('counter', JSON.stringify(state));
      });
    },
  }),
);

function fizzBuzzer(num: number): 'Fizz' | 'Buzz' | 'FizzBuzz' | '' {
  if (num === 0) {
    return '';
  }
  if (num % 5 === 0 && num % 3 === 0) {
    return 'FizzBuzz';
  }
  if (num % 5 === 0) {
    return 'Buzz';
  }
  if (num % 3 === 0) {
    return 'Fizz';
  }
  return '';
}
