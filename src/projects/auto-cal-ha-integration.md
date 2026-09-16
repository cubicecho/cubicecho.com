---
title: auto-cal-ha-integration
tagline: Auto Cal's schedule and todo lists as Home Assistant entities.
category: cloud
order: 9
repo: https://github.com/cubicecho/auto_cal_ha_integration
---

A [Home Assistant](https://www.home-assistant.io/) integration for
[auto-cal](/projects/auto-cal/). It adds two `calendar` entities — Schedule
(what is scheduled) and Time Blocks (your recurring blocks) — from auto-cal's
iCal feed, and one `todo` entity per auto-cal list from its GraphQL API.

Which means the schedule is available to automations: an announcement before
the block starts, a light that changes for focus time, a reminder that fires
only when the todo is still open.

Stack: Python, the Home Assistant integration API.
