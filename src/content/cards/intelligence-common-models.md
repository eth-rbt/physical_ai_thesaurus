---
category: Intelligence
subcategory: Common Models
title: Common Models
card_question: What model families power the system, and what does each enable physically?
one_line_summary: Three eras of model on one shelf — hard-coded rules, deep perception, language grounding, and the new robotics VLAs — and the surprise that the family reaching deepest into the physical world is the youngest.
status: draft
display:
  mode: grid
  groupBy: intelligence.model
project_ids:
  - mediacup
  - skinput
  - roborock
  - boston-dynamics-atlas
  - dragon-naturallyspeaking
  - samsung-ballie
  - microsoft-seeing-ai
  - kismet
  - tesla-optimus
  - physical-intelligence-pi-zero
  - shakey-robot
  - amazon-echo-alexa
  - figure-02
project_notes:
  mediacup: "The no-AI floor: a thermometer and a hard-coded threshold tell hot from cold and moving from still — a rule-based system that never learns anything."
  skinput: "Classical ML doing one narrow job — a trained SVM localizes finger taps from the bio-acoustics they send through your arm. Recognition, not understanding."
  roborock: "Deep-learning vision is the unlock: learned object recognition lets the puck see a sock or a cable and route around it instead of just bumping and retrying."
  boston-dynamics-atlas: "A stacked stack — model-based control plus deep-learning perception plus reinforcement learning, where the RL is precisely what buys the dynamic balance and recovery."
  dragon-naturallyspeaking: "The historical speech-model exemplar: HMM acoustic and language models made continuous dictation work in 1997, turning voice into an interface decades before assistants."
  samsung-ballie: "An LLM is what lets a spoken open-ended request become navigation and appliance control on a rolling robot, rather than matching against a fixed command list."
  microsoft-seeing-ai: "A vision-language model on a phone camera narrating text, faces, and scenes aloud — the family whose whole job is grounding pixels in language for a blind user."
  kismet: "The pre-deep-net family: hand-built emotional drives in a hybrid symbolic-neural architecture produced richly legible social behavior with no learned policy at all."
  tesla-optimus: "A vision-language-action model on deep-learning vision — the bet that the end-to-end approach behind self-driving can also drive a humanoid body through real tasks."
  physical-intelligence-pi-zero: "A robotics foundation model layering VLA on a VLM, trained across eight robot bodies — aiming to generalize manipulation the way an LLM generalizes text."
  shakey-robot: "The symbolic-AI ancestor of this whole shelf: a rule-based system running STRIPS planning, decomposing a goal into steps and acting on the world by logic, not learning."
  amazon-echo-alexa: "The mass-market speech-model-into-LLM exemplar — a wake word and acoustic models turned a kitchen cylinder into a voice interface, now backed by a language model."
  figure-02: "The flagship commercial bet on a vision-language-action model plus robotics foundation model: one learned policy meant to drive a humanoid through factory tasks end-to-end."
---

Lined up by family, these ten projects are really three eras stacked on one shelf. At the floor sit rule-based and classical-ML systems that recognize without understanding — MediaCup trips a temperature threshold, Skinput's SVM localizes a tap, and Kismet's hybrid symbolic-neural drives produced richly social behavior with no learned policy at all. Then the perception era, where deep nets give Roborock learned navigation and reinforcement learning buys Atlas its dynamic balance. Then language grounding: Dragon's speech engine made voice an interface in 1997, an LLM lets Samsung Ballie act on an open-ended spoken request, and Seeing AI's vision-language model narrates the scene to a blind user. The sharp point is that the youngest family reaches deepest into the physical world — Tesla Optimus and Physical Intelligence's π0 bet that vision-language-action and robotics foundation models can turn an instruction straight into manipulation, the least proven approach doing the most physical work.
