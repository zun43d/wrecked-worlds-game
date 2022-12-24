import { useEffect } from 'react'
import Image from 'next/image'
import useSWR, { useSWRConfig } from 'swr'
import Layout from '../../components/layout'
import Window from '../../components/Window'
import stake from '../../lib/stake'
import fetcher from '../../utils/fetcher'
import { getImage } from '../../utils/getImage'

export default function Inventory({ ual }) {
	const { mutate } = useSWRConfig()

	useEffect(() => {
		mutate()
	}, [])

	const userName = ual.activeUser?.accountName

	const assetsAPI = process.env.NEXT_PUBLIC_ASSET_API_ENDPOINT

	const { data, error } = useSWR(
		`${assetsAPI}/atomicassets/v1/assets?collection_name=wreckedwrlds&owner=${userName}&page=1&limit=100&order=desc&sort=asset_id`,
		{ fetcher }
	)

	const inventory = data?.data || []

	const handleStake = async (assetId) =>
		await stake(ual.activeUser, assetId).then(() =>
			mutate(
				`${assetsAPI}/atomicassets/v1/assets?collection_name=wreckedwrlds&owner=${userName}&page=1&limit=100&order=desc&sort=asset_id`
			)
		)

	return (
		<Layout ual={ual}>
			<Window windowName="Inventory">
				<div className="my-10 mx-16 py-5 h-[580px] overflow-x-hidden overflow-y-scroll scrollbar">
					<div className="grid grid-cols-4 gap-4 w-full h-full">
						{inventory.length > 0 ? (
							inventory.map((item) => (
								<div
									key={item.asset_id}
									className="bg-amber-900/20 border border-amber-800 rounded-lg px-4 py-4"
								>
									<div className="flex flex-col items-center justify-between h-full">
										<Image
											src={getImage(item)}
											alt={item.data.name}
											className="w-full h-full object-contain"
											height={264}
											width={264}
										/>
										{/* <p className="text-white text-center mt-3">
											{item.data.name ? item.data.name : 'No Name'}
										</p> */}
										<div className="flex items-center justify-between w-full">
											<p className="text-white font-semibold text-center">
												{item.data.name ? item.data.name : 'No Name'}
											</p>
											{item.schema.schema_name !== 'lands' && (
												<button
													className="btn-colored rounded-lg py-2 px-4 text-sm"
													onClick={() => handleStake(item.asset_id)}
												>
													Stake
												</button>
											)}
										</div>
									</div>
								</div>
							))
						) : (
							<p className="col-span-4 text-orange-300 text-center mt-3 flex items-center justify-center">
								You have no items in your inventory.
							</p>
						)}
					</div>
				</div>
			</Window>
		</Layout>
	)
}
