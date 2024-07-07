# condesa-del-rio-web

Producto tequilero

## ENV

Agega las sig var al inicio de main.js estos valores no se comitean es solopara uso de desarollo

```
const LOGIN_URL = 'https://ap-southeast-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-agbvuip/auth/providers/local-userpass/login';
const BASE_URL = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-agbvuip/endpoint/data/v1/action';
const DATABASE = 'development';
const COLLECTION = 'reviews';
const DATASOURSE = 'condesa-dev';
const USER = 'rulorules99';
const PASS = 'cloud192';
```


## Mongo DB

    DEV
        Cluster: condesa-dev
        database: development
    user
        rulorules99/cloud192

    API
        User
            rulorules99/cloud192

```
curl -X POST 'https://ap-southeast-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-agbvuip/auth/providers/local-userpass/login'
--header 'Content-Type: application/json'
--data-raw '{
	"username": "rulorules99",
	"password": "cloud192"
}'
curl --location --request POST 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-agbvuip/endpoint/data/v1/action/findOne'
--header 'Content-Type: application/json'
--header 'Access-Control-Request-Headers: *'
--header 'Authorization: Bearer 
```


    key
            condesa: aGRN1NCy3khZzURqfzrlCTmTsIfCt83VyZutV8nNGANiE0Mg5Xkzf3qVPCppTwns

```
  curl --location --request POST 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-agbvuip/endpoint/data/v1/action/findOne'
--header 'Content-Type: application/json'
--header 'Access-Control-Request-Headers: *'
--header 'api-key: aGRN1NCy3khZzURqfzrlCTmTsIfCt83VyZutV8nNGANiE0Mg5Xkzf3qVPCppTwns'
--data-raw '{
	"collection":"reviews",
	"database":"development",
	"dataSource":"condesa-dev",
	"projection": {"_id": 1}
}'
```

## [JWT]([https://jwt.io/]() "jwt")

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjY3NzgxZmEwYWJjMmU0MmRlMzUzMTdkIiwiZXhwIjoxNzE5MTMyMjkwLCJpYXQiOjE3MTkxMzA0OTAsImlzcyI6IjY2NzdkOTdhMzUxM2FlNzZlY2E1NWRiZCIsImp0aSI6IjY2NzdkOTdhMzUxM2FlNzZlY2E1NWRjNSIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY2Nzc4MWZhMGFiYzJlNDJkZTM1MzE3ZCIsInN1YiI6IjY2Nzc4MzUxZDQ3Yjc3NzRlY2I0M2I4MyIsInR5cCI6ImFjY2VzcyJ9.F2MD2rEwvwlG04QVgTsaS0smb9ZfDHgxfIP3DCiQd8o";
