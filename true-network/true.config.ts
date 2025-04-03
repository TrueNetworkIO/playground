
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'

// If you are not in a NodeJS environment, please comment the code following code:
// import dotenv from 'dotenv'
// dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'hd73pQXLhrYFTYq8JrvfHWtQDCMxvvhFBrgdW8bY1zkJhiS',
    secret: process.env.NEXT_PUBLIC_TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'Playground',
    hash: '0x8e8dec429b2f4aa205ca3d3f009133b4ed41d4a898cce0b2f0e1eef71d963ee7'
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: []
  },
}
  