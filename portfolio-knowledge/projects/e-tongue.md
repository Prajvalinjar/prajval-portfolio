---
title: "E-Tongue"
type: "AI-assisted Ayurvedic Classification"
techStack: ["Python", "ESP32", "IoT Sensors", "Scikit-learn"]
liveDemo: "https://e-tongue.vercel.app"
github: "https://github.com/Prajvalinjar/e-tongue"
---

## Short Summary
E-Tongue is an intelligent hardware prototype that uses sensor fusion and machine learning to objectively classify Ayurvedic liquids and Dravyas.

## Architecture
Consists of analog sensors wired to an ESP32 microcontroller running firmware that sends moving-average filtered signals to a Python Scikit-learn Random Forest model.

## Engineering Challenges
Calibrating sensors against drift over time and shielding analog inputs from ambient electronic noise.

## Key Features
- Multi-Sensor Array Data Capture
- Moving-Average Noise Filtration
- Random Forest ML Classification
