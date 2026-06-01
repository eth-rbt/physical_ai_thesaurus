---
category: Intelligence
subcategory: Inference vs Generation vs Control
title: Inference vs Generation vs Control
card_question: Is the AI fundamentally recognizing, generating, deciding, or physically controlling?
one_line_summary: What the AI is actually doing under the hood — recognizing a state, generating media or language, or controlling a device — and how that changes the way you interact with it.
status: draft
display:
  mode: grid
project_ids:
  - lifeline-pers
  - microsoft-seeing-ai
  - amazon-echo-alexa
  - be-the-beat
  - reactable
  - nest-learning-thermostat
  - irobot-roomba
  - inform
  - unimate
  - waymo-driver
  - figure-02
project_notes:
  lifeline-pers: "Pure inference at its most minimal: it recognizes a single deliberate button press (later a fall) and relays it, deciding nothing."
  microsoft-seeing-ai: "Inference only: computer vision recognizes text, faces, products, and scenes, then narrates what it sees — no generation or control."
  amazon-echo-alexa: "Primarily generation: it recognizes speech but its core act is generating spoken language and calling tools to answer you."
  be-the-beat: "Generation driven by inference: it recognizes a dancer's freestyle movement, then generates matching music in response."
  reactable: "Generation: it recognizes tangible puck arrangements via fiducial vision and generates synthesized sound in real time."
  nest-learning-thermostat: "Inference plus control: it predicts a household's heating habits, then actuates the HVAC to match — recognizing and physically controlling."
  irobot-roomba: "Control with light inference: it senses and maps the room, then decides paths and physically drives itself to clean."
  inform: "Pure control: depth-camera sensing directly actuates a 900-pin array to push digital shapes into physical form, with no learned model."
  unimate: "Control with zero perception: it replays pre-programmed joint positions to weld and lift — physical manipulation, no inference or generation."
  waymo-driver: "The full loop: it fuses perception, prediction, planning, and control to recognize, decide, and physically drive a car."
  figure-02: "The full loop embodied: it perceives, plans, and physically controls a humanoid body to manipulate objects and perform labor."
---

Seen together these projects refuse to collapse into one kind of "AI": the same word covers a Lifeline pendant doing nothing but inferring that a fall happened, Seeing AI recognizing a scene and reading it aloud, an Echo generating language and calling tools, Be the Beat and the reacTable generating music from gesture and tangible tokens, a Nest thermostat predicting-then-actuating, a Roomba mapping-then-driving, inFORM pushing pixels up into physical shape, and a Unimate arm that only ever controls a weld — pure manipulation with no perception at all. The interaction you have flips entirely with that verb: you trust a recognizer, converse with a generator, and delegate to a controller. The cleanest split is along the AI-embedded axis — Seeing AI is ai:core inference and the Echo is generative language, while the projects doing the most consequential physical acting (Unimate, the original Roomba, inFORM) carry little or no learned intelligence at all, and Waymo and Figure 02 are the rare cases that fuse perception, prediction, planning, and control into a single loop.
