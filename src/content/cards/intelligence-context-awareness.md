---
category: Intelligence
subcategory: Context Awareness
title: Context Awareness
card_question: What does the system know about its surroundings, and how does it find out?
one_line_summary: Knowing who is present, what is happening, and where — a question answered by an infrared beacon, a hand-written rule, or a neural net, depending on how rich the situation is.
status: draft
summary:
  label: Sensing methods in play
  attribute: intelligence.input
  caption: How these systems take in the world — from cameras and microphones to motion, radar, and ambient sensors.
display:
  mode: grid
project_ids:
  - mediacup
  - smart-its
  - active-badge-location-system
  - cyberguide-georgia-tech
  - easyliving-microsoft-research
  - cordyceps
  - microsoft-kinect
  - google-soli
  - apple-vision-pro
  - parctab-xerox-parc
  - google-now
  - nest-learning-thermostat
project_notes:
  mediacup: "The poorest signals, the leanest method: temperature and motion run through hand-written rules infer drinking, carrying, or a meeting — situation-sensing with no AI."
  smart-its: "Postage-stamp boards stuck onto any object so it perceives handling and proximity and exchanges context with neighbors — sensing matched by signal correlation, not learning."
  active-badge-location-system: "Reduces context to one variable — who is in which room — answered by an IR pulse and a ceiling sensor, a lookup table standing in for understanding."
  cyberguide-georgia-tech: "Location and heading as first-class inputs: an IR/GPS handheld looks up whatever exhibit you face, retrieval driven by where you stand rather than what you ask."
  easyliving-microsoft-research: "A precise shared world-model — multi-camera tracking of who is where — used as the single context signal that routes lights and screens to the right person."
  cordyceps: "Distributed context: objects pool what each one senses into a coordinated picture, the only set member whose situational read is an LLM rather than a rule."
  microsoft-kinect: "Cheap room-scale depth turned the whole body into context — skeletons, gestures, and voice tracked across a room with no controller, seeding a wave of physical-AI sensing."
  google-soli: "Radar as invisible context-sensing: a millimeter chip feels presence and fine hand micro-gestures through the dark and through materials, a camera-free way to read a person."
  apple-vision-pro: "The richest situation read here — continuous 3D mapping of room, gaze, and hands so digital content can be anchored to real surfaces in real time."
  parctab-xerox-parc: "The founding context-aware experiment — palm-sized tabs that knew which room and which neighbors were near, so the office could respond to where you stood."
  google-now: "Context as foreground, not sensing: fuses location, time, and motion to push the right card before you ask — situation read by classifiers across your data trail."
  nest-learning-thermostat: "Infers a single rich variable — is anyone home and when — from motion and routine, then acts on it, learning your schedule rather than being told it."
---

What this set shows is that the method scales with the richness of the situation, not the year. When context is one variable — who is in which room — a beacon and a lookup answer it: the Active Badge pulses infrared, CyberGuide reads location and heading, and MediaCup and Smart-Its infer handling from thresholds and correlated signals, all with no AI at all. As the situation gets richer the method has to learn: EasyLiving's ceiling cameras maintain a live world-model of who is where, Kinect reconstructs skeletons across a room, Soli feels presence and micro-gestures through the dark, and Vision Pro maps room, gaze, and hands continuously. Cordyceps sits apart as the one whose read is an LLM pooling many objects' senses — a reminder that "knowing your situation" is an infrastructure choice as much as an intelligence one.
