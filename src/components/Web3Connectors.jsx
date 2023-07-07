import styles from '../styles/Connectors.module.css'
import { connectors, getConnectorName, Web3Connector } from '../connectors'
import { useCallback } from 'react'

function Connector({ web3Connector }) {
  const [connector, hooks] = web3Connector
  const isActive = hooks.useIsActive()

  const switchToPolygon = async () => {
    await window.ethereum?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x89',
          rpcUrls: ['https://polygon-rpc.com/'],
          chainName: 'Matic Mainnet',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
          },
          blockExplorerUrls: ['https://polygonscan.com/'],
        },
      ],
    })
  }

  const onClick = useCallback(() => {
    if (isActive) {
      connector.deactivate()
    } else {
      if (getConnectorName(connector) == 'MetaMask') {
        switchToPolygon()
      }

      connectors.forEach(([connector]) => connector.deactivate())
      connector.activate()
    }
  }, [connector, isActive])

  return (
    <div className={styles.connector}>
      <label style={{ color: '#fff' }}>{getConnectorName(connector)}</label>
      <button onClick={onClick}>{isActive ? 'Disconnect' : 'Connect'}</button>
      <svg className={[styles.status, isActive && styles.active].join(' ')} viewBox="0 0 2 2">
        <circle cx={1} cy={1} r={1} />
      </svg>
    </div>
  )
}

export default function Connectors() {
  return (
    <div className={styles.connectors}>
      {connectors.map((web3Connector, index) => (
        <Connector key={index} web3Connector={web3Connector} />
      ))}
    </div>
  )
}
