import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ children }) {
	return (
		<>
			<div className="bg-slate-900 text-white">
				<Head>
					<title>Wrecked Worlds</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Navbar />
				<main className="">{children}</main>
			</div>
		</>
	)
}
