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
	const [landModalIsOpen, setLandModalIsOpen] = useState(false)
	const [currentLand, setCurrentLand] = useState(null)

	const [toolModalIsOpen, setToolModalIsOpen] = useState(false)
	const [currentTool, setCurrentTool] = useState(null)

	const { data: whiteLands } = useSWR('/api/whitelands', fetcher)
	const { data: stakedTools } = useSWR(
		`/api/user/staked-tools?wallet${ual.activeUser?.accountName}`,
		fetcher
	)

	const getImage = (nft) => {
		const imgId = nft.template.immutable_data.img
		const ipfsAddr = process.env.NEXT_PUBLIC_ASSET_IMAGE_ENDPOINT

		return `${ipfsAddr}/${imgId}`
	}

	const handleSelect = (nft, type) => {
		if (type == 'land') {
			setCurrentLand(nft)
			setLandModalIsOpen(false)
		} else {
			setCurrentTool(nft)
			setToolModalIsOpen(false)
		}
	}

	const LandCard = ({ onSelect }) => {
		return whiteLands[1].map((land) => {
			const landName = land.template.immutable_data.name
			return (
				<div
					key={land.asset_id}
					className="flex-col items-center bg-slate-700 py-3 hover:shadow-xl hover:scale-[1.0095] hover:-translate-y-1 duration-200 rounded-md w-72 h-96 cursor-pointer"
					onClick={() => onSelect(land, 'land')}
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
					{currentLand ? (
						<div
							className="select-card h-auto p-0 justify-between"
							onClick={() => setLandModalIsOpen(true)}
						>
							<h3 className="text-center text-orange-300 w-full border-b border-b-slate-700 py-3">
								Selected Land
							</h3>
							<div className="mx-auto flex items-center justify-center h-full pt-3">
								<Image
									src={getImage(currentLand)}
									alt={currentLand.template.immutable_data.name}
									width={264}
									height={264}
									className="px-2"
								/>
							</div>
							<p className="text-center pt-2 pb-4 text-base">
								{currentLand.template.immutable_data.name
									? currentLand.template.immutable_data.name
									: 'No Name'}
							</p>
						</div>
					) : (
						<div
							className="select-card"
							onClick={() => setLandModalIsOpen(true)}
						>
							<BsPlusCircleDotted size={50} />
							<span className="mt-3">Choose a land</span>
						</div>
					)}
					<div className="select-card" onClick={() => setToolModalIsOpen(true)}>
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
				isOpen={landModalIsOpen}
				onRequestClose={() => setLandModalIsOpen(false)}
				shouldFocusAfterRender={false}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
					},
					content: {
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
					},
				}}
				className="scrollbar modal"
			>
				<h3 className="text-3xl sm:text-4xl text-center font-semibold font-cinzel mt-16 text-orange-300">
					Choose a land
				</h3>
				<div className="grid grid-cols-3 items-center justify-items-center gap-y-8 gap-x-2 mx-10 my-16">
					{whiteLands ? (
						<LandCard onSelect={handleSelect} />
					) : (
						<p>No lands available</p>
					)}
				</div>
			</ReactModal>

			<ReactModal
				isOpen={toolModalIsOpen}
				onRequestClose={() => setToolModalIsOpen(false)}
				shouldFocusAfterRender={false}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
					},
					content: {
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
					},
				}}
				className="scrollbar modal"
			>
				<h3 className="text-3xl sm:text-4xl text-center font-semibold font-cinzel mt-16 text-orange-300">
					Select your preferred tool
				</h3>
				<div className="grid grid-cols-3 items-center justify-items-center gap-y-8 gap-x-2 mx-10 my-16">
					{stakedTools ? (
						<LandCard onSelect={handleSelect} />
					) : (
						<p>Looks like you don&apos;t have any staked tool!</p>
					)}
				</div>
			</ReactModal>
		</Layout>
	)
}
