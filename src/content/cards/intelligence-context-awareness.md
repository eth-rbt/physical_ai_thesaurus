---
category: Intelligence
subcategory: Context Awareness
title: Context Awareness
card_question: What does the system know about its surroundings, and how does it find out?
one_line_summary: How a system perceives its physical and social situation — who is present, what is happening, and where — and acts on it.
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
  - nest-learning-thermostat
  - home-assistant
  - cordyceps
  - microsoft-kinect
  - google-soli
  - rayban-meta-smart-glasses
  - apple-vision-pro
project_notes:
  mediacup: "A coffee cup that knows its situation: from temperature and motion alone, simple rules infer whether you're drinking, carrying it, or sitting in a meeting — context awareness with no AI at all."
  smart-its: "Postage-stamp sensor boards you stick onto ordinary objects, letting them detect handling, proximity, and shared activity and broadcast their context to each other."
  nest-learning-thermostat: "Infers occupancy and daily rhythm — senses presence and learns your schedule to pre-condition the house or back off when you're away."
  home-assistant: "Fuses presence, motion, and device state locally to model what's happening room-by-room without the cloud."
  cordyceps: "Everyday objects that pool what each one senses, assembling a shared, coordinated picture of the space."
  microsoft-kinect: "Reads the whole body in 3D — tracks skeletons, gestures, and voice across the room with no controller."
  google-soli: "A radar chip that feels human presence and fine hand micro-gestures through the air, even in the dark."
  rayban-meta-smart-glasses: "Sees what you see — point your gaze and ask, and a vision-language model reasons about whatever is in front of your face."
  apple-vision-pro: "Builds a live 3D map of the room and your body, anchoring digital content to real surfaces and reading your eyes and hands."
---

Reading your situation didn't always require learning. The MediaCup inferred "you're in a meeting" from nothing but temperature and motion run through hand-written rules, and Smart-Its let any object broadcast its context the same way — context awareness with no AI at all. The modern versions lean on learned models instead: Soli's radar classifies micro-gestures in the dark, Kinect tracks skeletons across a room, and Ray-Ban Meta and Vision Pro hand the raw scene to a vision model that reasons about whatever you're looking at. In between sit the systems that simply fuse many cheap signals — Nest learning your daily rhythm, Home Assistant modeling state room-by-room, Cordyceps' objects pooling what each one senses — showing that "knowing where you are" can be rules, statistics, or a neural net, depending on how rich the situation is.
