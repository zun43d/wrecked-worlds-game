import { JsonRpc } from 'eosjs'
import fetch from 'node-fetch'

const rpc = new JsonRpc('https://testnet.wax.pink.gg', { fetch })
// const rpc = new JsonRpc('https://wax.pink.gg/', { fetch })

export default async function handler(req, res) {
	// check if the request is a GET request
	if (req.method === 'GET') {
		const { wallet } = req.query

		// fetch user data from the blockchain
		const response = await rpc

			// .get_account(wallet)
			.get_currency_balance('wrecktiumtok', wallet, 'WTM')
			// .get_info()

			// .get_table_rows({
			// 	json: true,
			// 	code: 'eosio.token',
			// 	scope: wallet,
			// 	table: 'accounts',
			// 	limit: 100,
			// })
			.then((result) => {
				return result
			})
			.catch((error) => {
				console.log(error)
			})

		// const response = await fetch(
		// 	`https://jsonplaceholder.typicode.com/users/${wallet}`
		// )
		const data = await response
		res.status(200).json(data)
	}
}
