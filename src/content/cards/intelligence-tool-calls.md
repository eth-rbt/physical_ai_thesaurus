---
category: Intelligence
subcategory: Tool Calls / Agentic Flows
title: Tool Calls & Agentic Flows
card_question: When the AI needs to do something, who decides which tools to call?
one_line_summary: The same intent-to-action pipeline appears everywhere; what moves is who authors the choice of tool — a person wiring a rule, a classical model, or an LLM deciding at runtime.
status: draft
summary:
  label: What's doing the reasoning
  attribute: intelligence.model
  caption: From scripted if-this-then-that rules to LLM agents that decide which tools to call and chain them on their own.
display:
  mode: grid
project_ids:
  - x10-home-automation
  - ifttt
  - samsung-smartthings
  - general-magic-telescript
  - apple-siri
  - google-now
  - shakey-robot
  - rabbit-r1
  - claude-computer-use
  - cordyceps
  - google-assistant
  - home-assistant
  - physical-intelligence-pi-zero
project_notes:
  x10-home-automation: "Zero decision layer: a powerline module fires the on/off/dim code a person set in 1975 — the bare baseline this whole question sits on top of."
  ifttt: "The decider is the human who wired the Applet; the trigger-action rule then runs deterministically, which is exactly why 100,000+ non-programmers could compose their own."
  samsung-smartthings: "Routines fire preset device chains from conditions a person configured; even its plain-English routine builder just assembles the rule, then hands choosing back to the trigger."
  general-magic-telescript: "The sharp historical point: a fully explicit tool-call architecture in 1994 — agents carried work orders to network 'places' and returned results — but every step was scripted, not learned."
  apple-siri: "Maps a spoken phrase onto a fixed set of registered intents and Shortcuts; routing is pre-wired, and the user still hand-authors any multi-step chain across apps."
  google-now: "Decider without an LLM: classical ML ranks and pushes cards from fused location, calendar, and search signals — the system chooses what to act on, but the choice space is fixed."
  shakey-robot: "Agentic planning predates the LLM by sixty years — STRIPS decomposed a typed goal into a sequence of primitive actions, the planner itself choosing the steps."
  rabbit-r1: "Hands the choice to a model: one open-ended spoken request is meant to be interpreted and chained into app actions — though teach-mode shows much of it is still demonstrated, not reasoned."
  claude-computer-use: "The purest model-as-decider: an LLM reads the screen and emits its own clicks and keystrokes across steps, turning any GUI into a tool it picks at runtime."
  cordyceps: "Pushes the decision into a multi-agent flow — LLM-driven objects confer among themselves about who acts, the choice distributed across the room rather than held by one planner."
  google-assistant: "Like Siri, routes a spoken request onto registered device actions and Routines — the intent-to-tool map is pre-wired, with the LLM layer added later to phrase, not freely choose, the chain."
  home-assistant: "Spans the whole question on one platform: deterministic automations a person scripts, plus an optional LLM agent that now picks and chains device calls at runtime from plain language."
  physical-intelligence-pi-zero: "The model-as-decider in the physical domain — a robotics foundation model reads a goal and chooses, then chains, the motor primitives itself rather than executing a scripted sequence."
---

The revealing thing about this set is that the *architecture* of chaining tool calls is ancient — Telescript shipped explicit agents carrying work orders in 1994, and Shakey's STRIPS planner was decomposing goals into action sequences in the 1960s — so the new variable isn't agency, it's who holds the choice. At one extreme the human is the entire decision layer: X10 fires a timer code, and IFTTT and SmartThings just run the trigger-action rule a person wired up (which is precisely what let ordinary people author them by the hundred thousand). Google Now marks the telling middle, a classical-ML decider that picks what to surface but only within a fixed card vocabulary. Only at the far end does the model itself choose and chain at runtime — Claude reading a screen to emit its own clicks, Rabbit R1's pitch of interpreting one spoken request, Cordyceps distributing the decision across conferring objects.
