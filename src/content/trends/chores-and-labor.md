---
title: "Chores & physical labor"
kind: use_case
horizon: next
status: published
summary: "Physical AI is moving from the single-task robot vacuum in the hallway toward general-purpose humanoids — and capital is pouring in faster than the robots can ship."
updated: 2026-06-01
related_project_ids:
  - irobot-roomba
  - roborock
  - ecovacs-deebot
  - husqvarna-automower
  - figure-02
  - tesla-optimus
  - physical-intelligence-pi-zero
  - samsung-bot-handy
  - hello-robot-stretch
  - boston-dynamics-atlas
growth:
  label: "Humanoid robot shipments (Goldman base case)"
  unit: "M units/yr"
  caption: "Goldman Sachs forecast; near-term volume almost all industrial."
  points:
    - { year: 2030, value: 0.25, projected: true }
    - { year: 2035, value: 1.4, projected: true }
audience:
  customers:
    - "Warehouse & logistics operators"
    - "Manufacturers & factories"
    - "Households (premium early adopters)"
    - "Facilities & cleaning services"
    - "Robotics platform developers"
  personas:
    - name: "The warehouse ops manager"
      description: "Faces chronic labor shortages; needs reliable pick-and-move hours and cares about uptime and ROI."
    - name: "The dual-income household"
      description: "Already owns a robovac; would pay for laundry/dishes help if it actually works reliably."
    - name: "The factory automation lead"
      description: "Wants flexible humanoids that slot into existing lines without expensive re-tooling."
use_cases:
  - title: "Floor cleaning (mature)"
    description: "Robot vacuums and mops — the one home chore already won at scale."
  - title: "Lawn & outdoor maintenance"
    description: "Autonomous mowers handling recurring yard work."
  - title: "Warehouse pick-and-place & material handling"
    description: "Humanoids in structured industrial environments (factory-first deployment)."
  - title: "General home chores (aspirational)"
    description: "Laundry folding, tidying, and dishes via VLA-driven humanoids — not yet reliable."
  - title: "Single-task home appliances"
    description: "Narrow robots that do one chore cheaply and dependably."
sources:
  - source_id: goldman-humanoids-2024
    title: "The global market for humanoid robots could reach $38 billion by 2035"
    url: "https://www.goldmansachs.com/insights/articles/the-global-market-for-robots-could-reach-38-billion-by-2035"
    publisher: "Goldman Sachs"
    year: 2024
    source_type: credible_news
  - source_id: trr-figure-seriesc-2025
    title: "Figure AI passes $1B with Series C funding toward humanoid robot development"
    url: "https://www.therobotreport.com/figure-ai-raises-1b-in-series-c-funding-toward-humanoid-robot-development/"
    publisher: "The Robot Report"
    year: 2025
    source_type: credible_news
  - source_id: trr-pi-600m-2025
    title: "Physical Intelligence raises $600M to advance robot foundation models"
    url: "https://www.therobotreport.com/physical-intelligence-raises-600m-advance-robot-foundation-models/"
    publisher: "The Robot Report"
    year: 2025
    source_type: credible_news
  - source_id: pi-pi0-2025
    title: "π0 and π0-FAST: Vision-Language-Action Models for General Robot Control"
    url: "https://huggingface.co/blog/pi0"
    publisher: "Hugging Face / Physical Intelligence"
    year: 2025
    source_type: official_blog_post
  - source_id: gminsights-robovac-2025
    title: "Robotic Vacuum Cleaner Market Size, Statistics Report 2026-2035"
    url: "https://www.gminsights.com/industry-analysis/robotic-vacuum-cleaner-market"
    publisher: "GM Insights"
    year: 2025
    source_type: credible_news
  - source_id: fmi-robovac-2025
    title: "Robotic Vacuum Cleaners Market Size 2025 to 2035"
    url: "https://www.futuremarketinsights.com/reports/robotic-vacuum-cleaners-market"
    publisher: "Future Market Insights"
    year: 2025
    source_type: credible_news
confidence: high
---

The segment is anchored by one mature category — the robot vacuum, already a **$9–12 billion** business growing ~15%/yr (Source: GM Insights / Future Market Insights, 2025) — and one speculative one: the general-purpose humanoid. Goldman Sachs raised its humanoid TAM sixfold to **$38 billion by 2035**, with most near-term volume industrial (Source: Goldman Sachs, 2024). What's new is the software layer: vision-language-action models now let one learned policy drive many tasks, and capital has followed — Physical Intelligence's π0 raised **$600M** and Figure AI closed a **$1B+ Series C** (Source: The Robot Report, 2025).

The open questions are about sequencing, not whether the demos work. Near-term volume lands in factories and warehouses, not homes — structured environments are easier than an unstructured kitchen. So the live debates are general-purpose humanoid vs. cheap single-task appliance (the Roomba already won the home on the latter logic), factory-first vs. home-first, and whether demos generalize at acceptable cost and safety.
