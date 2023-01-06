import { useRouter } from 'next/router'

import Layout from '../../../components/layout'
import Window from '../../../components/Window'

export default function BlendDetails({ ual }) {
	const router = useRouter()

	const { id } = router.query

	return (
		<Layout ual={ual}>
			<Window windowName="Blend Details">{id}</Window>
		</Layout>
	)
}
