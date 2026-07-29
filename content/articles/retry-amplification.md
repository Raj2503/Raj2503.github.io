---
title: "Retry amplification: when resilience becomes the outage"
description: "A draft technical note on retry budgets, deadlines, backoff and failure cascades."
category: "Distributed systems"
published: 2026-07-29
updated: 2026-07-29
readingTime: "6 min read"
status: "Draft"
slug: "retry-amplification"
---

This source file holds the article metadata and editorial copy. The public static route is `/writing/retry-amplification/`.

When layered retry policies multiply demand, a degraded dependency can receive more work than it could on a healthy day. The recommended pattern is one owner for retries, propagated deadlines, jittered backoff and a bounded retry budget.
