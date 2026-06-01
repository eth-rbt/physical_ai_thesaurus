---
category: Intelligence
subcategory: Uncertainty / Confidence / Failure Handling
title: Uncertainty & Failure Handling
card_question: How does the AI behave when perception, inference, or action is uncertain?
one_line_summary: What a system does when it is not sure — mishear and ask again, get stuck and stop, pull over, confirm before acting, or escalate to a human.
status: draft
display:
  mode: grid
project_ids:
  - amazon-echo-alexa
  - apple-siri
  - waymo-driver
  - irobot-roomba
  - roborock
  - figure-02
  - hello-robot-stretch
  - lifeline-pers
  - claude-computer-use
  - humane-ai-pin
  - microsoft-seeing-ai
project_notes:
  amazon-echo-alexa: "The canonical mishearing machine — when speech is ambiguous it guesses, asks 'did you mean…', or simply says it didn't understand, making confidence audible in everyday speech."
  apple-siri: "Disambiguation as interaction design — offers a list to choose from, asks a follow-up, or punts to a web search rather than commit to a wrong action."
  waymo-driver: "Failure handling at 5/5 autonomy: when the scene is unreadable it slows, pulls over, and escalates to remote assistance — disengagement as a designed graceful degradation, not a crash."
  irobot-roomba: "The 'do nothing / ask for help' end of the spectrum — cliff sensors halt it at the stairs, and when wedged or lost it stops and announces an error code instead of pushing on."
  roborock: "AI obstacle vision that hedges — it identifies and steers around objects it can't classify (cables, pet waste) and flags 'I avoided something' rather than risk plowing through."
  figure-02: "A vision-language-action humanoid that can ground a request and, when an instruction is ambiguous, clarify or confirm before manipulating — uncertainty handled at the level of the task plan."
  hello-robot-stretch: "Assistive manipulation where confirming before moving someone's objects matters — a research platform where 'are you sure?' and human-in-the-loop checks are part of safe operation."
  lifeline-pers: "The pure-escalation case with no AI at all: a rule-based fall/emergency button whose entire design is the false-alarm cancel window and the handoff to a live human responder."
  claude-computer-use: "An LLM agent built around confidence and refusal — it can decline, ask for clarification, or pause for a human at risky steps, making 'I'm not sure, you confirm' an explicit affordance."
  humane-ai-pin: "The cautionary failure case — a wearable LLM assistant whose hallucinated and uncertain answers, delivered with false confidence, showed what happens when a device hides its own doubt."
  microsoft-seeing-ai: "Accessibility vision that has to voice its uncertainty honestly — narrating a scene to a blind user, hedged descriptions and 'probably' are safety features, not bugs."
---

Read together these projects map the full repertoire a system reaches for when it is not sure, and the range is striking: at one end the Roomba and Waymo handle doubt with their bodies — stop at the cliff, announce an error, pull over and call for remote help — while smart speakers like Alexa and Siri turn uncertainty into talk, re-asking, offering a list, or admitting they didn't catch it. The AI-embedded split is itself the lesson: Lifeline's emergency button carries no AI at all and works precisely because a human is the failure handler, Claude Computer Use and Seeing AI (both ai:core) make refusal, confirmation, and hedged "probably" into first-class affordances, and the Humane AI Pin stands as the warning — an LLM device that masked its own doubt with false confidence and failed for exactly that.
