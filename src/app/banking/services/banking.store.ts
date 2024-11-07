import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { setError, setFulfilled, setPending, withRequestStatus } from '@shared';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { BankingService } from './banking.service';
import {
  BankTransaction,
  BankTransactionListModel,
  TransactionType,
} from './types';

type BankState = {
  openingBalance: number;
  _balance: number;
};

const initialState: BankState = {
  openingBalance: 0,
  _balance: 0,
};
export const BankingStore = signalStore(
  withDevtools('banking-store'),
  withState<BankState>(initialState),
  withEntities({
    collection: '_pendingTransactions',
    entity: type<BankTransaction>(),
  }),
  withEntities({
    collection: '_settledTransactions',
    entity: type<BankTransaction>(),
  }),

  withRequestStatus(),
  withMethods((store) => {
    const service = inject(BankingService);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            service.loadCurrentStatement().pipe(
              tapResponse({
                next(value) {
                  patchState(
                    store,
                    setEntities(value, { collection: '_settledTransactions' }),
                    setFulfilled(),
                    {
                      _balance: value[value.length - 1].newBalance,
                    },
                  );
                },
                error() {
                  patchState(store, setError('Could not get the transactions'));
                },
              }),
            ),
          ),
        ),
      ),

      withdraw: (amount: number) => {
        // patchState(store, { _balance: store._balance() - amount });
        const withdrawalRecord: BankTransaction = {
          id: crypto.randomUUID(),
          kind: 'withdrawal',
          date: new Date().getTime(),
          amount,
          newBalance: store._balance() - amount,
        };
        // patchState(store, addEntity(withdrawalRecord), {
        //   _balance: withdrawalRecord.newBalance,
        // });
      },
      deposit: rxMethod<number>(
        pipe(
          map((amount) => {
            const newPendingTransaction = createTransactionRecord(
              amount,
              store._balance(),
              'deposit',
            );
            patchState(
              store,
              addEntity(newPendingTransaction, {
                collection: '_pendingTransactions',
              }),
            );
            return [amount, newPendingTransaction.id] as [number, string];
          }),
          mergeMap(([amount, pendingId]) =>
            service.addDeposit(amount, pendingId).pipe(
              tapResponse({
                next: (r) => {
                  patchState(
                    store,
                    addEntity(r.result, { collection: '_settledTransactions' }),
                    removeEntity(r.temporaryId, {
                      collection: '_pendingTransactions',
                    }),
                  );
                },
                error: () => console.log('error'),
              }),
            ),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      entities: computed(() => {
        const pendingTransactions = store
          ._pendingTransactionsEntities()
          .map((t) => ({ ...t, isPending: true }) as BankTransactionListModel);
        const settledTransactions = store
          ._settledTransactionsEntities()
          .map((t) => ({ ...t, isPending: false }) as BankTransactionListModel);
        return [...settledTransactions, ...pendingTransactions];
      }),
      withdrawalAvailable: computed(() => true),
      balance: computed(() => {
        return 420.69;
        // return store.entities().reduce((lhs, rhs) => {
        //   if (rhs.kind === 'deposit') {
        //     return lhs + rhs.amount;
        //   } else {
        //     return lhs - rhs.amount;
        //   }
        // }, store.openingBalance());
      }),
    };
  }),
  withHooks({
    onInit(store) {
      //
      store._load();
      // "polling"
      // interval(2_000)
      //   // 👇 Automatically unsubscribe when the store is destroyed.
      //   .pipe(takeUntilDestroyed())
      //   .subscribe(() => store._load());
    },
  }),
);

function createTransactionRecord(
  amount: number,
  startingBalance: number,
  txType: TransactionType,
): BankTransaction {
  return {
    id: crypto.randomUUID(),
    amount,
    date: Date.now(),
    kind: txType,
    newBalance:
      txType == 'deposit' ? startingBalance + amount : startingBalance - amount,
  };
}
