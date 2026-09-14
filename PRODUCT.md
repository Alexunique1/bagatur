# Product

<!-- impeccable:product-schema 1 -->

## Platform

Responsive marketing website built with Nuxt 3 and prepared for static deployment. The public presentation is a complete replacement, not a refinement of the previous landing page.

## Users

Primary users are parents in Burgas choosing a safe, disciplined and credible Brazilian Jiu-Jitsu academy for children. Secondary users are teenagers and adults looking for structured BJJ training.

## Product Purpose

Bagatur BJJ Burgas must make parents want to trust the academy with their child, understand the available age groups and schedule, see the trainer's credibility and students' results, and call the trainer to arrange a trial class.

## Primary Action

Every primary trial-class action opens a direct telephone call to the trainer at `+359877069665`.

## Positioning

Bagatur presents Brazilian Jiu-Jitsu as a structured system for technique, discipline, confidence, emotional resilience, teamwork and calm behaviour under pressure. Trust and safe coaching lead; intensity is supporting evidence.

## Approved Structure

The approved composition is the second “Training Hall” direction. Ryan Thomas BJJ remains a structural donor only: strong opening offer, trust signals, programs, trainer authority, schedule, proof, FAQ, location and final call. Bagatur uses its own visual identity, content and evidence. FAQ appears only in the lower page and is not a header item; Gallery replaces it in navigation.

## Programs and Schedule

- Children 4-7: Tuesday and Thursday 17:30-19:00; Sunday 10:00-11:50.
- Children 8-14: Monday, Wednesday and Friday 17:30-19:00; Sunday 12:00-14:00.
- Adults 14+: Monday-Friday 19:00-20:30.
- Saturday currently has no listed classes.

## Location and Contact

Public map: `https://maps.app.goo.gl/jE1vA2DjmftxqdyY7`. Public address: 2 Odrin Street, Burgas 8000. The phone is `+359877069665`. Facebook, Instagram and YouTube links are not shown.

## Localization

Bulgarian is the source language and default locale. Russian and English are complete secondary locales. Navigation, page content, schedule, FAQ, contacts, metadata and structured data are localized. The locale switch sits to the right of the call action and remains available in the mobile menu.

## Content Management

News, gallery content and competition results are modeled separately from page code. Gallery photographs belong to one of four public categories—academy training, tournaments and competitions, kids training, or adult training—and each category has its own public page. The trainer-facing editor at `/admin` uses a self-hosted PocketBase instance on the production VDS with username/password authentication, API rules, SQLite data and local file storage. Published content is public; creation, editing and deletion require the `content_admin` role. Competition results store the event name, location, date and gold, silver and bronze medal counts. The homepage presents the ten most recent competitions as a manually controlled carousel; the Achievements navigation item opens a complete reverse-chronological archive at /achievements/. Public content falls back to honest demo placeholders when the CMS is unavailable.

## Evidence Boundaries

The trainer narrative and the general claims about Yordan Petrov's team were supplied by the project owner on 2026-09-13. Individual competition names, dates and medal counts are published only from trainer-entered CMS records. Testimonials, named awards, prices and any additional credentials remain placeholders until supplied.

## Brand Commitments

`Logo_main.jpg` is the only current logo. It replaces the previous logo everywhere. Its charcoal black, aged gold/bronze and deep red define the brand family. The artwork is treated as a detailed crest; compact use is cropped carefully without inventing another logo.

## Photography

Real academy photography is pending. Temporary documentary images are allowed during build but must be replaceable through the content layer and may not imply real trainer or student identities. CMS guidance requests 1600 × 900 px (16:9) for news and competition material, and 1600 × 1200 px (4:3) for gallery photography with important subjects kept inside the central 70% safe area.

## Product Principles

- Lead with parental trust before competitive intensity.
- Make a phone call to the trainer the clearest action on every device.
- Prove credibility with verified trainer and student achievements.
- Make the weekly schedule immediately understandable on mobile.
- Keep Bulgarian as the content source of truth.
- Never fabricate statistics, testimonials, awards, prices or credentials.

## Accessibility and Delivery

The site is mobile-first, keyboard navigable, high contrast, respectful of reduced motion, SEO-ready and suitable for static deployment. Telephone and map links work without JavaScript. A temporary OVH VPS preview may be deployed in an isolated path after production verification and with a rollback plan.
