---
title: Attestation & Types
description: Let's explore the different type structures that True Network supports today to host on-chain attestations on itself.
lang: en-US
---

# Attestation & Types

True Network supports a variety of on-chain attestation types and structures to enable flexible credential verification. This document outlines the core components and types used in the attestation system.

## Core Types

### Credential Types

The system supports the following primitive types for credential fields:

- Numeric Types:
  - Unsigned integers: `U8`, `U16`, `U32`, `U64`
  - Signed integers: `I8`, `I16`, `I32`, `I64`
  - Floating point: `F32`, `F64`
- Basic Types:
  - `Char`: Single character
  - `Boolean`: True/false value
  - `Text`: String data (up to 128 bytes)
  - `Hash`: 32-byte hash value

### Address Types That Can Be Attested

Attestations can be issued to accounts on different blockchain networks using the `AcquirerAddress` enum:

- `Substrate`: Standard Substrate account (AccountId32)
- `Ethereum`: Ethereum address (H160)
- `Solana`: Solana public key (base58 encoded string)

## Schema Structure

Schemas define the structure of attestations and are composed of:

- A sequence of field definitions, each containing:
  - Field name (as bytes)
  - Field type (CredType)
- Maximum limits:
  - Field count (`MaxSchemaFields`)
  - Field size (`MaxSchemaFieldSize`)

### Size Constraints

Each credential type has specific size constraints in bytes:

- 1 byte: `Char`, `U8`, `I8`, `Boolean`
- 2 bytes: `U16`, `I16`
- 4 bytes: `U32`, `I32`, `F32`
- 8 bytes: `U64`, `I64`, `F64`
- 32 bytes: `Hash`
- 128 bytes: `Text`

## Attestations

Attestations are stored on-chain and contain:

- Issuer hash: Reference to the attestation issuer
- Schema hash: Reference to the schema definition
- Recipient address: The AcquirerAddress receiving the attestation
- Attestation data: Vector of values conforming to the schema

### Storage Structure

Attestations are stored in a nested map with the following keys:
1. Recipient address (AcquirerAddress)
2. Issuer hash
3. Schema hash

This structure allows efficient lookup of all attestations for a specific recipient from a particular issuer using a specific schema.

## Operations

The system supports the following main operations:

### Schema Creation
- Create new credential schemas
- Schemas are immutable once created
- Schema hash is derived from field names and types

### Attestation Management
- Create new attestations
- Update existing attestations
- Validate attestation data against schema definitions

### Address Validation
The system includes robust validation for:
- Substrate addresses (SS58 format)
- Ethereum addresses (20 bytes)
- Solana addresses (base58 encoded Ed25519 public keys)

## Events

The system emits the following events:

- `SchemaCreated`: When a new schema is registered
- `AttestationCreated`: When a new attestation is issued
- `AttestationUpdated`: When an existing attestation is modified

## Error Handling

Common error conditions include:
- `SchemaNotFound`: Referenced schema doesn't exist
- `InvalidFormat`: Attestation data doesn't match schema
- `SchemaAlreadyExists`: Attempt to create duplicate schema
- `TooManySchemaFields`: Schema exceeds field limit
- `SchemaFieldTooLarge`: Field size exceeds limit
- `InvalidAddress`: Invalid recipient address format
- `AttestationNotFound`: Referenced attestation doesn't exist
- `InvalidAttestationIndex`: Invalid index for attestation update