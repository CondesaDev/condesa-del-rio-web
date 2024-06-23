# condesa-del-rio-web
Producto tequilero
1.1


Mongo DB
    DEV 
        Cluster: condesa-dev
        database: development
    user
        rulorules99/cloud192

    API
        User
            rulorules99/cloud192
            curl -X POST 'https://ap-southeast-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-agbvuip/auth/providers/local-userpass/login' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "username": "rulorules99",
                "password": "cloud192"
            }'

            curl --location --request POST 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-agbvuip/endpoint/data/v1/action/findOne' \
            --header 'Content-Type: application/json' \
            --header 'Access-Control-Request-Headers: *' \
            --header 'Authorization: Bearer <ACCESS_TOKEN>' \
            --data-raw '{
                "collection":"reviews",
                "database":"development",
                "dataSource":"condesa-dev",
                "projection": {"_id": 1}
            }'

        key 
            condesa: aGRN1NCy3khZzURqfzrlCTmTsIfCt83VyZutV8nNGANiE0Mg5Xkzf3qVPCppTwns
            curl --location --request POST 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-agbvuip/endpoint/data/v1/action/findOne' \
            --header 'Content-Type: application/json' \
            --header 'Access-Control-Request-Headers: *' \
            --header 'api-key: aGRN1NCy3khZzURqfzrlCTmTsIfCt83VyZutV8nNGANiE0Mg5Xkzf3qVPCppTwns' \
            --data-raw '{
                "collection":"reviews",
                "database":"development",
                "dataSource":"condesa-dev",
                "projection": {"_id": 1}
            }'
    


const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjY3NzgxZmEwYWJjMmU0MmRlMzUzMTdkIiwiZXhwIjoxNzE5MTMyMjkwLCJpYXQiOjE3MTkxMzA0OTAsImlzcyI6IjY2NzdkOTdhMzUxM2FlNzZlY2E1NWRiZCIsImp0aSI6IjY2NzdkOTdhMzUxM2FlNzZlY2E1NWRjNSIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY2Nzc4MWZhMGFiYzJlNDJkZTM1MzE3ZCIsInN1YiI6IjY2Nzc4MzUxZDQ3Yjc3NzRlY2I0M2I4MyIsInR5cCI6ImFjY2VzcyJ9.F2MD2rEwvwlG04QVgTsaS0smb9ZfDHgxfIP3DCiQd8o";

const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]))
console.log(jwtPayload.exp);

function isTokenExpired(token) {
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
}

https://jwt.io/