import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import useSWR from 'swr'
import Image from 'next/image'

export default function Inventory({ ual }) {
	const [walletAddr, setWalletAddr] = useState(null)

	useEffect(() => {
		setWalletAddr(ual.activeUser?.accountName)
	}, [ual.activeUser])

	const fetcher = (...args) => fetch(...args).then((res) => res.json())
	const { data, error } = useSWR(
		`https://api.wax-aa.bountyblok.io/atomicassets/v1/assets?collection_name=wreckedwrlds&owner=${walletAddr}&page=1&limit=100&order=desc&sort=asset_id`,
		fetcher
	)

	return (
		<>
			<Layout ual={ual}>
				<div>
					<h1 className="text-4xl sm:text-5xl text-center font-semibold font-cinzel py-12 text-orange-300">
						Inventory
					</h1>
					<div className="py-10">
						{!data && <p className="text-center">Loading...</p>}
						{error && (
							<p className="text-center">
								There was an error loading your inventory.
							</p>
						)}
						{data && data?.data?.length == 0 ? (
							<p className="text-center text-white w-48 sm:w-full mx-auto">
								You don&apos;t have any items in your inventory.
							</p>
						) : (
							<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{data?.data.map((asset) => (
									<div
										key={asset.asset_id}
										className="bg-slate-900 rounded-lg p-4"
									>
										<div className="flex flex-col items-center">
											<div className="w-52 h-64 sm:w-40 sm:h-52">
												<Image
													src={`https://atomichub-ipfs.com/ipfs/${asset.data.img}`}
													alt={asset.data.name}
													className="w-full h-full object-cover"
													height={370}
													width={370}
												/>
											</div>
											<p className="text-white font-semibold text-center mt-2">
												{asset.data.name}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</Layout>
		</>
	)
}
