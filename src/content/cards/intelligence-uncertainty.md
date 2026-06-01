---
category: Intelligence
subcategory: Uncertainty / Confidence / Failure Handling
title: Uncertainty & Failure Handling
card_question: How does the AI behave when perception, inference, or action is uncertain?
one_line_summary: Where a system puts its doubt when it isn't sure — into its body (pull over, steer around), into talk (ask again, hedge), into a human (escalate) — or, fatally, hides it behind false confidence.
status: draft
display:
  mode: grid
project_ids:
  - apple-siri
  - dragon-naturallyspeaking
  - waymo-driver
  - roborock
  - shakey-robot
  - physical-intelligence-pi-zero
  - hello-robot-stretch
  - lifeline-pers
  - claude-computer-use
  - humane-ai-pin
  - microsoft-seeing-ai
  - boston-dynamics-atlas
  - sperry-autopilot
project_notes:
  apple-siri: "Puts doubt into talk: an ambiguous request gets a disambiguation list, a follow-up question, or a punt to web search instead of one confidently wrong action."
  dragon-naturallyspeaking: "Recognition uncertainty made into an explicit fix-and-learn loop — low-confidence words flagged, the user corrects, and the per-speaker acoustic model folds in the correction."
  waymo-driver: "Doubt handled with the body at full autonomy — an unreadable scene means slow, pull over, and call remote assistance; the construction-zone pullbacks show the same reflex failing."
  roborock: "Hedges with motion: its obstacle vision steers around a cable or pet mess it can't classify and reports 'I avoided something' rather than risk plowing through."
  shakey-robot: "The original uncertain-world recovery — when its symbolic map of the room stopped matching what it sensed, STRIPS replanning was how it got un-wrong, no probabilities needed."
  physical-intelligence-pi-zero: "Failure recovery as a learned frontier (ai:core): the VLA model grasps, slips, and retries on tasks like laundry-folding rather than freezing when a grip goes wrong."
  hello-robot-stretch: "Confirm-before-moving in someone's home — an assistive manipulator where human-in-the-loop checks and teleop oversight are how it handles touching a person's objects safely."
  lifeline-pers: "The pure-escalation extreme with no AI at all: the whole design is the false-alarm cancel window and the handoff to a live human, who is the failure handler."
  claude-computer-use: "Doubt made first-class (ai:core): it can decline, ask for clarification, and on a suspected prompt injection its classifiers pause for a human before proceeding."
  humane-ai-pin: "The anti-example: a wearable LLM that masked latency and hallucination behind false confidence — getting the weather wrong with a straight face is why it failed."
  microsoft-seeing-ai: "Honest hedging as a safety feature (ai:core): narrating a scene to a blind user, 'probably' and approximate age beat a confident wrong label it can't take back."
  boston-dynamics-atlas: "Doubt absorbed by the body at the limit: a slip or misjudged step triggers a balance catch or a get-up routine, so a fall is recovered from rather than catastrophic."
  sperry-autopilot: "The genealogical root of delegated-control failure handling: it flies steadily within its envelope and the design assumption is the human takes back the controls when conditions exceed it."
---

What this set really sorts by is *where* a system parks its uncertainty. Some put it in the body — Waymo pulls over and calls remote assistance, Roborock steers around the thing it can't classify — while Siri and Dragon route it into language, offering a disambiguation list or flagging a low-confidence word to correct. Others put it in a person: Lifeline carries no AI at all and works precisely because the human on the call is the failure handler, and Stretch and Claude pause for confirmation at the risky step. The AI-embedded reading is the lesson, though, when you set Seeing AI and pi-zero against the Humane Pin: the honest systems make hedging and retry first-class — "probably," a re-grasp — while the Pin masked latency and hallucination behind false confidence, which is the one failure mode none of the others commit and the one that sank it.
