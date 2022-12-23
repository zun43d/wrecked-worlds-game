export const getImage = (nft) => {
	const imgId = nft.template.immutable_data.img
	const ipfsAddr = process.env.NEXT_PUBLIC_ASSET_IMAGE_ENDPOINT

	return `${ipfsAddr}/${imgId}`
}
