import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
	return (
		<header className="w-full fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-7xl sm:max-w-6xl mx-auto pt-6">
			<div className="h-20 flex justify-center items-center px-5 border-[1px] border-orange-300/30 bg-slate-900/50 backdrop-blur-3xl rounded-xl mx-3 lg:mx-0">
				<nav className="w-full list-none grid grid-cols-3 items-center font-bold text-sm font-merriweather">
					<li className="">
						<Link href="/">
							<a className="flex items-center w-48 sm:w-56">
								<Image
									className="undrag"
									draggable="false"
									src="/logo.png"
									alt="Wrecked Worlds"
									width={90}
									height={47.8125}
								/>
								<h1 className="text-lg leading-none font-bold text-white px-5 font-cinzel -ml-4 sm:-ml-2">
									Wrecked <br />
									Worlds
								</h1>
							</a>
						</Link>
					</li>
					<li className="hidden lg:flex justify-between max-w-sm">
						<Link>
							<a className="btn-normal" target="_blank">
								Roadmap
							</a>
						</Link>
						<Link>
							<a className="btn-normal" target="_blank">
								Community
							</a>
						</Link>
						<Link>
							<a className="btn-normal">Team Info</a>
						</Link>
					</li>
					{/* <li className="ml-auto"> */}
					<li className="hidden lg:flex justify-end items-center ml-auto gap-3">
						<Link>
							<a className="btn-colored" target="_blank">
								Whitepaper
							</a>
						</Link>
						<Link href="#">
							<a className="btn-filled">Start Game</a>
						</Link>
					</li>
					{/* </li> */}
					<div className="lg:hidden" right>
						<div className="menu-chunk">
							<Link>
								<a className="btn-normal menu-item" target="_blank">
									Roadmap
								</a>
							</Link>
							<Link>
								<a className="btn-normal menu-item" target="_blank">
									Community
								</a>
							</Link>
							<Link>
								<a className="btn-normal menu-item">Team Info</a>
							</Link>
						</div>
						<div className="menu-chunk">
							<Link>
								<a
									className="btn-colored menu-item shadow-orange-300/10"
									target="_blank"
								>
									Whitepaper
								</a>
							</Link>
							<Link href="#">
								<a className="btn-filled menu-item">Start Game</a>
							</Link>
						</div>
					</div>
				</nav>
				{/* Mobile menu */}
			</div>
		</header>
	)
}
