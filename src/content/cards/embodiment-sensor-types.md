---
category: Embodiment
subcategory: Sensor Types
title: Sensor Types
card_question: What physical sensing hardware lets the AI perceive daily life?
one_line_summary: The physical sensing channels — cameras, mics, IMUs, physiological, depth, radar, environmental — that let AI perceive daily life, and what each reveals or misses.
status: draft
display:
  mode: grid
project_ids:
  - rayban-meta-smart-glasses
  - apple-watch
  - oura-ring
  - nest-cam
  - ring-doorbell
  - nest-learning-thermostat
  - irobot-roomba
  - microsoft-kinect
  - google-soli
  - mediacup
  - smart-its
project_notes:
  rayban-meta-smart-glasses: "Cameras and microphones riding on the face, capturing exactly what the wearer sees and hears — and, controversially, everyone around them."
  apple-watch: "A wrist-bound sensor bundle: optical heart-rate, accelerometer and gyroscope for motion and fall detection, plus environmental sensors, all on the skin all day."
  oura-ring: "Physiological sensing condensed into a ring — temperature, motion, and pulse read from the finger to infer sleep and recovery, invisibly."
  nest-cam: "The home camera proper — vision, audio, and motion streamed indoors, the richest and most intrusive channel in the house."
  ring-doorbell: "Camera, microphone, and motion sensor bolted to the threshold, watching the perimeter and the people who approach it."
  nest-learning-thermostat: "Occupancy sensing as a side effect of climate control — a PIR motion sensor and environmental readings infer whether anyone is home."
  irobot-roomba: "A roving sensor platform: camera, bump and cliff sensors, and environmental sensing that incidentally map the floorplan of the home."
  microsoft-kinect: "The breakthrough consumer depth sensor — structured-light then time-of-flight 3D, turning a living room into a tracked skeleton."
  google-soli: "Miniature mmWave radar that senses presence and micro-gestures without a camera — perception without an image, sidestepping some privacy tension."
  mediacup: "A 1999 coffee cup with embedded temperature and motion sensors — an early bet that everyday objects could quietly report their own state."
  smart-its: "Postage-stamp sensor boards meant to be stuck onto ordinary objects, pioneering distributed motion and environmental telemetry before the smart home existed."
---

Laid side by side, these eleven reveal that "perception" is really a stack of narrow physical channels, each with a blind spot: the Ray-Ban Meta glasses and Nest Cam capture rich vision and audio but only where they point; the Apple Watch and Oura Ring read physiology off the skin yet see nothing of the room; the Nest thermostat infers occupancy from a crude motion blip; and Project Soli senses presence and micro-gesture through radar with no image at all — perception that deliberately gives up detail to dodge the camera's privacy cost. The deepest split is in who does the inferring: MediaCup and Smart-Its (ai:none) simply embedded sensors in objects and streamed raw state, the Kinect and Soli are research-grade sensing decoupled from any one model, while today's Watch, Ring, Roomba and Oura (ai:unknown) fold proprietary inference directly behind the sensor — so the same accelerometer trace becomes a fall alert, a sleep score, or a floorplan depending on whose model is listening.
