import { useContext } from 'react'
import Layout from '../components/layout'
import { UALContext } from 'ual-reactjs-renderer'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { GiWarPick } from 'react-icons/gi'

export default function Mine({ ual }) {
	return (
		<Layout ual={ual}>
			<div className="max-w-7xl mx-auto">
				<div className="text-4xl sm:text-5xl text-center font-semibold font-cinzel mt-16 text-orange-300">
					<h1>Mine Land</h1>
				</div>

				<div className="flex items-center justify-center gap-8 my-16">
					<div className="select-card">
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
		</Layout>
	)
}
