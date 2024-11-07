import fakeBankApi from './bank-handler';
import featureHandlers from './features-handler';

export const handlers = [...fakeBankApi, ...featureHandlers];
