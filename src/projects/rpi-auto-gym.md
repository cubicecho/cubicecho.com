---
title: rpi-auto-gym
tagline: A wall-mounted workout tracker on a Raspberry Pi.
status: alpha
version: v0.1.0
order: 2
repo: https://github.com/vantreeseba/rpi-auto-gym
---

Point a Raspberry Pi camera at yourself and rpi-auto-gym detects your
exercises, counts reps and sets, and displays live feedback on a
wall-mounted screen. Pose estimation runs on CPU via MediaPipe, with
optional hardware acceleration via Google Coral TPU or the Hailo AI Hat+.

Everything runs locally — no cloud, no account, no database. v1 ships with
squats, push-ups, and jumping jacks; session state lives in memory for the
duration of the workout and is discarded when the app exits.

Built in Python 3.12 with tkinter for the UI and a backend-agnostic pose
abstraction so a Pi 4 on CPU and a Pi 5 with the AI Hat+ run the same app.
