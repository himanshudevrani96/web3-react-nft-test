import {useWeb3React} from '@web3-react/core';
import {useEffect} from 'react';
import {checkWallet, selectWalletHooks} from '../helpers/WalletHelper';

export const useConnectWallet = () => {
  //Define Variables
  let chainId: number | undefined;
  let active: boolean;
  let account: any;
  let connectedWallet: any;
  let activating: boolean;
  let library: any;

  const {hooks: PriorityHook} = useWeb3React();
  const hook: any = selectWalletHooks();

  const {useChainId, useIsActive, useAccounts, useIsActivating, useProvider} =
    hook;

  const {usePriorityConnector} = PriorityHook;
  const {account: web3Account} = useWeb3React();

  // Set Hooks into Variables
  chainId = useChainId();
  active = useIsActive();
  account = useAccounts();
  connectedWallet = usePriorityConnector();
  activating = useIsActivating();
  library = useProvider();
  const activate = (connector: any, networkId: number) => {
    checkWallet(connector);

    connector
      .activate(networkId)
      .then(() => {})
      .catch((error: any) => {
        console.error('Activate Func error', error.message);
      });
  };

  useEffect(() => {
    if (web3Account) {
      localStorage.setItem('address', web3Account);
    }
  }, [web3Account]);

  const deactivate = (connector: any) => {
    try {
      if (connector?.deactivate) {
        connector.deactivate();
        connector.resetState();
      } else {
        connector.resetState();
      }
      localStorage.clear();
    } catch (error) {}
  };

  return {
    activate,
    deactivate,
    chainId,
    active,
    account,
    connectedWallet,
    activating,
    library,
  };
};
