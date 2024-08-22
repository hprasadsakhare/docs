---
title: Why On-Chain Reputation? | About True Network
description: In this document, it is explained how on-chain reputation provides a better solution for user engagement and retention compared to blind airdrops.
lang: en-US
---

# Technical Architecture
Any Reputation System needs 3 core values that only web3 / chain can provide:

- **Permissionless**<br/>
  The users must feel included and not gated to enter the system to be reputed.


- **Persistent**<br/>
  Work done to build a reputation must not fade away & should persist.


- **Transparent**<br/>
  Protocol’s input, values & execution should be trustless in order to be fair.


In order to build such a system the True Network nodes provide the core infrastructure that stands on these 3 values, so that each project does not need to build it from bottom-up by themselves.

There are 3 major parts of the architecture that accomplishes the functioning of the system:
- On-Chain Attestations 
- Algorithm Compute Module
- Reputation Usability Module

The following diagram represents the True Network architecture with different pallets & verifier SDK that enables attestations and writing algorithms in Typescript:

|||
|--|--|
| ![Technical Architecture](/assets/architecture.png) | True Network has 3 core pallets: <br /> <br /> - **Issuer Pallet** <br />For registering & storing information about reputation issuer / dApp. <br /> <br />- **Credential Pallet** <br />Creating Schemas & Attestations on-chain using the Typescript SDK. <br /> <br />- **Reputation Pallet** <br />Holds the wasm modules (that were initially written in Typescript) that uses attestations from memory to compute Reputation Score. <br /> <br /> Additionally, there will be a pallet for helper functions related to Reputation like Aging, Staking, Merging, etc. |
