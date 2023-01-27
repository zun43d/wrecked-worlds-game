import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Layout from '../../components/layout'
import Window from '../../components/Window'
import fetcher from '../../utils/fetcher'
import exchange from '../../lib/exchange'

export default function Exchange({ ual }) {
	const [resources, setResources] = useState([0.0, 0.0, 0.0])
	const [withdrawWtm, setWithdrawWtm] = useState(0.0)

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

	function toFixed(num, fixed) {
		var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
		return num.toString().match(re)[0]
	}

	const handleWithdrawAmnt = (amount) => {
		if (amount > +calcMaxWtm()) return setMaxWtm()

		setWithdrawWtm(Math.floor(amount))
		calcCost(Math.floor(amount))
	}

	const calcCost = (amount) => {
		const wtm = amount || withdrawWtm

		const iron = toFixed(wtm * 150, 4)
		const dm = toFixed(wtm * 50, 4)
		const wrm = toFixed(wtm * 10, 4)

		setResources([+iron, +dm, +wrm])
	}

	const setMaxWtm = () => {
		const wtm = Math.floor(bal.iron.replace(' IRON', '') / 150)

		setWithdrawWtm(wtm)
		calcCost(wtm)
	}

	const calcMaxWtm = () => {
		return Math.floor(bal.iron.replace(' IRON', '') / 150)
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
		<Layout ual={ual}>
			<Window windowName="Exchange">
				{/* <div>
					<h3 className="text-3xl sm:text-4xl text-center font-semibold font-cinzel mt-12 text-orange-300">
						Exchange
					</h3>
					<p className="text-slate-400 text-center mt-3">
						Exchange your resources with Wrecktium Token
					</p>
				</div> */}
				<div className="mx-10 my-12 space-y-1">
					<p className="text-orange-200 font-cinzel text-2xl">Current Rate:</p>
					<p className="text-xl">
						150.0000 IRON + 50.0000 DM + 10.0000 WRM{' '}
						<span className="text-orange-400">=&gt;</span>{' '}
						<span>1.0000 WTM</span>
					</p>
					<br />
					<p className="text-orange-200 font-bold">Your Current Resources:</p>
					<p className="text-xl">{bal.iron} IRON</p>
					<p className="text-xl">{bal.dm} DM</p>
					<p className="text-xl">{bal.wrm} WRM</p>
					<br />
					<p className="text-xl">Enter your WTM withdrawal amount</p>
					<p className="text-sm text-slate-300">
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
								max={setMaxWtm}
								value={withdrawWtm}
								onChange={(e) => {
									handleWithdrawAmnt(e.target.value)
									// setWithdrawWtm(e.target.value)
									// calcCost()
								}}
							/>
							<button
								className="btn-colored border border-orange-900 rounded-md ml-2"
								onClick={setMaxWtm}
							>
								Max
							</button>
						</div>
						<div className="mt-4 mb-2">
							<p className="text-orange-200 text-xs font-bold">
								In exchange of
							</p>
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
							{/* <button
								className="btn-normal my-3 px-10"
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button> */}
						</div>
					</div>
				</div>
			</Window>
		</Layout>
	)
}
