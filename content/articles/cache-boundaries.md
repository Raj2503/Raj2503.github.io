---
title: "Cache boundaries are an API design decision"
description: "A draft technical note on cache ownership, explicit freshness and degraded reads."
category: "Caching"
published: 2026-07-29
updated: 2026-07-29
readingTime: "5 min read"
status: "Draft"
slug: "cache-boundaries"
---

This source file holds the article metadata and editorial copy. The public static route is `/writing/cache-boundaries/`.

A cache is not an invisible speed layer. It changes who owns freshness, failure behaviour and recovery. Treat those decisions as part of the service contract.
