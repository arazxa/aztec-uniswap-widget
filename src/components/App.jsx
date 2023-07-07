import { useRef, useState } from 'react'
import { SwapWidget } from '@uniswap/widgets'

import '@uniswap/widgets/fonts.css'

import { useActiveProvider } from '../connectors'
import Web3Connectors from './Web3Connectors'
import styles from '../styles/Home.module.css'

const TOKEN_LIST = [
  {
    chainId: 137,
    address: '0xe5087395862a208071A7909687a6c4Fe30458F1e',
    name: 'Aztec Crypto Currency',
    symbol: 'RGV',
    decimals: 18,
    logoURI: 'https://azteccrypto.xyz/wp-content/uploads/2023/05/cropped-logo.gif',
  },
]

export default function App() {
  const connectors = useRef(null)
  const provider = useActiveProvider()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={styles.connectors} ref={connectors} tabIndex={-1}>
        <Web3Connectors />
      </div>

      <div className={styles.widget}>
        <SwapWidget
          jsonRpcEndpoint={'https://polygon-mainnet.g.alchemy.com/v2/-WKe98fOOaF1G8OelaQEAnKRI4BuyYiz'}
          tokenList={TOKEN_LIST}
          provider={provider}
          // onConnectWallet={() => connected()}
          defaultInputTokenAddress="NATIVE"
          defaultInputAmount="1"
          defaultOutputTokenAddress="0xe5087395862a208071A7909687a6c4Fe30458F1e"
          theme={{
            primary: '#ffffff',
            secondary: '#ffffff',
            interactive: '#293249',
            container: '#0d111c',
            module: '#131a2a',
            accent: '#4c82fb',
            outline: '#CADDC2',
            dialog: '#ffffff',
            borderRadius: 0.8,
          }}
        />
      </div>
    </div>
  )
}
