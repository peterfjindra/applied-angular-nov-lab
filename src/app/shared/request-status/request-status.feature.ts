import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type RequestStatus =
  | 'idle'
  | 'pending' // I'm doing a non-safe operation (post, put, delete)
  | 'loading' // I'm doing the initial load of the data
  | 'fulfilled' // Either the pending or the loading is done
  | 'fetching' // I'm refreshing the data.
  | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === 'pending'),
      isFulfilled: computed(() => requestStatus() === 'fulfilled'),

      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    })),
  );
}

export function setPending(): RequestStatusState {
  return { requestStatus: 'pending' };
}

export function setFulfilled(): RequestStatusState {
  return { requestStatus: 'fulfilled' };
}

export function setError(error: string): RequestStatusState {
  return { requestStatus: { error } };
}
