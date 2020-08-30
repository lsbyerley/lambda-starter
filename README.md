# lambda-starter
starter repo for serverless aws lambda functions

# getting started
```
1. Clone the repository
2. npm install
3. Rename .env.example to .env
4. npm run dev
3. navigate to http://localhost:3000/dev/v1/example-route
```

# dev deployment
```
1. npm run deploy
```
or, if you want to deploy functions only
```
1. npm run deployFunctions
```

# prod deployment
Will deploy with a built-in lambda warmer and minified code
```
1. npm run deployProd
```
or, deploying functions only to prod
```
1. npm run deployFunctionsProd
```
