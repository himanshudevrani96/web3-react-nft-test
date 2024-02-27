import {initializeConnector} from '@web3-react/core';
import {WalletConnect as WalletConnectV2} from '@web3-react/walletconnect-v2';
import { block_explorer, chain_id, rpc_url } from '../../config';
const rpcArray = {
  5: {
    urls: [
      rpc_url,
    ],
    name: chain_id == 5 ? 'Goerli' : 'Ethereum Mainnet',
    nativeCurrency: chain_id == 5 ? 'Gth' : 'Eth',
    blockExplorerUrls: [block_explorer],
  },
};
const [mainnet, ...optionalChains] = Object.keys(rpcArray).map(Number);
export const [walletConnect, hooks] = initializeConnector<WalletConnectV2>(
  actions =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: 'ffa163e84eb10e95c5e5033574aee1d8',
        chains: [mainnet],
        optionalChains,
        showQrModal: true,
      },
    }),
);
