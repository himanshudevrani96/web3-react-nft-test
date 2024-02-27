import { block_explorer, chain_id, rpc_url } from '../config'
import { useConnectWallet } from './useConnectWallet'

export const useWallet = () => {
  const { activate, chainId, deactivate }: any = useConnectWallet()
  const { ethereum }: any = window
  const chainIdHex = '0x' + chain_id.toString(16)
  
  const switchEthereum = async (connector: any) => {
    const chainIdHex = '0x' + chain_id.toString(16)
    
    try {
      if (Number(chainId) !== Number(chain_id)) {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        })
      }
      await activate(connector)
    } catch (error) {
      let err: any = error
      console.error({ err })

      if (err.code === 4902) {
        ethereum
          .request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdHex,
                chainName: chain_id == 11155111 ? 'Sepolia' : 'Etheruem Mainnet',
                nativeCurrency: {
                  name: 'SEPOLIA',
                  symbol: chain_id == 11155111 ? 'Sepolia' : 'ETH',
                  decimals: 18,
                },
                rpcUrls: [rpc_url],
                blockExplorerUrls: [block_explorer],
              },
            ],
          })
          .then(() => {
            activate(connector)
          })
          .catch((error: any) => {
            console.error('+_', { error })
          })
      }
      if (err.code === 4001) {
        deactivate()
      }
    }
  }

  return {
    switchEthereum,
  }
}
