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
        hash: "v1-0-2-pre",
        version: "v1.0.2-pre",
        type: "security",
        date: "2026-03-24",
        title: "Security & Infrastructure Updates",
        desc: "Implemented cross-platform TLS hardening, automated SHA-256 integrity verification in CI/CD, and enhanced TLS-layer error logging.",
        changes: [
            "Cross-Platform TLS Hardening: Established full compatibility for macOS (LibreSSL) within the bootstrap process. Certificates now reliably inject strict Subject Alternative Names (SANs) cross-platform to ensure secure local zero-trust routing (localhost, 127.0.0.1, 0.0.0.0).",
            "Automated Integrity Verification (SHA-256): The CI/CD pipeline now fully automates the generation of cryptographic SHA-256 checksums for all release artifacts (macOS, Linux, Windows). This guarantees seamless file integrity and prevents man-in-the-middle attacks during distribution.",
            "Enhanced Error Logging: The shell now comprehensively captures kernel and network errors at the TLS layer, massively accelerating enterprise debugging for administrators."
        ]
    },
    {
        version: "v1.0.1-pre",
        date: "2026-03-23",
        hash: "v1.0.1-pre",
        type: "core",
        title: "Major Infrastructure: Async WASM Engine & Redis L1 State",
        desc: "A massive architectural milestone combining a compute engine overhaul with a horizontally scalable storage layer. CPU-bound workloads are entirely decoupled from the async event loop, while a new Redis-backed L1 cache fundamentally reduces SQL loads and introduces distributed concurrency.",
        changes: [
            // --- PART 1: COMPUTE & WASM ---
            "Compute Architecture: Decoupled heavy cryptographic operations (PBKDF2, AES-GCM-256) into dedicated synchronous thread pools to prevent head-of-line blocking",
            "WASM Performance: Implemented an in-memory WebAssembly Module Cache, reducing plugin instantiation from milliseconds to low nanoseconds",
            "Thread Isolation: Routed WASM initialization to isolated execution pools, mathematically eliminating latency spikes on the main data stream",
            "Memory Safety: Enforced strict Rust 2024 move-semantics for zero-copy ownership transfers during multi-gigabyte encrypted file streams",

            // --- PART 2: DISTRIBUTED STATE ---
            "State Management: Deployed a Cache-Aside pattern for Virtual Filesystem (VFS) operations, migrating read-heavy endpoints to Redis RAM",
            "Data Serialization: Replaced JSON overhead with direct Protobuf byte-encoding enabling near zero-copy streaming to the gRPC socket",
            "Distributed Concurrency: Upgraded ephemeral file locking to a dynamic, heartbeat-driven Watchdog architecture utilizing atomic Lua scripts",
            "Zero-Trust Security: Integrated a global sliding-window rate limiter directly into the JWT pipeline with a fail-open resiliency strategy",
            "Cache Isolation: Enforced strict user-isolated cache keys, guaranteeing that RBAC boundaries remain intact at the caching layer"
        ]
    },
    {
        version: "v1.0.0-pre",
        date: "2026-03-08",
        hash: "v.1.0.0-pre",
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