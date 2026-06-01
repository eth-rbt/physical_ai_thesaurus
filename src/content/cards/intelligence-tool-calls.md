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
  - ifttt
  - samsung-smartthings
  - home-assistant
  - apple-siri
  - amazon-echo-alexa
  - google-assistant
  - humane-ai-pin
  - rabbit-r1
  - cordyceps
project_notes:
  ifttt: "The baseline: pure 'if this, then that' Applets where one service's trigger deterministically fires another's action, no model deciding anything."
  samsung-smartthings: "A smart-home platform whose automations and 'Routines' fire device actions from preset triggers and conditions a person configured up front."
  home-assistant: "A local-first hub that runs user-authored rule automations across a thousand devices, now with optional LLM-driven voice intents."
  apple-siri: "Apple's assistant turns speech into device actions; its Shortcuts app lets users wire visual, multi-step automations across apps by hand."
  amazon-echo-alexa: "A voice speaker that maps spoken intents to Skills and fires multi-step Routines — one phrase triggering a scripted chain of actions."
  google-assistant: "An ambient voice layer across phones and speakers that parses a request and dispatches it to apps, smart-home gear, and search."
  humane-ai-pin: "A screenless worn assistant that takes a voice or gesture request and routes it through LLM-driven services to answer or act."
  rabbit-r1: "A handheld AI gadget whose large action model is pitched to operate apps on your behalf, chaining steps from one spoken request."
  cordyceps: "A speculative LLM installation where coordinated agents talk among themselves and act through the home — tool-calling turned into an autonomous, multi-agent flow."
---

This is an AI-core distinction the rest of the thesaurus's no-AI objects never face: who actually decides which tool gets called. At the deterministic end IFTTT, SmartThings, and Home Assistant just run the if-this-then-that Applets and Routines a person wired up in advance, and Siri and Alexa map a spoken phrase onto pre-registered Skills, Shortcuts, and scripted Routines. The agentic end hands that decision to a model — the Humane AI Pin and Rabbit R1's "large action model" interpret an open-ended request and pick and chain the tool calls themselves, and Cordyceps pushes further into coordinated multi-agent flows. Together they trace the same intent-to-action pipeline shifting from a human author to an LLM.
