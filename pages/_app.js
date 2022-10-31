import '../styles/globals.css'
import 'regenerator-runtime/runtime'

import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import { Wax } from '@eosdacio/ual-wax'
import { Anchor } from 'ual-anchor'

const myChain = {
	chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
	rpcEndpoints: [
		{
			protocol: 'https',
			host: 'wax.dfuse.eosnation.io',
			port: '',
		},
	],
}

const wax = new Wax([myChain], { appName: 'My App' })
const anchor = new Anchor([myChain], { appName: 'My App' })

function MyApp({ Component, pageProps }) {
	const MyUALConsumer = withUAL(Component)

	// return <Component {...pageProps} />
	return (
		<UALProvider
			chains={[myChain]}
			authenticators={[wax, anchor]}
			appName="My App"
		>
			<MyUALConsumer {...pageProps} />
		</UALProvider>
	)
}

export default MyApp
