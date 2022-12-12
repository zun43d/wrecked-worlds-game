import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { BsChevronDown } from 'react-icons/bs'
import { CgArrowsExchange } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'

import Exchange from './Exchange'

export default function Navbar({ ual }) {
	const router = useRouter()
	const userName = ual.activeUser?.accountName

	const [isOpen, setIsOpen] = useState(false)
	const changeOpen = (t) => {
		setIsOpen(t)
	}
	const readOpen = () => isOpen

	const { data: userBal, error } = useSWR(
		`/api/user/balance?wallet=${userName}`,
		fetcher
	)

	const wtm = userBal ? userBal[0] : '0.0000 WTM'
	const iron = userBal ? userBal[1] : '0.0000 IRON'
	const dm = userBal ? userBal[2] : '0.0000 DM'
	const wrm = userBal ? userBal[3] : '0.0000 WRM'

	const handleLogout = () => {
		router.push('/')
		ual.logout()
	}

	return (
		<header className="z-50 bg-slate-700 border-b-[1px] border-slate-500">
			<div className="h-24  mx-auto max-w-7xl sm:max-w-7xl flex justify-center items-center px-5">
				<nav className="w-full list-none grid grid-flow-col items-center font-bold text-sm font-sans">
					<li className="flex items-center gap-4">
						<div className="mr-7">
							<Link
								href={ual.activeUser ? '/inventory' : '/'}
								className="flex items-center w-max sm:w-max"
							>
								<Image
									className="undrag"
									draggable="false"
									src="/logo.png"
									alt="Wrecked Worlds"
									width={90}
									height={47.8125}
								/>
								{/* <h1 className="hidden sm:block text-lg leading-none font-bold text-white px-5 font-cinzel -ml-4 sm:-ml-2">
								Wrecked <br />
								Worlds
							</h1> */}
							</Link>
						</div>
						<div>
							<Link
								href="/inventory"
								className="btn-normal btn-trans font-semibold px-6 py-3"
							>
								Inventory
							</Link>
						</div>
						<div>
							<Link
								href="/mine"
								className="btn-normal btn-trans font-semibold px-6 py-3"
							>
								Mine Land
							</Link>
						</div>
					</li>

					<div className="font-sans ml-auto flex gap-4 items-center">
						<div className="btn-trans h-12 gap-6">
							<div className="flex items-center gap-2">
								<span className="p-3 rounded-full bg-gray-500"></span>
								<p>{iron}</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="p-3 rounded-full bg-blue-100"></span>
								<p>{dm}</p>
							</div>
							<div className="flex items-center gap-2">
								<span className="p-3 rounded-full bg-orange-400"></span>
								<p>{wrm}</p>
							</div>
						</div>

						<button onClick={() => setIsOpen(true)}>
							<CgArrowsExchange
								// size={10}
								className="rounded-md h-11 w-11 p-1.5 btn-colored"
							/>
							<Exchange
								ual={ual}
								isOpen={readOpen()}
								setIsOpen={changeOpen}
								userBal={{ wtm, iron, dm, wrm }}
							/>
						</button>

						<Menu as="div" className="relative inline-block text-left">
							<div>
								<Menu.Button className="btn-trans btn-trans-hover">
									<div className="flex flex-col items-start">
										<span className="text-orange-300 font-medium">
											{userName || 'Loading...'}
										</span>
										<span className="flex items-center justify-start w-max font-semibold">
											<span className="mr-1">
												<Image
													src="/wrecktium-ico.png"
													width="24"
													height="24"
													alt="Wrecktium icon"
												/>
											</span>
											{wtm}
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
				</nav>
			</div>
		</header>
	)
}
