---
title: What are Attestations? | Making On-Chain Attestation to Someone
description: In this document, it is explained what are attestations and how can you make on-chain attestations for your users using the True Network SDK.
lang: en-US
---
# Attestations

Attestations are simple, structured, and immutable pieces of information given by an issuer or dApp to an individual or entity. Blockchains enable immutability and enforce a set structure, making them ideal for holding attestations.


Typically, issuing an attestation requires deploying separate smart contracts, managing multiple states, and maintaining separate development environments, all of which come with significant costs and technology overhead. However, True Network has developed a custom TypeScript SDK that allows you to issue attestations in minutes.

An attestation on True Network can be made simply by creating a typescript type & object:

- **Creating Schema:**
Firstly, you can start by creating a schema object for the attestation you want to make. These schemas automatically gets converted to structures that are stored on-chain.

```typescript
  import { Hash, Schema, U32, U64 } from "@truenetworkio/sdk"

  export const gamePlaySchema = Schema.create({
    score: U32,
    durationSpent: U64,
    treesClimbedPerDay: U64,
    villansKilled: U32
  })
```

- **Attesting to the User:**
Making an on-chain attestation to the user, just by calling `attest` method of the schema object.

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

- **That's all!**

  The user gets attested on-chain, on the True Network Nodes. These attestations can be later used at any point for building a reputation algorithm on-chain, building on-chain rewards and much more.