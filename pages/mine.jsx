import { useState, useContext } from 'react'
import Layout from '../components/layout'
import { UALContext } from 'ual-reactjs-renderer'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { GiWarPick } from 'react-icons/gi'
import ReactModal from 'react-modal'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Image from 'next/image'
import mine from '../lib/mine'

export default function Mine({ ual }) {
	const [landModalIsOpen, setLandModalIsOpen] = useState(false)
	const [currentLand, setCurrentLand] = useState(null)

	const [toolModalIsOpen, setToolModalIsOpen] = useState(false)
	const [currentTool, setCurrentTool] = useState(null)

	const [isMining, setIsMining] = useState(false)

	const { data: stakedLands } = useSWR('/api/staked-lands', fetcher)
	const { data: stakedTools } = useSWR(
		`/api/user/staked-tools?wallet=${ual.activeUser?.accountName}`,
		fetcher
	)

	const getImage = (nft) => {
		const imgId = nft.template.immutable_data.img
		const ipfsAddr = process.env.NEXT_PUBLIC_ASSET_IMAGE_ENDPOINT

		return `${ipfsAddr}/${imgId}`
	}

	const handleMine = async (activeUser, landAssetId, toolAssetId) => {
		setIsMining(true)
		await mine(activeUser, landAssetId, toolAssetId)
			.then((res) => {
				setIsMining(false)

				if (res.message) {
					return alert(res.message)
				}

				res.transactionId &&
					alert(
						'\nMining Success!!\n\nReceived Rewards\n- 150.0000 IRON\n- 50.0000 DM\n- 10.0000 WRM'
					)
			})
			.catch((err) => {
				setIsMining(false)
				alert('Something went wrong!')
			})
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
		return stakedLands.map((land) => {
			const landName = land.template.immutable_data.name
			return (
				<div
					key={land.asset_id}
					className="w-72 h-[400px] flex flex-col items-center justify-evenly bg-slate-700 hover:shadow-xl hover:scale-[1.0095] hover:-translate-y-1 duration-200 rounded-md cursor-pointer"
					onClick={() => onSelect(land, 'land')}
				>
					<div className="mx-auto object-contain">
						<Image
							src={getImage(land)}
							alt={landName ? landName : 'No Name'}
							width={264}
							height={264}
							className="px-5"
						/>
					</div>
					<p className="text-center">{landName ? landName : 'No Name'}</p>
				</div>
			)
		})
	}

	// I know that I shouldn't repeat same code but sorry, I feel lazy right now to adjust everything
	const ToolCard = ({ onSelect }) => {
		return stakedTools.map((tool) => {
			const toolName = tool.template.immutable_data.name
			return (
				<div
					key={tool.asset_id}
					className="w-72 h-96 flex flex-col items-center justify-evenly bg-slate-700 hover:shadow-xl hover:scale-[1.0095] hover:-translate-y-1 duration-200 rounded-md cursor-pointer"
					onClick={() => onSelect(tool, 'tool')}
				>
					<div className="mx-auto object-contain">
						<Image
							src={getImage(tool)}
							alt={toolName ? toolName : 'No Name'}
							width={264}
							height={264}
							className="px-5"
						/>
					</div>
					<p className="text-center">{toolName ? toolName : 'No Name'}</p>
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
							className="select-card h-[442px] p-0 justify-between"
							onClick={() => setLandModalIsOpen(true)}
						>
							<h3 className="text-center text-orange-300 w-full border-b border-b-slate-700 py-3">
								Selected Land
							</h3>
							<div className="mx-auto flex items-center justify-center h-80 pt-3">
								<Image
									src={getImage(currentLand)}
									alt={currentLand.template.immutable_data.name}
									height={288}
									width={288}
									className="px-2 h-full w-full object-contain"
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
					{currentTool ? (
						<div
							className="select-card h-[442px] p-0 justify-between"
							onClick={() => setToolModalIsOpen(true)}
						>
							<h3 className="text-center text-orange-300 w-full border-b border-b-slate-700 py-3">
								Current Tool
							</h3>
							<div className="mx-auto flex items-center justify-center h-80 pt-3">
								<Image
									src={getImage(currentTool)}
									alt={currentTool.template.immutable_data.name}
									width={264}
									height={264}
									className="px-2 w-full h-full object-contain"
								/>
							</div>
							<p className="text-center pt-2 pb-4 text-base">
								{currentTool.template.immutable_data.name
									? currentTool.template.immutable_data.name
									: 'No Name'}
							</p>
						</div>
					) : (
						<div
							className="select-card"
							onClick={() => setToolModalIsOpen(true)}
						>
							<GiWarPick size={50} />
							<span className="mt-3">Select a tool</span>
						</div>
					)}
				</div>

				<div className="flex items-center justify-center">
					<button
						className={`${
							!(currentLand && currentTool) && 'disabled'
						} btn-colored ${
							!isMining && 'border'
						} border-amber-400 bg-slate-800/60 hover:bg-slate-800`}
						disabled={!(currentLand && currentTool) || isMining}
						onClick={() =>
							handleMine(
								ual.activeUser,
								currentLand.asset_id,
								currentTool.asset_id
							)
						}
					>
						{isMining ? 'Mining...' : 'Start Mine'}
					</button>
				</div>
			</div>

			<ReactModal
				isOpen={landModalIsOpen}
				onRequestClose={() => setLandModalIsOpen(false)}
				shouldFocusAfterRender={false}
				ariaHideApp={false}
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
					{stakedLands ? (
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
				ariaHideApp={false}
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
				<div>
					<h3 className="text-3xl sm:text-4xl text-center font-semibold font-cinzel mt-16 text-orange-300">
						Select your preferred tool
					</h3>
					<p className="text-slate-400 text-center mt-3">
						Only staked tools can be used for mining.
					</p>
				</div>
				<div className="grid grid-cols-3 items-center justify-items-center gap-y-8 gap-x-2 mx-10 my-16">
					{stakedTools ? (
						<ToolCard onSelect={handleSelect} />
					) : (
						<p className="text-center">
							Looks like you don&apos;t have any staked tool!
						</p>
					)}
				</div>
			</ReactModal>
		</Layout>
	)
}
