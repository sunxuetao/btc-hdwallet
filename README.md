## Description

 Api to generate HD SegWit address, and p2sh-p2ms address


## Function Description：
> 1. Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and pathn
> 2. Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and public keys can be specified


## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Swagger docs
http://localhost:5000/docs

Overview:
  ![image](https://user-images.githubusercontent.com/1678973/134043302-558da44b-0180-47fd-b25f-58e5fe3bca72.png)

Step to quick test in Swagger:
1. get JWT token from /auth/login
  body : 
  {
    "username": "admin",
    "password": "admin"
  }
  ![image](https://user-images.githubusercontent.com/1678973/134043115-47cdf894-b08d-4637-bdc1-54601ef9fb38.png)


2. use token to acces to /address/address and /address/p2sh api.

  ![image](https://user-images.githubusercontent.com/1678973/134043201-dbb7c45e-4f1a-4435-ba32-f0d13284d98a.png)




## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Project Structure

 ```
btc-wallet
├─ package.json
├─ src
│    ├─ address
│    │    ├─ address.controller.spec.ts
│    │    ├─ address.controller.ts
│    │    ├─ address.dto.ts
│    │    ├─ address.enum.ts
│    │    ├─ address.interface.ts
│    │    ├─ address.module.ts
│    │    ├─ address.service.spec.ts
│    │    └─ address.service.ts
│    ├─ app.module.ts
│    ├─ auth
│    │    ├─ auth.controller.spec.ts
│    │    ├─ auth.controller.ts
│    │    ├─ auth.dto.ts
│    │    ├─ auth.module.ts
│    │    ├─ auth.service.spec.ts
│    │    ├─ auth.service.ts
│    │    ├─ jwt.contants.ts
│    │    ├─ jwt.strategy.ts
│    │    ├─ local.strategy.ts
│    │    └─ token.entity.ts
│    ├─ lib
│    │    ├─ bitcoin.address.ts
│    │    ├─ crypto.ts
│    │    ├─ hdkey
│    │    └─ p2ms
│    ├─ main.ts
│    ├─ user
│    │    ├─ user.controller.spec.ts
│    │    ├─ user.controller.ts
│    │    ├─ user.entity.ts
│    │    ├─ user.module.ts
│    │    ├─ user.service.spec.ts
│    │    └─ user.service.ts
│    └─ utils
│           ├─ exception.filter.ts
│           └─ logger.ts
├─ tsconfig.build.json
├─ tsconfig.json
└─ yarn.lock

 ```

## Support

 Please contact support at richard.sun.xt@outlook.com

## Stay in touch

- Author - [Richard Sun]

## License

Nest is [MIT licensed](LICENSE).
