import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ children, ual }) {
	return (
		<>
			<div className="bg-slate-900 text-white">
				<Head>
					<title>Wrecked Worlds</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Navbar ual={ual} />
				<main className="">{children}</main>
			</div>
		</>
	)
}
