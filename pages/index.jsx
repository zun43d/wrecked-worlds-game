import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import logoImage from '../public/logo.png'
import waxLogo from '../public/logo-wax.svg'
import signInWax from '../public/sign-in-wax.svg'

export default function Home({ ual }) {
	const [user, setUser] = useState(null)

	const router = useRouter()

	const walletLogin = async () => {
		ual.showModal()
	}

	useEffect(() => {
		setUser(ual.activeUser)

		ual.activeUser && router.push('/dashboard')

		console.log(ual)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ual])

	return (
		<>
			<Head>
				<title>Login | Wrecked Worlds</title>
			</Head>

			<div className="bg-main h-screen w-screen text-white">
				<div className="flex flex-col items-center w-full h-full py-40 backdrop-blur-lg bg-slate-900/40">
					<div className="flex flex-col justify-center items-center h-full">
						{/* <div className="max-w-xs sm:max-w-sm">
							<Image
								src={logoImage}
								width={400}
								alt="Wrecked Worlds"
								placeholder="empty"
							/>
						</div> */}
						<p className="text-xl font-sans font-normal pb-5 italic">
							Welcome to,
						</p>
						<p className="text-3xl font-merriweather font-semibold">
							Initial of the Beginning.
						</p>
						<h1 className="font-cinzel text-center text-orange-300 font-extrabold text-5xl sm:text-8xl mt-4 py-8">
							Wrecked Worlds
						</h1>
						{/* <p className="text-white text-sm bg-slate-800 rounded-md px-2 py-1">
							The beta phase
						</p> */}

						<div className="flex flex-col justify-center items-center">
							{!ual.activeUser && (
								<button onClick={walletLogin} className="my-3">
									{/* Sign in with{' '} */}
									<Image
										src={signInWax}
										width={250}
										alt="Wax"
										placeholder="Wax"
										className="ml-2"
									/>{' '}
								</button>
							)}
							{ual.activeUser && (
								<>
									<p className="link mb-8 font-merriweather">
										Logged in as {ual.activeUser?.accountName}
									</p>
									<p className="">Redirecting to dashboard...</p>
								</>
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
			</div>
		</>
	)
}
