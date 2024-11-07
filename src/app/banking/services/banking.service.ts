import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import {
  BankStateApiTransactionResponse,
  BankStatementApiResponse,
  BankTransaction,
} from './types';
import { map } from 'rxjs';

@Injectable()
export class BankingService {
  #http = inject(HttpClient);

  // that I can use to load the data from the api, and give it to my store somehow
  /// the store needs BankTransactions

  addDeposit(amount: number, temporaryId: string) {
    return this.#http
      .post<BankStateApiTransactionResponse>(
        'http://fake-api.bankohypertheory.com/user/deposits',
        { amount },
      )
      .pipe(
        map((t) => {
          const thingy: BankTransaction = {
            id: t.ibnTxLsn,
            amount: t.amount,
            date: new Date(t.postedOn).getTime(),
            kind: t.type,
            newBalance: 420.69,
          };
          return thingy;
        }),
        map((result) => ({ result, temporaryId })),
      );
  }

  loadCurrentStatement() {
    return this.#http
      .get<BankStatementApiResponse>(
        'http://fake-api.bankohypertheory.com/user/statements/2024/11',
      )
      .pipe(
        map((r) => r.transactions),
        map((txns) =>
          txns.map((t) => {
            const thingy: BankTransaction = {
              id: t.ibnTxLsn,
              amount: t.amount,
              date: new Date(t.postedOn).getTime(),
              kind: t.type,
              newBalance: 420.69,
            };
            return thingy;
          }),
        ),
      );
  }
}
