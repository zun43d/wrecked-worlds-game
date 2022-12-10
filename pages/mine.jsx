import { useState, useContext } from 'react'
import Layout from '../components/layout'
import { UALContext } from 'ual-reactjs-renderer'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { GiWarPick } from 'react-icons/gi'
import ReactModal from 'react-modal'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Image from 'next/image'

export default function Mine({ ual }) {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const { data: whiteLands, error } = useSWR('/api/whitelands', fetcher)

	const getImage = (nft) => {
		const imgId = nft.template.immutable_data.img
		const ipfsAddr = process.env.NEXT_PUBLIC_ASSET_IMAGE_ENDPOINT

		return `${ipfsAddr}/${imgId}`
	}

	const LandCard = () => {
		return whiteLands[1].map((land) => {
			const landName = land.template.immutable_data.name
			return (
				<div
					key={land.asset_id}
					className="flex-col items-center bg-slate-700 py-3 hover:shadow-xl hover:scale-[1.0095] hover:-translate-y-1 duration-200 rounded-md w-72 h-96 cursor-pointer"
				>
					<div className=" w-[264px] h-[311px] overflow-hidden mx-auto object-contain">
						<Image
							src={getImage(land)}
							alt={landName ? landName : 'No Name'}
							width={264}
							height={264}
						/>
					</div>
					<p className="text-center pt-3">{landName ? landName : 'No Name'}</p>
				</div>
			)
		})
	}

	return (
		<Layout ual={ual}>
			<div className="max-w-7xl mx-auto">
				<div className="text-4xl sm:text-5xl text-center font-semibold font-cinzel mt-16 text-orange-300">
					<h1>Mine Land</h1>
				</div>

				<div className="flex items-center justify-center gap-8 my-16">
					<div className="select-card" onClick={() => setModalIsOpen(true)}>
						<BsPlusCircleDotted size={50} />
						<span className="mt-3">Choose a land</span>
					</div>
					<div className="select-card">
						<GiWarPick size={50} />
						<span className="mt-3">Select a tool</span>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<button className="btn-colored border border-amber-400 bg-slate-800/60 hover:bg-slate-800">
						Start Mine
					</button>
				</div>
			</div>

			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
					},
					content: {
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
						width: '1100px',
						height: '800px',
						borderRadius: '8px',
						borderColor: '#9a3412',
						backgroundColor: '#1e293b',
						color: 'white',
					},
				}}
			>
				<h3 className="text-3xl sm:text-4xl text-center font-semibold font-cinzel mt-12 text-orange-300">
					Choose a land
				</h3>
				<div className="grid grid-cols-3 items-center justify-items-center gap-y-8 mx-10 my-12">
					{whiteLands ? LandCard() : <p>No lands available</p>}
				</div>
			</ReactModal>
		</Layout>
	)
}
