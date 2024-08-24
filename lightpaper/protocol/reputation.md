---
title: Understanding On-Chain Reputation Systems? | Build points systems on-chain
description: This document explains what are on-chain reputation systems (aka point systems), how these can be used to design reward mechanisms for your users and utilising the True Network SDK for easily building for your app.
lang: en-US
---

# Understanding On-Chain Reputation Systems 

Another important component of the True Network protocol is on-chain reputation system, commonly known as Point Systems. Reputation System enables application builders to highlight the importance of certain actions over others in their community.

## Algorithm Compute Module (ACM)
The **Algorithms Compute Module (ACM)** is the fundamental component for **ensuring transparent & trustless execution of reputation logic**. It is essentially a modified wasm compiler with additional logic for reading state memory i.e. attestations.

ACM is also **a permissionless mini-computer** (with support of **higher math functions**) that enables developers to write composable algorithms for attestations issued by other issuers / dApps. 

The core features of the ACM includes:
- Memory 
- WASM Interpreter
- SDK (generating typescript -> wasm)

Memory is loaded with state of on-chain attestations for the computation of the instructions.

![ACM Image](/assets/acm.png)

### Steps Followed by ACM

ACM is a wrapper around the `wasmi` crate (Rust), allowing algorithms to be written in any general-purpose programming language that can be compiled to WebAssembly (WASM) executables.

1. ACM first loads attestations from its schema hashes related to the user that are already on-chain.
2. The algorithm's code reads these attestations from memory to further process them within the `calc` function.
3. The result of the `calc` function is the user's reputation, which is owned by the user.

### Transparency in ACM
ACM is public by nature, that means all the algorithms stored in the network are publicly available, we think it's important for building a healthy community where people know how much effort it takes to build a certain reputation. Also, the things that are more desired / expected from an individual (customs) in a community to gain a high reputation

![a16z article on public reputation](/assets/a16z.png)

Read the full article [here](https://a16zcrypto.com/posts/article/reputation-based-systems/). 
