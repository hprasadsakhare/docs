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
import { Schema, U32, U64 } from "@truenetworkio/sdk"

// Creating Schema Type.
type DayScore = {
  score: U32,
  durationSpent: U64,
  treesClimbedPerDay: U64,
  villansKilled: U32
}

// Initiating Schema Object with a default value.
export const dayScoreSchema = new Schema<DayScore>({
  score: new U32(0),
  durationSpent: new U64(0),
  treesClimbedPerDay: new U64(0),
  villansKilled: new U32(0)
})
```

- **Attesting to the User:**
Making an on-chain attestation to the user, just by calling `attest` method of the schema object.

```typescript
import { U32, U64 } from '@truenetworkio/sdk'
import { dayScoreSchema } from './schemas'
import { getTrueNetworkInstance } from './true-network/true.config'

const main = async () => {
  const api = await getTrueNetworkInstance()

  // User who gets attested.
  const user = '5HYYeCa1Hae5YYGJ2pHskHLVrA7V5WjaSuSbntidhhD9qqgs'

  // Making on-chain attestation to the user.
  await dayScoreSchema.attest(api, user, {
    score: new U32(41),
    durationSpent: new U64(15000),
    treesClimbedPerDay: new U64(10),
    villansKilled: new U32(21)
  })

  await api.network.disconnect()
}

```

- **That's all!**

  The user gets attested on-chain, on the True Network Nodes. These attestations can be later used at any point for building a reputation algorithm on-chain, building on-chain rewards and much more.