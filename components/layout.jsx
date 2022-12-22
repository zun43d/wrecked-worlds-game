import Head from 'next/head'
import Image from 'next/image'
import Navbar from './Navbar'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import { CgArrowsExchange } from 'react-icons/cg'
import { GiStoneCrafting, GiWarPick } from 'react-icons/gi'
import { SiCodesandbox } from 'react-icons/si'
import { MdOutlineLeaderboard } from 'react-icons/md'

import userWalletArea from '../public/user-wallet-area.png'
import balanceArea from '../public/balance-area.png'
import resourcesArea from '../public/resources-area.png'
import dockArea from '../public/dock-area.png'
import dockIconBg from '../public/dock-icon-bg.png'

export default function Layout({ children, ual }) {
	const userName = ual.activeUser?.accountName

	const { data: userBal, error } = useSWR(
		`/api/user/balance?wallet=${userName}`,
		fetcher
	)

	const bal = {
		wtm: userBal ? userBal[0].split(' ')[0] : '0.0000 WTM',
		iron: userBal ? userBal[1].split(' ')[0] : '0.0000 IRON',
		dm: userBal ? userBal[2].split(' ')[0] : '0.0000 DM',
		wrm: userBal ? userBal[3].split(' ')[0] : '0.0000 WRM',
	}

	return (
		<>
			<div className="bg-main text-white h-screen w-screen">
				<Head>
					<title>Wrecked Worlds</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				{/* <Navbar ual={ual} /> */}
				<main className="bg-slate-900/40 h-full w-full relative">
					<div className="absolute top-16 left-20">
						<div>
							<Image
								src={userWalletArea}
								alt="User Wallet"
								placeholder="blur"
							/>
						</div>
						<div className="absolute left-40 top-6 space-y-3">
							<h2 className="text-2xl font-cinzel">{userName}</h2>
							<button className="px-6 py-2 bg-orange-500 border border-orange-400 font-cinzel text-sm">
								Log Out
							</button>
						</div>
					</div>

					<div className="absolute top-60 left-20">
						<div>
							<Image src={balanceArea} alt="Balance Area" placeholder="blur" />
						</div>
						<div className="absolute left-9 top-3 space-y-1 w-full">
							<div className="space-y-1">
								<h2 className="text-sm font-cinzel text-orange-400 font-bold">
									Balance
								</h2>
								<p className="font-bold">
									{bal.wtm} <span className="text-orange-400">WTM</span>
								</p>
							</div>
						</div>
						<button className="absolute top-1/2 -translate-y-1/2 right-6 px-2 py-0 bg-orange-500 border border-orange-400 text-lg">
							+
						</button>
					</div>

					<div className="absolute right-20 top-24">
						<div>
							<Image
								src={resourcesArea}
								alt="Resource Area"
								placeholder="blur"
							/>
						</div>
						<div className="absolute left-9 top-5 space-y-2">
							<h2 className="text-sm font-cinzel text-orange-400 font-bold">
								Resources
							</h2>
							<div className="flex gap-4">
								<p className="font-bold">
									{bal.iron} <span className="text-orange-400">IRON</span>
								</p>
								<p className="font-bold">
									{bal.dm} <span className="text-orange-400">DM</span>
								</p>
								<p className="font-bold">
									{bal.wrm} <span className="text-orange-400">WRM</span>
								</p>
							</div>
						</div>
						<button className="absolute top-1/2 -translate-y-1/2 right-8 bg-orange-500 px-1 py-1 border border-orange-400">
							<CgArrowsExchange className="text-white" size={25} />
						</button>
					</div>

					{/* Bottom dock */}
					<div className="absolute bottom-14 left-0 right-0 flex justify-center items-center">
						<Image src={dockArea} alt="Dock Area" placeholder="blur" />
						<div className="absolute left-1/2 -translate-x-1/2 flex gap-9">
							<div className="">
								<div className="relative">
									<Image
										src={dockIconBg}
										alt="Dock Icon Background"
										placeholder="blur"
										className="mx-auto"
									/>
									<GiWarPick
										size={36}
										className="absolute text-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									/>
								</div>
								<p className="font-cinzel text-center">Mine</p>
							</div>
							<div className="">
								<div className="relative">
									<Image
										src={dockIconBg}
										alt="Dock Icon Background"
										placeholder="blur"
										className="mx-auto"
									/>
									<SiCodesandbox
										size={36}
										className="absolute text-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									/>
								</div>
								<p className="font-cinzel text-center">Inventory</p>
							</div>
							<div className="relative">
								<div className="relative">
									<Image
										src={dockIconBg}
										alt="Dock Icon Background"
										placeholder="blur"
										className="mx-auto"
									/>
									<GiStoneCrafting
										size={36}
										className="absolute text-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									/>
								</div>
								<p className="font-cinzel text-center">Craft</p>
							</div>
							<div className="relative">
								<div className="relative">
									<Image
										src={dockIconBg}
										alt="Dock Icon Background"
										placeholder="blur"
										className="mx-auto"
									/>
									<MdOutlineLeaderboard
										size={36}
										className="absolute text-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									/>
								</div>
								<p className="font-cinzel text-center">Leaders</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
