---
category: Intelligence
subcategory: Multi-Agent
title: Multi-Agent
card_question: How is intelligence distributed across multiple devices, robots, or services?
one_line_summary: How agency is split across a coordination layer of phones, speakers, sensors, lights, and services — which device senses, which decides, and which acts.
status: draft
display:
  mode: grid
project_ids:
  - samsung-smartthings
  - home-assistant
  - matter-smart-home
  - ifttt
  - x10-home-automation
  - amazon-echo-alexa
  - google-assistant
  - apple-siri
  - cordyceps
  - things-that-think
  - zooids
project_notes:
  samsung-smartthings: "A brokered division of labor: motion and leak sensors sense, the hub or cloud decides via rules, and bulbs, valves, and appliances act."
  home-assistant: "Same sensor-hub-actuator split, but the deciding agent runs locally on a box in the closet, with an on-device voice assistant doing the speaking."
  matter-smart-home: "Not an agent itself but the shared fabric letting rival ecosystems even speak, so one deciding mind can sense and actuate devices from any brand."
  ifttt: "Strips multi-agent coordination to its bones: one service's trigger senses, the 'if this then that' rule decides, another service acts."
  x10-home-automation: "The 1970s ancestor of distributed home intelligence: a central console decides and modules on the powerline act, with no sensing or deciding of their own."
  amazon-echo-alexa: "The speaker senses speech and speaks back, but the deciding agent lives in Amazon's cloud, treating multi-room Echoes as ears and mouths."
  google-assistant: "One cloud mind distributed across phone, watch, speaker, and display, each device a sensing-and-speaking limb that broadcasts and acts on the body's behalf."
  apple-siri: "The vendor cloud decides while HomePods and iPhones sense and speak; Shortcuts lets the user stitch the acting devices into chained routines."
  cordyceps: "The card's purest case: a mirror, lamp, and radio each sense, confer as coordinated LLM agents, and act through their own form with no central voice."
  things-that-think: "The founding 1995 vision of intelligence dissolved into objects, where shoes, doorknobs, and badges each sense and relay to one another."
  zooids: "A swarm of tabletop micro-robots negotiating a shared shape with no central voice, each tiny body sensing touch and acting as one physical pixel."
---

These projects show that "multi-agent" at home is almost never one mind but a brokered division of labor — and they disagree on who holds the broker. The commercial assistants (Alexa across multi-room speakers, Google Assistant spread over phone-watch-speaker, Siri stitching devices via Shortcuts) keep the deciding agent in a vendor cloud and treat the rest of the house as limbs, while the coordination platforms expose the seam: SmartThings and Home Assistant make the rules themselves the agent (a sensor senses, a hub decides, a bulb acts), IFTTT reduces it to service-to-service "if this then that," and Matter is the late attempt to let rival ecosystems even speak — a lineage running back to X10's 1970s powerline signaling, when "distributed intelligence" was a few bits down the mains. The AI-embedded split is the real tension: nearly all of these are ai:unknown thin-clients leaning on remote models, so the genuinely multi-agent intelligence appears only at the edges — Cordyceps, the one record tagged with explicit coordinated-multi-agent LLM coordination, imagines a houseful of conversing objects, and Zooids' swarm of tabletop robots is the precedent for many small bodies negotiating a shared goal with no central voice at all.
