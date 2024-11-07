import { HttpResponse, delay, http } from 'msw';

type ApiResponseItem = {
  ibnTxLsn: string;
  amount: number;
  type: string;
  postedOn: string;
};
const initialState: ApiResponseItem[] = [
  {
    ibnTxLsn: 'd89d9641-4a24-47a1-9e1b-c45855a4ab0a',
    amount: 562.23,
    type: 'deposit',
    postedOn: new Date(1729623072771).toISOString(),
  },

  {
    ibnTxLsn: '60358a6d-1c38-49df-ba05-48b77015a28f',
    amount: 15.23,
    type: 'withdrawal',
    postedOn: new Date(1729623085091).toISOString(),
  },
  {
    ibnTxLsn: '0f44ef39-16d5-41ff-8214-7d9e826669b7',
    amount: 812.23,
    type: 'deposit',
    postedOn: new Date(1729623077419).toISOString(),
  },
  {
    ibnTxLsn: '684683ac-bb24-4f15-a35b-75462c50c90c',
    amount: 19.23,
    type: 'withdrawal',
    postedOn: new Date(1729623089718).toISOString(),
  },
  {
    ibnTxLsn: '97b4ef70-75f4-4de8-b1b1-8dd75b73546e',
    amount: 420.69,
    type: 'deposit',
    postedOn: new Date(1729623095591).toISOString(),
  },
];

const handlers = [
  http.get(
    'http://fake-api.bankohypertheory.com/user/statements/:year/:month',
    async ({ params }) => {
      await delay(1000);
      const openingBalance = 118.23;

      const response = {
        accountNumber: '1234567890',
        statementDate: `${params['year']}-${params['month']}`,
        // balance: openingBalance,
        version: 1,
        openingBalance,
        transactions: initialState,
      };
      // return HttpResponse.json({
      //   openingBalance: 0,
      //   transactions: [],
      // });
      return HttpResponse.json(response);
    },
  ),
  http.post(
    'http://fake-api.bankohypertheory.com/user/deposits',
    async ({ request }) => {
      await delay(8000);
      const body = (await request.json()) as unknown as { amount: number };

      const newTransaction = {
        ibnTxLsn: crypto.randomUUID(),
        amount: body.amount,
        type: 'deposit',
        postedOn: new Date().toISOString(),
      };
      if (body.amount === 420.69) {
        throw new Error('blamma');
      }

      return HttpResponse.json(newTransaction);
    },
  ),
];

export default handlers;
