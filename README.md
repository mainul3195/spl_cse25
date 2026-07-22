# Structured Programming Language — C Learning Path

A single-page curriculum reference for teaching and learning C.

## Structure

- `index.html` — the complete learning path with contextual tutorial links
- `styles.css` — styling
- `script.js` — search and expand/collapse interaction
- `site-meta.js` — shared version number, update date, and author signature
- `curriculum.json` — structured source data for the topic pipeline
- `updates.html` — student-facing version history and change log
- `tutorials/index.html` — the tutorial library shown before opening a lesson
- `tutorials/` — complete lesson pages opened from the library or related curriculum topics

## Usage

Open `index.html` in a web browser. The Tutorials navigation opens the tutorial library, where learners can choose a lesson. Click any major curriculum topic to expand its granular topic list and Schaum reference; linked topic names and practice questions still open the relevant section directly.

The tutorial library currently includes lessons on nested logic and loop-based pattern printing; formatted input and output; and detailed array and string fundamentals taught through indexes, memory layouts, traversal, null termination, and length versus size.

## Versioning

The current public release is `1.2.0`, maintained by Mainul Hasan. Update `site-meta.js` whenever a release is published, then add the matching entry to `updates.html` so students can see what changed.

- Major version — course-structure changes
- Minor version — new topics or tutorials
- Patch version — corrections and improvements to existing material
