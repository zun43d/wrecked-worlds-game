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
		const actions = await fetch(
			`${api}/v2/history/get_actions?account=${admin}&filter=${filter}&skip=${skip}&limit=${limit}&sort=${sort}`
		).then((res) => res.json())

		const allStakedAssets = []

		actions.actions.map((action) => {
			if (
				action.act.data.from === /*wallet*/ 'luposolitari' &&
				action.act.data.memo === 'stake;tool'
			)
				return action.act.data.asset_ids.filter((id) =>
					allStakedAssets.push(id)
				)
		})

		const currentlyStakedId = await Promise.all(
			allStakedAssets.map((id) =>
				rpc
					.get_table_rows({
						json: true,
						code: 'atomicassets',
						scope: admin,
						table: 'assets',
						lower_bound: id,
						upper_bound: id,
						limit: 25,
					})
					.then((res) => res.rows[0].asset_id)
			)
		)

		const currentlyStakedTools = await Promise.all(
			currentlyStakedId.map((id) =>
				fetch(`${atomicApi}/atomicassets/v1/assets/${id}`).then((res) =>
					res.json()
				)
			)
		).then((resu) => resu.map((data) => data.data))

		// console.log(currentlyStakedTools)

		res.status(200).json(currentlyStakedTools)
	}
}
