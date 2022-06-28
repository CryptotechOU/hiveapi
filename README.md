
# HiveAPI
## By SADAVA <sadava@proton.me>
## &copy; Cryptotech OÜ 2022

### Example
```js
async function main() {
	const api = new HiveAPI({
		"access_token": "your-token-349-chars",
		"token_type": "bearer",
		"expires_in": 329229200
	})

	const farm = await api.farms.get(1631951)
	const worker = await farm.workers.get(5708266)

	console.log(worker.data)
}
```