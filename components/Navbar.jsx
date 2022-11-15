import Link from 'next/link'
import Image from 'next/image'

export default function Navbar({ ual }) {
	return (
		<header className="z-50 bg-slate-700 border-b-[1px] border-slate-500">
			<div className="h-24  mx-auto max-w-7xl sm:max-w-6xl flex justify-center items-center px-5">
				<nav className="w-full list-none grid grid-flow-col items-center font-bold text-sm font-merriweather">
					<li className="">
						<Link href="/" className="flex items-center w-48 sm:w-56">
							<Image
								className="undrag"
								draggable="false"
								src="/logo.png"
								alt="Wrecked Worlds"
								width={90}
								height={47.8125}
							/>
							<h1 className="hidden sm:block text-lg leading-none font-bold text-white px-5 font-cinzel -ml-4 sm:-ml-2">
								Wrecked <br />
								Worlds
							</h1>
						</Link>
					</li>
					<li>
						{/* <Link href="/inventory" className="btn-normal">
							Inventory
						</Link> */}
					</li>
					{/* <li className="ml-auto"> */}
					<li className="hidden lg:flex justify-end items-center ml-auto gap-3">
						<div className="flex flex-col justify-center items-end bg-slate-800/75 pl-10 pr-4 py-2 rounded-xl">
							<div className="font-normal text-xs">Logged in as</div>
							<div className="text-orange-300">
								{ual.activeUser?.accountName || 'Loading...'}
							</div>
						</div>
					</li>
					{/* </li> */}
					<div className="lg:hidden">
						<div className="menu-chunk"></div>
						<div className="menu-chunk">
							<div className="flex flex-col justify-center items-end bg-slate-800/75 pl-10 pr-4 py-2 rounded-xl">
								<div className="font-normal text-xs">Logged in as</div>
								<div className="text-orange-300">
									{ual.activeUser?.accountName || 'Loading...'}
								</div>
							</div>
						</div>
					</div>
				</nav>
				{/* Mobile menu */}
			</div>
		</header>
	)
}
