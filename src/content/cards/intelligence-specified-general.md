---
category: Intelligence
subcategory: Specified → General Model
title: Specified → General
card_question: Is the intelligence narrow and task-specific, or open-ended and general-purpose?
one_line_summary: From a thermostat that only learns temperature to an agent that answers anything and triggers many tools — and how generality reshapes trust and failure.
status: draft
display:
  mode: axis-1d
  axis:
    metric: generality
    label: Single narrow task → general-purpose
    direction: asc
project_ids:
  - nest-learning-thermostat
  - irobot-roomba
  - ring-doorbell
  - amazon-echo-alexa
  - apple-siri
  - home-assistant
  - rayban-meta-smart-glasses
  - rabbit-r1
  - humane-ai-pin
  - figure-02
  - tesla-optimus
  - claude-computer-use
project_notes:
  nest-learning-thermostat: "Learns exactly one thing — your heating schedule — and fails legibly: a thermostat that guesses wrong is just a thermostat."
  irobot-roomba: "Domain-specific to the floor; competent inside its one job and oblivious to everything else, which is precisely why we trust it unattended."
  ring-doorbell: "Narrow perception bolted to a single threshold — detect motion, recognize a person, ping a phone. No open-endedness, no room for surprise."
  amazon-echo-alexa: "A broader platform: a fixed speaker that fields open-ended requests and routes them to thousands of skills, but still brittle the moment you step outside the script."
  apple-siri: "A general voice layer riding across phone, watch, and home — broad in surface area, yet its competence is a patchwork of shortcuts and intents."
  home-assistant: "General automation glue — it can orchestrate almost any device, but its generality is the user's, assembled rule by rule rather than reasoned."
  rayban-meta-smart-glasses: "A general multimodal wearable: point your gaze and ask anything, with an LLM behind the lens — generality bought at the cost of a clear failure boundary."
  rabbit-r1: "A standalone bet that one pocket device could do anything via a 'large action model' — the open-ended promise outran what it could reliably deliver."
  humane-ai-pin: "A wearable general assistant with no app and no screen, asking to be trusted with everything; the breadth of the ask was its undoing."
  figure-02: "General humanoid ambition — a vision-language-action body meant to take on open-ended physical work, where a wrong move is no longer just a wrong answer."
  tesla-optimus: "The other humanoid wager on a single general body for arbitrary labor; generality here raises the stakes of every failure to the physical."
  claude-computer-use: "The far pole: an agentic model that perceives a screen and takes open-ended multi-step action across any software, general by construction and hardest of all to bound."
---

Read along the axis, generality and AI-embeddedness rise together: the narrow end is rule-based and classical — a Nest thermostat that learns only your schedule, a Roomba bound to the floor, a Ring that does nothing but watch a doorway — and these earn easy trust precisely because their one job makes failure legible. The broad end is where the large models live (Ray-Ban Meta, Rabbit R1, and the Humane Pin all answer open-endedly through an LLM; Figure 02 and Optimus push a vision-language-action body toward arbitrary physical work; Claude Computer Use takes multi-step action across any software), and the tension the set exposes is that generality inflates expectation faster than reliability — Rabbit and Humane both promised to do anything and were undone by the breadth of the ask, while a humanoid's wrong move is no longer a wrong answer but a physical one. In between sit the platforms (Alexa, Siri, Home Assistant) whose generality is really a patchwork of skills and rules rather than reasoning, broad in surface area but brittle the moment you leave the script.
