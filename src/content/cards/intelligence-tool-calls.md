---
category: Intelligence
subcategory: Tool Calls / Agentic Flows
title: Tool Calls & Agentic Flows
card_question: When the AI needs to do something, who decides which tools to call?
one_line_summary: How a system turns intent into action — from fixed if-this-then-that rules to LLM agents that pick and chain tool calls on their own.
status: draft
summary:
  label: What's doing the reasoning
  attribute: intelligence.model
  caption: From scripted if-this-then-that rules to LLM agents that decide which tools to call and chain them on their own.
display:
  mode: grid
project_ids:
  - rabbit-r1
  - humane-ai-pin
  - amazon-echo-alexa
  - google-assistant
  - apple-siri
  - home-assistant
  - ifttt
project_notes:
  rabbit-r1: "A handheld AI gadget whose large action model is pitched to operate apps on your behalf, chaining steps from one spoken request."
  humane-ai-pin: "A screenless worn assistant that takes a voice or gesture request and routes it through LLM-driven services to answer or act."
  amazon-echo-alexa: "A voice speaker that maps spoken intents to Skills and fires multi-step Routines — one phrase triggering a scripted chain of actions."
  google-assistant: "An ambient voice layer across phones and speakers that parses a request and dispatches it to apps, smart-home gear, and search."
  apple-siri: "Apple's assistant turns speech into device actions; its Shortcuts app lets users wire visual, multi-step automations across apps by hand."
  home-assistant: "A local-first hub that runs user-authored rule automations across a thousand devices, now with optional LLM-driven voice intents."
  ifttt: "The baseline: pure 'if this, then that' Applets where one service's trigger deterministically fires another's action, no model deciding anything."
---

What turns a request into action ranges from rigid rules to autonomous agents: at one end IFTTT and Home Assistant run fixed if-this-then-that Applets and automations a person wired up in advance, while Alexa and Siri map spoken intents onto Skills, Shortcuts, and scripted Routines. At the agentic end, Rabbit R1 and the Humane AI Pin pitch LLM-driven assistants that interpret an open-ended request and decide which tools to call and chain themselves.
