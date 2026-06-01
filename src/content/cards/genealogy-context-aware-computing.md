---
category: Genealogy
subcategory: Context-Aware Computing
title: Context-Aware Computing
card_question: "How did machines learn to notice where you are and what you are doing?"
one_line_summary: "The lineage that taught machines to model your situation \u2014 location, identity, activity, time \u2014 which it did with pure sensing infrastructure long before any of it learned."
status: draft
display:
  mode: grid
project_ids:
  - weiser-ubiquitous-computing
  - active-badge-location-system
  - parctab-xerox-parc
  - mediacup
  - cyberguide-georgia-tech
  - easyliving-microsoft-research
  - smart-dust-uc-berkeley
  - google-soli
  - google-now
  - xerox-parc-ubicomp
  - microsoft-kinect
  - nest-learning-thermostat
project_notes:
  weiser-ubiquitous-computing: "The conceptual ancestor — Weiser's PARCTab testbed sensed which room you were in so the building could react to who walked through it."
  active-badge-location-system: "The foundational case, and zero AI: infrared badges told a central service which room each person occupied, so the phone could ring wherever you actually were."
  parctab-xerox-parc: "The first fully deployed context-aware computer — a palm tablet that read its IR room-cell to print nearby, surface that room's files, and pin reminders to a place."
  mediacup: "Context smuggled into a coffee cup: temperature and motion sensors in the base let a room infer 'held', 'full', or 'a meeting is happening' from how people drink."
  cyberguide-georgia-tech: "Context goes mobile and outdoors — a Newton-based tour guide fused location and heading to open the right exhibit page as you walked up to it."
  easyliving-microsoft-research: "The first to read people directly: stereo cameras kept a live world-model of who stood where, so a session could follow you to whichever screen you faced."
  smart-dust-uc-berkeley: "Context sensing at its vanishing point — millimeter-scale motes meant to blanket an environment with presence and motion data and no interface at all."
  google-soli: "Situation read by radar: a chip senses a hand reaching, presence, and micro-gestures through a tiny RF field — context without a camera ever watching."
  google-now: "Where it finally learned: ML fused location, calendar, and search history to push a boarding pass or traffic warning before you asked — the proactive model that went mainstream."
  xerox-parc-ubicomp: "The device taxonomy that started it all — Weiser's tabs, pads, and boards, each reading its room-cell to know where it was and adapt to who held it."
  microsoft-kinect: "Context made cheap and real-time: a depth camera that read who was in the room and what their body was doing, mass-producing the person-tracking EasyLiving prototyped."
  nest-learning-thermostat: "Context-aware computing as a household appliance — motion and schedule sensing let the thermostat infer occupancy and act on it without anyone setting a rule."
---

For most of this lineage there is no AI at all — the intelligence lives in sensing infrastructure and lookup rules, not a learned model. Olivetti's Active Badge (1992) and PARC's ParcTab routed calls and files by reading an infrared room-cell; the MediaCup hid the same trick in a coffee mug; Smart Dust pushed it to the limit, motes meant to disappear into the environment entirely. The split that matters is *what gets sensed*: ordinary objects reporting their own state versus systems reading people directly, which is where machine learning finally enters — EasyLiving's camera tracking, Soli's radar, and then Google Now (2012), which fused location, calendar, and history into cards that arrived before you asked, turning a half-century of room-sensing into the proactive push we now live inside.
