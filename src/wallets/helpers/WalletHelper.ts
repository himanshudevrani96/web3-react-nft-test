import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect-v2'
import {CoinbaseWallet} from '@web3-react/coinbase-wallet';
import { connectorsObject } from './connectors'

export const wallets = {
  metamask: {
    id: 1,
    connector: MetaMask,
    connectWallet: connectorsObject?.metamask,
  },

  walletConnect: {
    id: 3,
    connector: WalletConnect,
    connectWallet: connectorsObject?.walletConnect,
  },
  coinbase: {
    id: 2,
    connector: CoinbaseWallet,
    connectWallet: connectorsObject?.coinbase,
  },
}

export const checkWallet = <T>(connector: T): void => {
  const connectorInstant = Object.values(wallets).filter((val: { [key: string]: any }) => {
    if (connector instanceof val.connector) {
      return val.id
    }
  })

  localStorage?.setItem('wallet', JSON.stringify(connectorInstant[0]?.id))
}

export const selectWalletHooks = () => {
  //@ts-ignore
  if (typeof window !== 'undefined') {
    const id = localStorage?.getItem('wallet')
    const walletId = id && JSON.parse(id)

    const connectorInstant = Object.values(wallets).filter(
      (val: { [key: string]: any }) => val.id === walletId,
    )

    if (connectorInstant?.length > 0) {
      return connectorInstant[0]?.connectWallet?.hooks
    }
  }

  return wallets?.metamask?.connectWallet?.hooks
}
