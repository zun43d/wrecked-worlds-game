import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home({ ual }) {
	const [message, setMessage] = useState('test')

	useEffect(() => {
		ual.activeUser
			? setMessage(`Logged in as ${ual.activeUser.accountName}`)
			: setMessage('Log in please')
		console.log(ual)
	}, [ual])

	return (
		<div>
			<h1>Test Project on WAX</h1>
			<p>Connect with wax cloud wallet</p>
			{!ual.activeUser && <button onClick={ual.showModal}>Login</button>}
			{ual.activeUser && <button onClick={ual.logout}>Logout</button>}
			<p>{message}</p>
		</div>
	)
}
