import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { BsChevronDown } from 'react-icons/bs'
import { IoIosLogOut } from 'react-icons/io'
import { useRouter } from 'next/router'

export default function Navbar({ ual }) {
	const router = useRouter()

	const handleLogout = () => {
		ual.logout()
		router.push('/')
	}

	return (
		<header className="z-50 bg-slate-700 border-b-[1px] border-slate-500">
			<div className="h-24  mx-auto max-w-7xl sm:max-w-6xl flex justify-center items-center px-5">
				<nav className="w-full list-none grid grid-flow-col items-center font-bold text-sm font-merriweather">
					<li className="">
						<Link
							href={ual.activeUser ? '/inventory' : '/'}
							className="flex items-center w-48 sm:w-56"
						>
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
					{/* <li className=" lg:flex justify-end items-center ml-auto gap-3">
						<div className="flex flex-col justify-center items-end bg-slate-800/75 pl-10 pr-4 py-2 rounded-xl">
							<div className="font-normal text-xs">Logged in as</div>
							<div className="text-orange-300">
								{ual.activeUser?.accountName || 'Loading...'}
							</div>
						</div>
					</li> */}
					<div className="font-sans ml-auto">
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<Menu.Button className="inline-flex w-full items-center justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
									<div className="flex flex-col items-end">
										<span>Logged in as</span>
										<span className="text-orange-300">
											{ual.activeUser?.accountName || 'Loading...'}
										</span>
									</div>
									<BsChevronDown
										className="ml-3 -mr-1 h-4 w-4 text-violet-200 hover:text-violet-100"
										aria-hidden="true"
									/>
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="px-1 py-1 ">
										<Menu.Item>
											{({ active }) => (
												<button
													onClick={handleLogout}
													className={`${
														active
															? 'bg-orange-900/30 text-orange-300'
															: 'text-white'
													} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
												>
													<IoIosLogOut className="mr-3 h-5 w-5 text-orange-300" />
													Log Out
												</button>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
					{/* </li> */}
					{/* <div className="hidden">
						<div className="menu-chunk"></div>
						<div className="menu-chunk">
							<div className="flex flex-col justify-center items-end bg-slate-800/75 pl-10 pr-4 py-2 rounded-xl">
								<div className="font-normal text-xs">Logged in as</div>
								<div className="text-orange-300">
									{ual.activeUser?.accountName || 'Loading...'}
								</div>
							</div>
						</div>
					</div> */}
				</nav>
				{/* Mobile menu */}
			</div>
		</header>
	)
}
