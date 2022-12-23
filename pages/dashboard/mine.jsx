import { useState } from 'react'
import Image from 'next/image'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { GiWarPick } from 'react-icons/gi'
import Layout from '../../components/layout'
import Window from '../../components/Window'

export default function Mine({ ual }) {
	const [landModalIsOpen, setLandModalIsOpen] = useState(false)
	const [currentLand, setCurrentLand] = useState(null)

	const [toolModalIsOpen, setToolModalIsOpen] = useState(false)
	const [currentTool, setCurrentTool] = useState(null)

	const [isMining, setIsMining] = useState(false)

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

	const getImage = (nft) => {
		const imgId = nft.template.immutable_data.img
		const ipfsAddr = process.env.NEXT_PUBLIC_ASSET_IMAGE_ENDPOINT

		return `${ipfsAddr}/${imgId}`
	}

	return (
		<Layout ual={ual}>
			<Window ual={ual} windowName="Mining">
				<div className="flex flex-col items-center justify-center my-16">
					<div className="flex items-center justify-cente gap-8 mb-10">
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
			</Window>
		</Layout>
	)
}
