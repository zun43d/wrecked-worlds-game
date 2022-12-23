import { useRouter } from 'next/router'
import Image from 'next/image'

import windowBg from '../public/window-bg.png'

export default function Window({ children, windowName }) {
	const router = useRouter()
	const handleOverlayClick = () => {
		router.push('/dashboard')
	}

	return (
		<div className="fixed top-0 left-0 h-screen w-screen">
			<div
				className="h-full w-full bg-black/50"
				onClick={handleOverlayClick}
			></div>
			<div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<h2 className="absolute z-20 top-3 left-11 text-2xl font-cinzel">
					{windowName}
				</h2>
				<Image
					src={windowBg}
					alt="Window"
					placeholder="blur"
					className="backdrop-blur-lg max-w-[1200px]"
				/>

				<div className="absolute top-10 left-0 right-0">{children}</div>
			</div>
		</div>
	)
}
