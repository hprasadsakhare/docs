---
title: Tips & Tooling | True Network | The Web3 Reputation Protocol
description: Explore the tooling infrastructure that makes it easy for you to build on top of True Network's On-Chain Attestation & Reputation.
lang: en-US
---

# Tips & Tooling

Let's first take a look at the tools we've built to help you get started quickly.

- **Reputation CLI** ([link](https://www.npmjs.com/package/reputation-cli))<br/>
It offers a set of core features necessary for starting a new project, registering as an issuer, and deploying algorithms. While it's still a work in progress, it's live and ready for you to start using. If you encounter any issues, please report them to the community.


- **Typescript SDK** ([link](https://www.npmjs.com/package/@truenetworkio/sdk))<br/>
The SDK provides a simple interface for building server-side and client-side applications that interact directly with True Network nodes. The current SDK version supports the latest node release and comes pre-configured for the Raman Network.
  > Note: We recommend setting up the SDK environment in your project using our CLI, which handles all the necessary initial setup.


- **Polkadot.js Explorer** ([link](https://truenetwork.io/explorer/raman))<br/>
Explore the chain state, view transactions sent on-chain, and observe the extrinsics being called. While the explorer provides insights, it's not the best platform for creating and calling extrinsics directly, as byte conversion issues might occur. These are better handled within the SDK.

- **Example Repository** ([link](https://github.com/TrueNetworkIO/true-example))<br/>
This repository serves as a basic demo of the True Network’s features and SDK tools. It's a great starting point to get an early understanding, and you can refer to it when you have questions or need guidance