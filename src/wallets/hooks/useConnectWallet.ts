import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { checkWallet, selectWalletHooks } from "../helpers/WalletHelper";
import Web3 from "web3";
export const useConnectWallet = () => {
  //Define Variables
  let chainId: number | undefined;
  let active: boolean;
  let account: any;
  let connectedWallet: any;
  let activating: boolean;
  let library: any;
  const [balance, setBalance] = useState<string>("");
  const { hooks: PriorityHook } = useWeb3React();
  const hook: any = selectWalletHooks();

  const { useChainId, useIsActive, useAccounts, useIsActivating, useProvider } =
    hook;

  const { usePriorityConnector } = PriorityHook;
  const { account: web3Account } = useWeb3React();

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
        console.error("Activate Func error", error.message);
      });
  };

  const fetchBalance = async () => {
    try {
      if (web3Account) {
        const web3 = new Web3();
        const resp = await library?.getBalance(web3Account);
        setBalance(
          parseFloat(web3.utils.fromWei(resp?.toString(), "ether"))?.toFixed(2)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (web3Account) {
      localStorage.setItem("address", web3Account);
      fetchBalance();
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
    balance,
  };
};
