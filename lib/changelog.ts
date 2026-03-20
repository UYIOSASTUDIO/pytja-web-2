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
        version: "v1.2.0",
        date: "2026-03-20",
        hash: "ac7f9d2",
        type: "core",
        title: "Compute Architecture: Async Decoupling & WASM Acceleration",
        desc: "A major compute engine overhaul focusing on thread-pool isolation. CPU-bound workloads are now entirely decoupled from Tokio's async event loop, ensuring microsecond latency for concurrent network I/O.",
        changes: [
            "Architecture: Decoupled heavy cryptographic operations (PBKDF2, AES-GCM-256) into dedicated synchronous thread pools to prevent head-of-line blocking",
            "Performance: Implemented an in-memory WebAssembly Module Cache, reducing plugin instantiation from milliseconds (JIT compilation) to low nanoseconds",
            "Concurrency: Routed WASM initialization and execution operations to isolated execution pools, mathematically eliminating latency spikes on the main data stream",
            "Memory Safety: Enforced strict Rust 2024 move-semantics for zero-copy ownership transfers during multi-gigabyte encrypted file streams"
        ]
    },
    {
        version: "v1.1.0",
        date: "2026-03-10",
        hash: "b8a3e1f",
        type: "feature",
        title: "Distributed State: Redis L1 & Watchdog Concurrency",
        desc: "Transitioned the core storage layer to a horizontally scalable, Redis-backed architecture. This update fundamentally reduces SQL database loads via L1 caching and introduces distributed concurrency controls.",
        changes: [
            "State Management: Deployed a high-performance Cache-Aside pattern for Virtual Filesystem (VFS) operations, migrating read-heavy endpoints to Redis RAM",
            "Serialization: Replaced JSON overhead with direct Protobuf byte-encoding enabling near zero-copy streaming to the gRPC socket",
            "Concurrency: Upgraded ephemeral file locking to a dynamic, heartbeat-driven Watchdog architecture utilizing embedded atomic Lua scripts",
            "Security: Integrated a global sliding-window rate limiter directly into the JWT zero-trust pipeline with a fail-open resiliency strategy",
            "Isolation: Enforced strict user-isolated cache keys, guaranteeing that Role-Based Access Control (RBAC) boundaries remain intact at the caching layer"
        ]
    },
    {
        version: "v1.0.0-pre",
        date: "2026-02-28",
        hash: "init000",
        type: "core",
        title: "Initial V1 Pre-Release: Sovereign Data Engine",
        desc: "First public pre-release of the Pytja Core Engine. Establishing the foundation for a zero-trust, deterministic database exploration layer powered by Rust and WebAssembly.",
        changes: [
            "Core: Initialized the deterministic gRPC streaming architecture for internal communications and high-throughput data pipelines",
            "Compute: Integrated the Wasmtime runtime for strictly sandboxed, ephemeral execution of user-defined logic (WASM Plugins)",
            "Security: Implemented strict Ed25519 cryptographic identity validation, dropping legacy password systems in favor of scoped JWTs",
            "Storage: Established the Virtual Filesystem (VFS) abstraction layer with persistent SQL bindings and zero-trace disk guarantees",
            "Access Control: Deployed granular Role-Based Access Control (RBAC) manifests for deterministic permission and visibility handling",
            "Resiliency: Deployed chunked data transfer protocols (64-KB frames), mathematically eliminating Out-Of-Memory (OOM) failures during massive payload transfers",
            "Interfaces: Released the interactive Command Line Interface (Pytja CLI) and initial Admin Dashboard endpoints"
        ]
    }
];