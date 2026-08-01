---
id: "livedesk"
title: "LiveDesk"
category: "Real-Time Document Editor"
year: "2024"
overview: "A real-time collaborative document editing platform featuring workspace access controls, WebSocket synchronization, and write-back caches."
role: "Real-Time Systems Engineer"
services: "WebSocket Protocol\nRedis Pub/Sub\nCache Layering"
about: "Enables fast, concurrent document editing through a lightweight diff-and-rebase flow. Splits the system into a memory-first websocket hot path, Redis pub/sub for horizontal cross-instance propagation, and periodic background worker writes to PostgreSQL."
placeholder: "Collaborative document dashboard showing cursor locations and real-time editing sessions"
image: "/images/livedesk.png"
---
LiveDesk handles collaborative document synchronization and presence indicators across distributed server nodes. It features socket reconnect queues, PostgreSQL access authorizations, and a write-back cache manager to shield databases from typing write-amplification.
