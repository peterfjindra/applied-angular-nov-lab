export type TimeStamp = number;

// export type Deposit = {
//   id: string;
//   kind: 'deposit';
//   date: TimeStamp;
//   amount: number;
//   newBalance: number;
// };

// export type Withdrawal = {};
export type TransactionType = 'withdrawal' | 'deposit';
export type BankTransaction = {
  id: string;
  kind: TransactionType;
  date: TimeStamp;
  amount: number;
  newBalance: number;
};

export type BankStatementApiResponse = {
  openingBalance: number;
  transactions: BankStateApiTransactionResponse[];
};

export type BankStateApiTransactionResponse = {
  ibnTxLsn: string;
  amount: number;
  type: TransactionType;
  postedOn: string;
};

export type BankTransactionListModel = BankTransaction & {
  isPending: boolean;
};
