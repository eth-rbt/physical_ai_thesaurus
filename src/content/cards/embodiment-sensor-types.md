---
category: Embodiment
subcategory: Sensor Types
title: Sensor Types
card_question: What physical sensing hardware lets the AI perceive daily life?
one_line_summary: Perception is a stack of narrow physical channels — camera, depth, radar, physiology, location, embedded motes — each with a structural blind spot, and what differs most is who infers behind it.
status: draft
display:
  mode: grid
project_ids:
  - nest-cam
  - oura-ring
  - microsoft-kinect
  - google-soli
  - microsoft-sensecam
  - active-badge-location-system
  - smart-dust-uc-berkeley
  - mediacup
  - smart-its
  - apple-watch
  - nintendo-wii
  - skinput
project_notes:
  nest-cam: "The camera channel at full richness: vision, audio, and motion streamed indoors, with proprietary face and scene inference behind the lens."
  oura-ring: "Physiology off the skin — optical pulse, temperature, and motion read from a finger, blind to the room but reading the body."
  microsoft-kinect: "Depth as a consumer sensor: infrared structured-light reconstructs a 3D skeleton from one fixed vantage, the breakthrough that cheapened depth perception."
  google-soli: "Radar that deliberately gives up the image — 60GHz mmWave reads presence and micro-gesture without ever forming a picture."
  microsoft-sensecam: "Sensing decides when to shoot: a neck-worn camera firing on light, heat, and motion shifts, not on command."
  active-badge-location-system: "The pure location channel — infrared badges pulse IDs to ceiling receivers so the building knows who's where, no camera."
  smart-dust-uc-berkeley: "Sensing pushed toward the invisible: a 1990s aim to bundle light, motion, and environmental sensors into scatterable cubic-millimeter motes."
  mediacup: "An everyday coffee cup with temperature and motion sensors inside — a 1999 bet that ordinary objects could report their own state."
  smart-its: "Postage-stamp sensor boards stuck onto any object, distributing motion and environmental telemetry across things before the smart home existed."
  apple-watch: "A multi-sensor suite on the wrist: optical heart rate, accelerometer, gyroscope, and barometer fused on-body, with trained models inferring activity and falls."
  nintendo-wii: "The device that mainstreamed inertial sensing — accelerometers plus an infrared pointer turning arm motion into the input channel itself."
  skinput: "Bio-acoustic sensing: turns the skin into a touch surface by reading the acoustic signatures a tap sends through bone and tissue."
---

Side by side, these nine show "perception" as a stack of narrow channels, each defined as much by what it refuses as by what it catches. The Nest Cam grabs rich vision and audio but only where it points; the Oura Ring reads physiology off a finger yet sees nothing of the room; Kinect pulls a 3D skeleton from one fixed vantage; and Soli gives up the image entirely, sensing presence and micro-gesture through radar to dodge the camera's privacy cost. Two channels rarely shown together round it out: the Active Badge fixes people by infrared ID with no picture, and Smart Dust pushes the same idea toward invisibility with scatterable motes. The sharper split, though, is who infers behind the sensor: MediaCup, Smart-Its, the Active Badge, and Smart Dust just stream raw state with no AI at all; SenseCam lets a crude light-and-motion trigger decide when to fire; and Nest Cam, Oura, Kinect, and Soli fold a trained model right behind the hardware — so one accelerometer trace becomes a capture cue, a sleep score, or a gesture depending on whose model is listening.
