import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {initializeConnector} from '@web3-react/core';
import { rpc_url } from '../../config';

export const [coinbase, hooks] = initializeConnector<CoinbaseWallet>(
  actions =>
    new CoinbaseWallet({
      actions,
      options: {
        url: rpc_url,
      },
    }),
);
