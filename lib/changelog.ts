// src/data/changelog.ts

export type ChangeType = 'security' | 'feature' | 'fix' | 'core';

export interface ChangeLogEntry {
    version: string;
    date: string;
    hash: string;
    type: ChangeType;
    title: string;
    desc: string;
    changes: string[];
}

export const changelogData: ChangeLogEntry[] = [
    {
        version: "v1.1.0",
        date: "2026-03-17",
        hash: "ac7f9d2",
        type: "core",
        title: "Architecture: Distributed State & Compute Offloading",
        desc: "Refactored the core engine to support distributed, multi-node deployments. This update implements Redis-backed L1 caching, decouples CPU-bound workloads from the asynchronous event loop, and introduces global API rate limiting.",
        changes: [
            "Integrated Redis L1 cache for VFS metadata utilizing zero-copy Protobuf serialization",
            "Replaced static file locks with a distributed, heartbeat-driven watchdog mechanism via atomic Lua scripts",
            "Offloaded CPU-bound cryptographic operations (PBKDF2, AES-GCM-256) to dedicated synchronous thread pools",
            "Implemented in-memory WASM module caching to eliminate redundant JIT compilation overhead",
            "Deployed a sliding-window rate limiter within the JWT validation pipeline",
            "Enforced strict Rust 2024 type declarations and aligned gRPC struct initializers for pagination support"
        ]
    },
    {
        version: "v1.0.0-pre",
        date: "2026-02-27",
        hash: "init000",
        type: "core",
        title: "V1 Initial Pre-Release",
        desc: "First public pre-release of the Pytja Core Engine. Introduces the zero-trust gRPC architecture, WASM sandboxing, and Redis-backed session management.",
        changes: [
            "Core engine initialization with strict memory-safe data streaming",
            "WebAssembly (WASM) ephemeral plugin sandboxing",
            "Redis-backed Ed25519 identity validation",
            "Interactive CLI and Admin Dashboard deployment"
        ]
    },
    {
        version: "v0.9.5-beta",
        date: "2026-01-15",
        hash: "bta950",
        type: "feature",
        title: "Universal Transfer Protocol",
        desc: "Implemented the chunked gRPC streaming system mathematically eliminating OOM failures during large file transfers.",
        changes: [
            "Migrated from REST to gRPC for all internal communications",
            "Optimized chunks to 64-KB frames",
            "Added multi-threaded decompression layer"
        ]
    },
    {
        version: "v0.9.0-alpha",
        date: "2025-12-01",
        hash: "alp900",
        type: "security",
        title: "Zero-Trust Foundation",
        desc: "Complete rewrite of the authentication layer to drop password-based auth in favor of strictly scoped JWTs and Ed25519 keys.",
        changes: [
            "Removed legacy password endpoints",
            "Integrated Redis for sub-millisecond token validation",
            "Added role-based access control (RBAC) manifests"
        ]
    }
];