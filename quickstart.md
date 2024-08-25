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

- A new configuration file, `true.config.ts`, will be created in the `true-network` directory. Additionally, some environment variables will be added to the **.env file** for the private key used by the issuer to perform attestations.

- You will likely need some funds to carry out follow-up transactions with this new private key. To obtain testnet tokens, request them from the [community](https://at.truenetwork.io/community) using the address specified in the configuration file.

- Register the issuer on-chain (one time requirement):<br/>
  ```shell 
  reputation-cli register
  ```

- **That’s all**, you have successfully setup the project and registered the issuer on-chain. 

## Giving an attestation

1. Define the schema & create it’s object with default input:
  ```typescript
  import { Schema, U32, U64 } from "@truenetworkio/sdk"

  type GamePlay = {
    score: U32,
    durationSpent: U64,
    treesClimbedPerDay: U64,
    villansKilled: U32
  }

  export const gamePlaySchema = new Schema<GamePlay>({
    score: new U32(0),
    durationSpent: new U64(0),
    treesClimbedPerDay: new U64(0),
    villansKilled: new U32(0)
  })
  ```

2. Get the network instance (in server environment), and attest to the user as follows:
  ```typescript
  import { U32, U64 } from '@truenetworkio/sdk'
  import { gamePlaySchema } from './schemas'
  import { getTrueNetworkInstance } from './true-network/true.config'

  const attestGamePlayToUser = async () => {
    const api = await getTrueNetworkInstance()

    // User's wallet address to attest. 
    // Currently we support Polkadot-based wallets, eventually we will 
    // enable EVM & Solana wallets to be attested on True Network as well.
    const user = '5HYYeCa1Hae5YYGJ2pHskHLVrA7V5WjaSuSbntidhhD9qqgs'

    // Use the schema object's attest method and pass in the attestation
    // details that will be registerd on-chain for the user.
    const output = await dayScoreSchema.attest(api, user, {
      score: new U32(41),
      durationSpent: new U64(15000),
      treesClimbedPerDay: new U64(10),
      villansKilled: new U32(21)
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
We are actively working to improve this process; currently, only the initial version is available. At this stage, algorithms are supported only at the node-level SDK. The CLI will eventually offer a more robust mechanism for building and deploying these algorithms.
:::

First, let’s breakdown how algorithm runs on the True Network Nodes:
- Algorithms are basic module that have a [pure function](https://en.wikipedia.org/wiki/Pure_function#:~:text=In%20computer%20programming%2C%20a%20pure,i.e.%2C%20referential%20transparency) named `calc` that returns i64 value i.e. the reputation of the user.
- These algorithms can be written in javascript / typescript, and gets compiled to `wasm`.
- True Network’s `algorithmModule` provides `saveAlgo` method that takes the **schemaHashes** & **code (wasm file)** as input for registering the algorithm and returns an algorithm id in response event. [Link](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Framan.truenetwork.io%2Fws#/extrinsics)
- Any user can call the method `runAlgoFor` with the user’s account id & algorithm id. 

AssemblyScript is a typescript platform for building wasm executables from the code, the code style is very similar to typescript code. An example AssemblyScript code:

```typescript{31-41}
// File: algorithm/assembly/index.ts

// Reading the memory of the runtime to fetch the attestation details.
// These load methods reads the memory, and the function load<type>(sizeInBytes)
// must be in continous order of the schema structure. 

// Using the sample implementation from the GamePlay schema. 
@inline
function load_score(): u32 {
  return load<u32>(0);
}

@inline
function load_duration_spent(): u64 {
  return load<u64>(4);
}

@inline
function load_trees_climbed_per_day(): u64 {
  return load<u64>(8);
}

@inline
function load_villans_killed(): u32 {
  return load<u32>(16);
}

// The exact codebase for the algorithm that takes these inputs i.e. attestation
// from the memory and returns a final reputation score for the user.
// Feel free to use math functions here as per your requirement. 
export function calc(): i64 {
  let score = load_score();
  let duration = load_duration_spent();
  let trees_climbed = load_trees_climbed_per_day();
  let villans_killed = load_villans_killed();

  return (score) * ((villans_killed + trees_climbed) / duration);
}
```
 
These load methods need to be carefully tested on the testnet to ensure that the correct values are received. This step is temporarily required; in future versions of our SDK and CLI, these processes will be abstracted away, allowing you to focus solely on writing the calculation functions.

## Testnet - Raman Network
[Raman Network](https://raman.truenetwork.io) is the testnet for True Network, allowing developers to experiment with early versions of the protocol as it evolves. This document provides a comprehensive guide to integrating the protocol into applications and is regularly updated to reflect the latest advancements.

:::info
The current version only allows registered issuers to provide on-chain attestations. Therefore, it is necessary to register as an issuer on the Raman Network, including specifying a name, before issuing attestations or creating schemas.
:::

### Links
- **Polkadot.js Explorer** ([link](https://truenetwork.io/explorer/raman))
Explore the chain state, view transactions sent on-chain, and observe the extrinsics being called. While the explorer provides insights, it's not the best platform for creating and calling extrinsics directly, as byte conversion issues might occur. These are better handled within the SDK.

- **Example Repository** ([link](https://github.com/TrueNetworkIO/true-example))
This repository serves as a basic demo of the True Network’s features and SDK tools. It's a great starting point to get an early understanding, and you can refer to it when you have questions or need guidance.

## Next Version

The next version of the SDK and CLI will support:
- Abstraction and auto-generation of memory load methods, so developers only need to write the `calc` function.
- Dry run and unit test features for algorithm code before deployment.
- Easy deployment with a single command: `reputation-cli deploy`.

::: info Facing any issues? 
Join the community and ask your questions: [Telegram Group](https://at.truenetwork.io/community).
:::
