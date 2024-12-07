---
title: Quickstart | True Network | The Web3 Reputation Protocol
description: Get started building applications with on-chain attestations & reputation in a couple of seconds.
lang: en-US
---

# Quickstart ⚡️

This is a development guide to quickstart building on top of True Network for on-chain attestations & reputation models using the Reputation CLI & SDK.

----

True Network provides the easy-to-use infrastructure for building blockchain-based reputation systems for the internet.

This SDK:
- Can be used in Next.JS / Node.JS
- Can be used to give on-chain attestations to users
- Can be used to write & deploy the algorithms to True Network's Testnet
- Connect to the True Network Nodes (Testnet / Mainnet)

## Setup a new project

To fast track the development process, we will be utilising `reputation-cli` to setup the true-network config in a new or existing project.

In your existing or new project, use the Reputation CLI to set up the True Network SDK:

- Install the Reputation CLI <br/>
  ```shell
    npm i -g reputation-cli
  ```

- Run the following command (in your existing / new project):<br/>
  ```shell
    reputation-cli init
  ```
  Answer some questions the CLI ask to quickly get you started. 

  Note: The `reputation-cli` init command creates a secret private key for the issuer in the **.env** file. If you're using Next.js, you should add the `NEXT_PUBLIC_` prefix to this key in both the **.env and true.config.ts** files.

- A new configuration file, `true.config.ts`, will be created in the `true-network` directory. Additionally, some environment variables will be added to the **.env file** for the private key used by the issuer to perform attestations.

- You will likely need some funds to carry out follow-up transactions with this new private key. To obtain testnet tokens, request them from the [community](https://at.truenetwork.io/community) using the address specified in the configuration file. Look for your wallet address inside the file `true.config.ts`, under `true-network` directory.

- Register the issuer on-chain (one time requirement):<br/>
  ```shell 
  reputation-cli register
  ```

- **That’s all**, you have successfully setup the project and registered the issuer on-chain. 

## Giving an attestation

1. Define the schema & create it’s object with default input:
  ```typescript
  import { Hash, Schema, U32, U64 } from "@truenetworkio/sdk"

  export const gamePlaySchema = Schema.create({
    score: U32,
    durationSpent: U64,
    treesClimbedPerDay: U64,
    villansKilled: U32
  })
  ```

2. Get the network instance (in server environment), and attest to the user as follows:
  ```typescript
  import { U32, U64 } from '@truenetworkio/sdk'
  import { gamePlaySchema } from './schemas'
  import { getTrueNetworkInstance } from './true-network/true.config'

  const attestGamePlayToUser = async () => {
    const api = await getTrueNetworkInstance()

    // Solana User's Address.
    const solanaUserWallet = 'Ap67uX5zrvVAEt5TuFnk9J2w8fFZpht9FAtTdhxViViM'

    // Ethereum User's Address.
    const ethereumUserWallet = '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97'

    // Polkadot User's Address.
    const polkadotUserWallet = '5DHrzaEFnNrwhMy4LqRs43zp8rNAhaEhXNqNMZ9bpZZevCqE'

    const output = await gamePlaySchema.attest(api, ethereumUserWallet, {
      score: 5,
      durationSpent: 11,
      treesClimbedPerDay: 23,
      villansKilled: 3
    })

    // Output is usually the transaction hash for verification on-chain.
    console.log(output)

    // Make sure to disconnect the network after operation(s) is done.
    await api.network.disconnect()
  }

  attestGamePlayToUser()
  ```

3. **That’s it**, the user get’s an attestation finalised on the True Network in a couple of seconds. 

## Building a reputation algorithm using the SDK

::: danger 🚨 Important Notice
We are actively working to improve this process; currently, only the initial version is available.
:::

First, let’s breakdown how algorithm runs on the True Network Nodes:
- Algorithms are basic module that have a [pure function](https://en.wikipedia.org/wiki/Pure_function#:~:text=In%20computer%20programming%2C%20a%20pure,i.e.%2C%20referential%20transparency) named `calc` that returns i64 value i.e. the reputation of the user.
- These algorithms can be written in javascript / typescript, and gets compiled to `wasm`.
<!-- - True Network’s `algorithmModule` provides `saveAlgo` method that takes the **schemaHashes** & **code (wasm file)** as input for registering the algorithm and returns an algorithm id in response event. [Link](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Framan.truenetwork.io%2Fws#/extrinsics)
- Any user can call the method `runAlgoFor` with the user’s account id & algorithm id.  -->

<!-- AssemblyScript is a typescript platform for building wasm executables from the code, the code style is very similar to typescript code. An example AssemblyScript code: -->

To setup the basic reputation module, in your existing true-network project, use the Reputation CLI as follows:

:::info Note
Make sure to run all these commands in the **root folder**, where the true-network (autocreated during previous steps) directory exsits.
:::

1. Setup a reputation module in the directory name `acm`

```shell
reputation-cli setup acm
```

2. Edit, the `true-network/true.config.ts` file to add the schemas inside the algorithm object, like this:
```
  ... other data

  algorithm: {
    id: undefined,
    path: 'acm',
    schemas: [gamePlaySchema]
  }
  ...
```

3. Prepare, this step involes creation of memory reading class for the algorithm. This is an essential step to do after every change in the **schemas** array or any particular schema struct is changed.

```shell
reputation-cli acm-prepare
```

4. Writing `calc` function, the final step is to implement the algorithm function that uses the attestations file to write a formula that calculates reputation score for the user.

```typescript{25-30}
  // The Algorithm.
  // This is the space to design your reputation algorithm taking in account 
  // multiple schemas across true network to calculate a reputation score for
  // your users & the community. 

  import { Attestations } from "./attestations";

  // This is the starting point, calc function.
  // Algorithm Compute Module (ACM) uses this as starting point to execute
  // your reputation algorithm and expects an i64 as result.
  export function calc(): i64 {
    const dayScoreSchema = Attestations.dayScoreSchema;
    const dailyProgress = Attestations.dailyProgress;

    const daily = dailyProgress.miles + dailyProgress.radioScore;
    const overallProgress = daily + dayScoreSchema.score * ((dayScoreSchema.durationSpent + dayScoreSchema.treesClimbedPerDay + dayScoreSchema.villansKilled) / 3);

    return overallProgress;
  }
```

5. Compile locally, you will have to make sure it builds the algorithm successfully.

```shell
reputation-cli compile
```
 
5. Final step, deploying the reputation algorihtm on-chain.

```shell
reputation-cli deploy
```

Awesome, your algorithm must have been deployed on-chain and you would have recieved an algorithm id. This algorith id is the identifier is automatically saved inside `true-network/true.config.ts` file and is used for calling the algorithm on-chain to calculate score.

## Testnet - Raman Network
[Raman Network](https://truenetwork.io/explorer/raman) is the testnet for True Network, allowing developers to experiment with early versions of the protocol as it evolves. This document provides a comprehensive guide to integrating the protocol into applications and is regularly updated to reflect the latest advancements.

:::info
The current version only allows registered issuers to provide on-chain attestations. Therefore, it is necessary to register as an issuer on the Raman Network, including specifying a name, before issuing attestations or creating schemas.
:::

### Links
- **Polkadot.js Explorer** ([link](https://truenetwork.io/explorer/raman))
Explore the chain state, view transactions sent on-chain, and observe the extrinsics being called. While the explorer provides insights, it's not the best platform for creating and calling extrinsics directly, as byte conversion issues might occur. These are better handled within the SDK.

- **Example Repository** ([link](https://github.com/TrueNetworkIO/true-example))
This repository serves as a basic demo of the True Network’s features and SDK tools. It's a great starting point to get an early understanding, and you can refer to it when you have questions or need guidance.

::: info Facing any issues? 
Join the community and ask your questions: [Telegram Group](https://at.truenetwork.io/community).
:::
