---
category: Intelligence
subcategory: Common Models
title: Common Models
card_question: What model families power the system, and what does each enable physically?
one_line_summary: The model families behind physical AI — rules, classical ML, deep vision, speech, LLMs, VLMs, and the new robotics VLAs — and what each lets a thing actually do in the world.
status: draft
display:
  mode: grid
  groupBy: intelligence.model
project_ids:
  - mediacup
  - skinput
  - irobot-roomba
  - apple-watch
  - ring-doorbell
  - amazon-echo-alexa
  - rayban-meta-smart-glasses
  - boston-dynamics-atlas
  - figure-02
  - tesla-optimus
  - physical-intelligence-pi-zero
project_notes:
  mediacup: "Pure rule-based: a coffee cup with a thermometer and a hard-coded threshold — no learning, it just reports hot/cold and motion. The no-AI floor of the spectrum."
  skinput: "Classical machine learning on bio-acoustic signals — a trained classifier turns finger taps on your arm into discrete inputs. Recognition, not understanding."
  irobot-roomba: "Rule-based behaviors plus classical ML for mapping (SLAM) — what lets a cheap puck cover a real floor and remember the room without any deep net."
  apple-watch: "Classical ML and deep learning on sensor streams — the model TYPE is what converts raw PPG and accelerometer data into a heart-rate alert or a fall detection."
  ring-doorbell: "Deep-learning computer vision is the enabling family here: person-vs-package detection and motion zones are what make a camera a 'smart' doorbell rather than a recorder."
  rayban-meta-smart-glasses: "An LLM paired with a vision-language model — multimodal perception is what lets you ask 'what am I looking at?' and get an answer grounded in the camera feed."
  amazon-echo-alexa: "A speech-recognition model front-end (wake word, ASR) increasingly fused with an LLM — the speech model is what makes voice the physical interface at all."
  boston-dynamics-atlas: "A hybrid stack — rule-based control, deep learning for perception, and reinforcement learning for dynamic locomotion. RL is what buys the parkour and recovery."
  figure-02: "A vision-language-action model and robotics foundation model — the VLA family is what lets a humanoid take a spoken instruction and turn it directly into manipulation."
  tesla-optimus: "A VLA built on deep-learning vision — betting the same end-to-end approach that drives a car can drive a body through factory and home tasks."
  physical-intelligence-pi-zero: "A robotics foundation model layering VLA on a VLM — trained across many robot bodies, aiming for one model that generalizes manipulation the way an LLM generalizes text."
---

Lined up by model family, physical AI is really three eras stacked on one shelf: the rule-based and classical-ML floor where a MediaCup just trips a temperature threshold and Skinput classifies a tap (ai:none/some, no understanding, only recognition); the perception layer where deep nets give a Roomba a map, an Apple Watch a heart-rate alarm, and a Ring doorbell its person-vs-package vision; and the language-grounded top where speech models and LLMs make voice the interface (Alexa) and vision-language models let Ray-Ban Meta answer "what am I looking at?" The sharpest frontier is robotics: Atlas still leans on reinforcement learning for locomotion, while Figure 02, Tesla Optimus, and Physical Intelligence's π0 bet on vision-language-action and robotics foundation models — the surprise being that the family which now reaches deepest into the physical world (turning a spoken instruction straight into manipulation) is the youngest and least proven on the shelf.
