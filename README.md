
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
		"access_token": "your-token-349-chars",
		"token_type": "bearer",
		"expires_in": 329229200
	})

	const farm = await api.farms.get(1631951)
	const worker = await farm.workers.get(5708266)

	console.log(worker.data)
}
```

### FAQ
#### How to get access token
https://app.swaggerhub.com/apis/HiveOS/public/2.1-beta#/auth/post_auth_login
```bash
curl -X 'POST' \
  'https://api2.hiveos.farm/api/v2/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "login": "string",
  "password": "string",
  "twofa_code": "234345",
  "remember": true
}'
```