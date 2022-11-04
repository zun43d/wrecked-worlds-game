import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import logoImage from '../public/logo.png'
import waxLogo from '../public/logo-wax.svg'

export default function Home({ ual }) {
	const [message, setMessage] = useState('test')

	const walletLogin = async () => {
		const res = ual.showModal()

		console.log(res)
	}

	useEffect(() => {
		ual.activeUser
			? setMessage(`Logged in as ${ual.activeUser.accountName}`)
			: setMessage('')
		// console.log(ual)
	}, [ual])

	return (
		<div className="bg-slate-900 h-screen w-screen text-white">
			<div className="flex flex-col items-center w-full h-full py-40">
				<div className="flex flex-col justify-center items-center">
					<div className="max-w-xs sm:max-w-sm">
						<Image
							src={logoImage}
							width={400}
							alt="Wrecked Worlds"
							placeholder="empty"
						/>
					</div>
					<h1 className="font-cinzel text-center font-extrabold text-5xl sm:text-6xl w-80 mt-4">
						Wrecked Worlds
					</h1>
				</div>
				<div className="flex flex-col justify-center items-center pt-10">
					{!ual.activeUser && (
						<button onClick={walletLogin} className="btn-duotone mt-10">
							Sign in with{' '}
							<Image
								src={waxLogo}
								width={75}
								alt="Wax"
								placeholder="Wax"
								className="ml-2"
							/>{' '}
						</button>
					)}
					<p className="link mb-8 font-merriweather">{message}</p>
					{ual.activeUser && (
						<button
							onClick={ual.logout}
							className="btn-duotone text-base px-6 py-3"
						>
							Logout
						</button>
					)}
					<a
						href="https://wreckedworlds.com/"
						className="text-sm font-semibold font-merriweather my-8 hover:text-orange-300 transition duration-200 ease-in-out active:scale-95"
					>
						Read more about us &gt;
					</a>
				</div>
			</div>
		</div>
	)
}
