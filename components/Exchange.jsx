import { useState } from 'react'
import ReactModal from 'react-modal'
import exchange from '../lib/exchange'

export default function Exchange({ ual, isOpen, setIsOpen, userBal }) {
	const [resources, setResources] = useState([0.0, 0.0, 0.0])
	const [withdrawWtm, setWithdrawWtm] = useState(0.0)

	function toFixed(num, fixed) {
		var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
		return num.toString().match(re)[0]
	}

	const calcCost = (amount) => {
		const wtm = amount || withdrawWtm

		const iron = toFixed(wtm * 150, 4)
		const dm = toFixed(wtm * 50, 4)
		const wrm = toFixed(wtm * 10, 4)

		setResources([+iron, +dm, +wrm])
	}

	const maxWtm = () => {
		const wtm = toFixed(userBal.iron.replace(' IRON', '') / 150, 4)

		setWithdrawWtm(wtm)
		calcCost(wtm)
	}

	const handleExchange = async () => {
		const res = await exchange(ual.activeUser, +withdrawWtm)

		if (res) {
			setIsOpen(false)
		}

		setWithdrawWtm(0.0)
		setResources([0.0, 0.0, 0.0])
	}

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={() => setIsOpen(false)}
			shouldFocusAfterRender={false}
			shouldCloseOnOverlayClick={true}
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
				<h3 className="text-3xl sm:text-4xl text-center font-semibold font-cinzel mt-12 text-orange-300">
					Exchange
				</h3>
				<p className="text-slate-400 text-center mt-3">
					Exchange your resources with Wrecktium Token
				</p>
			</div>
			<div className="mx-10 my-12 space-y-1">
				<p className="text-orange-200 font-cinzel text-2xl">Current Rate:</p>
				<p className="text-xl">
					150.0000 IRON + 50.0000 DM + 10.0000 WRM{' '}
					<span className="text-orange-400">=&gt;</span> <span>1.0000 WTM</span>
				</p>
				<br />
				<p className="text-orange-200 font-bold">Your Current Resources:</p>
				<p className="text-xl">{userBal.iron}</p>
				<p className="text-xl">{userBal.dm}</p>
				<p className="text-xl">{userBal.wrm}</p>
				<br />
				<p className="text-xl">Enter your WTM withdrawal amount</p>
				<p className="text-sm text-slate-400">
					(Resources will be{' '}
					<span className="text-orange-200">converted to WTM token</span>{' '}
					according to current rate)
				</p>
				<div className="flex flex-col items-start justify-start">
					<div>
						<input
							type="number"
							placeholder="Enter WTM amount..."
							className="w-96 bg-slate-900 rounded-md py-3 px-4 mt-2"
							min="1"
							max={maxWtm}
							value={withdrawWtm}
							onChange={(e) => {
								setWithdrawWtm(e.target.value)
								calcCost()
							}}
						/>
						<button
							className="btn-colored border border-orange-900 rounded-md ml-2"
							onClick={maxWtm}
						>
							Max
						</button>
					</div>
					<div className="mt-4 mb-2">
						<p className="text-orange-200 text-xs font-bold">In exchange of</p>
						<div className="flex gap-2 mt-1">
							<div className="flex flex-col min-w-min rounded-md py-3 px-4 mx-auto text-center bg-slate-900">
								<div>{resources[0] || '0.0000'}</div>
								<div className="text-[10px] text-right text-orange-400">
									IRON
								</div>
							</div>
							<div className="flex flex-col min-w-min rounded-md py-3 px-4 mx-auto text-center bg-slate-900">
								<div>{resources[1] || '0.0000'}</div>
								<div className="text-[10px] text-right text-orange-400">
									Diamond
								</div>
							</div>
							<div className="flex flex-col min-w-min rounded-md py-3 px-4 mx-auto text-center bg-slate-900">
								<div>{resources[2] || '0.0000'}</div>
								<div className="text-[10px] text-right text-orange-400">
									Wradium
								</div>
							</div>
						</div>
					</div>
					<div className="space-x-4">
						<button
							className="btn-filled my-3 px-8"
							onClick={handleExchange}
							disabled={!withdrawWtm}
						>
							Exchange
						</button>
						<button
							className="btn-normal my-3 px-10"
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</ReactModal>
	)
}
