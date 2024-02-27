import {Web3ReactHooks} from '@web3-react/core';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect-v2';
import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import {hooks as coinbaseHook, coinbase} from './allConnectors/coinbase';
import {hooks as metamaskHooks, metamask} from './allConnectors/metaMask';
import {
  hooks as walletConnectHooks,
  walletConnect,
} from './allConnectors/walletConnect';

export const connectors: [MetaMask | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
  [metamask, metamaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbase, coinbaseHook]
];

export const connectorsObject = {
  metamask: {
    connector: metamask,
    hooks: metamaskHooks,
  },

  walletConnect: {
    connector: walletConnect,
    hooks: walletConnectHooks,
  },
  coinbase: {
    connector: coinbase,
    hooks: coinbaseHook,
  },
};
