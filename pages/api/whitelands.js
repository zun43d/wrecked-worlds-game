// import { ExplorerApi, RpcApi } from 'atomicassets'
import { JsonRpc } from 'eosjs'
import fetch from 'node-fetch'

const api = process.env.NEXT_PUBLIC_API_ENDPOINT
const atomicApi = process.env.NEXT_PUBLIC_ASSET_API_ENDPOINT

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { wallet } = req.query
		// const atomicApi = new RpcApi(api, 'atomicassets', { fetcher })
		const rpc = new JsonRpc(api, { fetch })

		const { rows: templateIds } = await rpc.get_table_rows({
			json: true,
			code: 'wreckminings',
			scope: 'wreckminings',
			table: 'whitelands',
			key_type: 'i64',
			index_position: 1,
			limit: 100,
		})

		const whiteLands = await Promise.all(
			templateIds.map(async (templateId) =>
				fetch(
					`${atomicApi}/atomicassets/v1/assets?collection_name=wreckedwrlds&template_id=${templateId.template_id}&page=1&limit=100&order=desc&sort=asset_id`
				)
			)
		).then(async (res) => Promise.all(res.map(async (r) => await r.json())))

		let whiteLandNFTs = []

		whiteLands.forEach((templateLands) =>
			templateLands.data.forEach((lands) => whiteLandNFTs.push(lands))
		)

		// const test = await rpc.get_table_rows({
		// 	json: true,
		// 	code: 'atomicassets',
		// 	scope: 'atomicassets',
		// 	table: 'assets',
		// 	// key_type: 'i64',
		// 	// index_position: 1,
		// 	table_key: 'template_id',
		// 	lower_bound: 72,
		// 	upper_bound: 72,
		// 	limit: 100,
		// })

		// res.status(200).json(result.rows)
		res.status(200).json([templateIds, whiteLandNFTs])
	}
}
