
# HiveAPI
## By SADAVA <sadava@proton.me>
## &copy; Cryptotech OÜ 2022

### Installation
P.S. You must authenticate in order to access this private repository.

```bash
yarn add ssh://git@github.com:CryptotechOU/hiveapi.git
```

### Example
```js
async function main() {
	const api = new HiveAPI({
		username: "loginname",
		password: "loginpass",
		secret: "2fasecret",
		remember: false,
	})

	const farm = await api.farms.get(1631951)
	const worker = await farm.workers.get(5708266)

	console.log(worker.data)
}
```

### FAQ

### Progress

 - [ ] Error handling: `0%`
 - [ ] Tests: `0%`
 - [ ] Documentation: `0%`
 - [ ] Examples: `0%`
