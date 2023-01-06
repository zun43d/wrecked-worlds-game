import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

import Layout from '../../../components/layout'
import Window from '../../../components/Window'
import fetcher from '../../../utils/fetcher'
import { getImage } from '../../../utils/getImage'

function BlendCard({ blend, key }) {
	const assetsAPI = process.env.NEXT_PUBLIC_ASSET_API_ENDPOINT
	const { data } = useSWR(
		`${assetsAPI}/atomicassets/v1/templates/wreckedwrlds/${blend.target}`,
		fetcher
	)
	const item = data?.data

	return (
		<Link
			href={`/dashboard/blend/${blend.target}`}
			key={key}
			className="bg-amber-900/20 hover:bg-amber-900/50 border border-amber-800 hover:border-amber-700 transition-all delay-150 rounded-lg px-4 py-4 cursor-pointer"
		>
			{item && (
				<div className="flex flex-col items-center justify-between h-full">
					<Image
						src={getImage(item, 'template')}
						alt={item.name}
						className="w-full h-full object-contain"
						height={264}
						width={264}
					/>
					{/* <p className="text-white text-center mt-3">
					{item.data.name ? item.data.name : 'No Name'}
				</p> */}
					<div className="flex flex-col items-center justify-center w-full pt-1">
						<p className="text-white font-semibold text-center">
							{item.name ? item.name : 'No Name'}
						</p>
						<p className="text-sm">
							{item.issued_supply}/
							{item.max_supply === '0' ? <span>&infin;</span> : item.max_supply}
						</p>
					</div>
				</div>
			)}
		</Link>
	)
}

export default function Blend({ ual }) {
	const { data: blends } = useSWR('/api/get-blends', fetcher)

	return (
		<Layout ual={ual}>
			<Window windowName="Blend">
				<div className="">
					<h3 className="text-center text-4xl font-cinzel py-5">
						Available Blends
					</h3>
					<div className="mt-5 mb-10 py-5 max-h-[580px] overflow-x-hidden overflow-y-scroll scrollbar">
						<div className="grid grid-cols-4 gap-4 w-full h-full">
							{blends &&
								blends.map((blend) => (
									<BlendCard blend={blend} key={blend.target} />
								))}
						</div>
					</div>
				</div>
			</Window>
		</Layout>
	)
}
