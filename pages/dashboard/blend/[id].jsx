import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

import Layout from '../../../components/layout'
import Window from '../../../components/Window'
import fetcher from '../../../utils/fetcher'
import { getImage } from '../../../utils/getImage'
import startBlend from '../../../lib/blend'

export default function BlendDetails({ ual }) {
	const [selectedCard, setSelectedCard] = useState([])

	const router = useRouter()
	const { id } = router.query

	const { data: blends } = useSWR(`/api/get-blends`, fetcher)
	const blend = blends?.filter((blend) => blend.target === +id)[0]

	const ids = blend ? [blend.target, ...blend.mixture] : []

	const assetsAPI = process.env.NEXT_PUBLIC_ASSET_API_ENDPOINT
	const { data } = useSWR(
		`${assetsAPI}/atomicassets/v1/templates?collection_name=wreckedwrlds&ids=${ids}&page=1&limit=100&order=desc&sort=created`,
		fetcher
	)
	const items = data?.data

	const userName = ual.activeUser?.accountName
	const { data: iData, error } = useSWR(
		`${assetsAPI}/atomicassets/v1/assets?collection_name=wreckedwrlds&template_id=${
			blend ? blend.mixture : ''
		}&owner=${userName}&page=1&limit=100&order=desc&sort=transferred`,
		{ fetcher }
	)
	const inventory = iData?.data

	return (
		<Layout ual={ual}>
			<Window windowName="Blend Details">
				<div className="flex flex-col">
					<div className="w-full flex items-center justify-center gap-4 my-6">
						<div className="bg-amber-900/20 border border-amber-800 rounded-lg">
							<h3 className="text-center font-semibold text-xl border-b border-amber-800 py-3">
								Blend Result
							</h3>
							<div className="flex gap-4 p-4">
								{items &&
									items.map(
										(item) =>
											+item.template_id === blend?.target && (
												<div key={item.template_id} className="">
													<Image
														src={getImage(item, 'template')}
														alt={item.name}
														className="w-full h-full max-h-72 object-contain"
														height={264}
														width={264}
													/>
													<div className="flex flex-col items-center justify-center w-full pt-1">
														<p className="text-white font-semibold text-center">
															{item.name ? item.name : 'No Name'} (
															<span className="text-sm">
																{item.issued_supply}/
																{item.max_supply === '0' ? (
																	<span>&infin;</span>
																) : (
																	item.max_supply
																)}
															</span>
															)
														</p>
													</div>
												</div>
											)
									)}
							</div>
						</div>
						<div className="bg-amber-900/20 border border-amber-800 rounded-lg">
							<h3 className="text-center font-semibold text-xl border-b border-amber-800 py-3">
								Requirements
							</h3>
							<div className="flex gap-4 p-4">
								{blend &&
									blend.mixture.map((mixId) =>
										items?.map(
											(item) =>
												mixId === +item.template_id && (
													<div key={item.template_id} className="">
														<Image
															src={getImage(item, 'template')}
															alt={item.name}
															className="w-full h-full max-h-72 object-contain"
															height={264}
															width={264}
														/>
														<div className="flex flex-col items-center justify-center w-full pt-1">
															<p className="text-white font-semibold text-center">
																{item.name ? item.name : 'No Name'}
															</p>
														</div>
													</div>
												)
										)
									)}
							</div>
						</div>
					</div>
					<div className="text-center space-y-5">
						{typeof inventory === 'undefined' && (
							<div className="text-center animate-pulse">Loading...</div>
						)}
						{typeof inventory === 'object' &&
							(inventory?.length > 0 ? (
								<div className="bg-amber-900/20 border border-amber-800 rounded-lg">
									<h3 className="text-center font-semibold text-xl border-b border-amber-800 py-3">
										Your NFTs
									</h3>
									<div className="grid grid-cols-4 gap-4 p-4">
										{inventory &&
											inventory.map((item) => (
												<div
													key={item.asset_id}
													className={`hover:bg-slate-900/20 p-5 rounded-md cursor-pointer relative ${
														selectedCard.includes(item.asset_id)
															? 'bg-slate-900/20 border border-slate-900/50'
															: 'border border-transparent'
													}`}
													onClick={() =>
														(selectedCard.length < blend?.mixture.length
															? selectedCard.includes(item.asset_id)
																? setSelectedCard((e) =>
																		e.filter((i) => i !== item.asset_id)
																  )
																: setSelectedCard((e) => [...e, item.asset_id])
															: selectedCard.splice(
																	selectedCard.indexOf(item.asset_id),
																	1
															  )) && console.log(selectedCard)
													}
												>
													<Image
														src={getImage(item)}
														alt={item.name}
														className="w-full h-full max-h-72 object-contain"
														height={264}
														width={264}
													/>
													<div className="flex flex-col items-center justify-center w-full pt-1">
														<p className="text-white font-semibold text-center flex flex-col items-center gap-1">
															{item.name ? item.name : 'No Name'}{' '}
															<span className="text-xs">
																(#
																{item.template_mint})
															</span>
														</p>
													</div>
												</div>
											))}
									</div>
								</div>
							) : (
								<p className="py-3 px-5 rounded-md bg-amber-900 w-max mx-auto">
									You don&apos;t have required NFT in your wallet
								</p>
							))}
						<button
							className={`${
								selectedCard.length !== blend?.mixture.length && 'disabled'
							} border border-orange-500 bg-amber-800/80 hover:bg-amber-800 px-6 py-2 cursor-pointer`}
							disabled={selectedCard.length !== blend?.mixture.length}
							onClick={() =>
								startBlend(ual?.activeUser, selectedCard, id).then(() =>
									router.reload()
								)
							}
						>
							Blend
						</button>
					</div>
				</div>
			</Window>
		</Layout>
	)
}
