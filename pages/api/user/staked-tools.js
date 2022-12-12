import { JsonRpc } from 'eosjs'
import fetch from 'node-fetch'

const api =
	process.env.NEXT_PUBLIC_ENV == 'dev'
		? 'https://testnet.waxsweden.org'
		: 'https://api.waxsweden.org'

const atomicApi = process.env.NEXT_PUBLIC_ASSET_API_ENDPOINT

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { wallet } = req.query

		const admin = 'wreckminings'
		const filter = 'atomicassets:transfer'
		const skip = 0
		const limit = 100
		const sort = 'desc'

		const rpc = new JsonRpc(api, { fetch })

		// Below implementation has less filtering options
		// const actions = await rpc.history_get_actions(wallet)

		// manual implementation is more flexible
		// const actions = await fetch(
		// 	`${api}/v2/history/get_actions?account=${admin}&filter=${filter}&skip=${skip}&limit=${limit}&sort=${sort}`
		// ).then((res) => res.json())

		// const allStakedAssets = []

		// actions.actions.map((action) => {
		// 	if (
		// 		action.act.data.from === /*wallet*/ 'luposolitari' &&
		// 		action.act.data.memo === 'stake;tool'
		// 	)
		// 		return action.act.data.asset_ids.filter((id) =>
		// 			allStakedAssets.push(id)
		// 		)
		// })

		const currentlyStakedIds = await rpc.get_table_rows({
			json: true,
			code: 'wreckminings',
			scope: wallet,
			table: 'tools',
			limit: 50,
			page: 1,
		})

		const currentlyStakedTools = await Promise.all(
			currentlyStakedIds.rows.map((tool) =>
				fetch(`${atomicApi}/atomicassets/v1/assets/${tool.asset_id}`).then(
					(res) => res.json()
				)
			)
		).then((resu) => resu.map((data) => data.data))

		res.status(200).json(currentlyStakedTools)
	}
}
