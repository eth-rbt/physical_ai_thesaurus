---
category: Function
subcategory: Context Type Used
title: Context Type Used
card_question: What kind of context does the interaction rely on — spatial, activity, social, emotional, physiological?
one_line_summary: The kind of context a system reads to act — spatial maps, objects in view, physiological signals, occupancy and time, presence, and the sensitive social and emotional cues at the doorway and in the room.
status: draft
display:
  mode: grid
project_ids:
  - irobot-roomba
  - google-lens
  - rayban-meta-smart-glasses
  - apple-watch
  - oura-ring
  - nest-learning-thermostat
  - google-now
  - google-soli
  - mediacup
  - ring-doorbell
  - elliq
project_notes:
  irobot-roomba: "Spatial context — builds and reasons over a map of the floor, where furniture and walls are, what it has already cleaned."
  google-lens: "Object and text context — points the camera at a thing and the whole interaction hinges on recognizing what it is and what it says."
  rayban-meta-smart-glasses: "Visual object context from your exact line of sight — the assistant answers about whatever is in front of your face."
  apple-watch: "Physiological context — heart rate, motion, and on-body sensors tell it you are exercising, fallen, or stressed."
  oura-ring: "Physiological context narrowed to sleep and recovery — reads the body overnight to infer readiness for the day."
  nest-learning-thermostat: "Temporal and occupancy context — learns the daily schedule and senses whether anyone is home before it acts."
  google-now: "Historical and digital context — mines your location history, mail, and calendar to push a card before you ask."
  google-soli: "Presence context — radar that senses a hand or body approaching, the bare environmental cue that someone is there."
  mediacup: "Activity context, the 1999 precursor — a coffee cup whose temperature and motion betray whether it is in use, idle, or being carried."
  ring-doorbell: "Doorway and bystander context — the most socially loaded reading here, classifying who is at the threshold and recording passers-by."
  elliq: "Routine, social, and emotional context — tracks an older adult's day and mood to decide when to check in, the most sensitive cue of all."
---

Read across these, the card's claim holds: the same word "context" hides wildly different things to sense and wildly different stakes. Spatial and object context are largely instrumental — Roomba's floor map, Google Lens and Ray-Ban Meta naming what is in view — and the body-reading layer (Apple Watch, Oura) is intimate but consensual, while the physical precursor MediaCup shows how cheaply activity could be inferred from a cup's temperature long before AI. The split by AI embedding is telling: occupancy, time, and presence were read by rule-based or non-AI sensing (Nest learning a schedule, Soli's radar, MediaCup), whereas the riskiest context types lean on heavier inference — Google Now mining your history and mail, and the genuinely sensitive cases, Ring classifying strangers at the threshold and ElliQ reading an older adult's routine and mood, where the context being sensed is other people and feelings rather than walls.
