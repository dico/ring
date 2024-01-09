# ring

## Run locally
npm run dev

## Run docker

```
§ docker-compose -f docker-compose.prod.yml up --build
```


Trigger doorbell
```
/doorbell?bid=xxx
```


## Build
```
# docker build -t ring-service .
# docker run -p 4000:4000 ring-service
```

## Get token
```
npx -p ring-client-api ring-auth-cli
```
```
This CLI will provide you with a refresh token which you can use to configure ring-client-api and homebridge-ring.
Email: name@domain.no
Password: ***********
Please enter the code sent to +47xxxxxxxxxx via sms
2fa Code: 123456

Successfully logged in to Ring. Please add the following to your config:

"refreshToken": "eyJy..."
```