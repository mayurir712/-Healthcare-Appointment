# AI Collaboration Log

## 1. AI Tools Used
- ChatGPT via Cursor (coding agent)

## 2. Conversation Log / Prompt History
Summaries of the most relevant exchanges:
- **Prompt:** “Please create small basic topics of angular 17 app…” → *AI scaffolded an Angular project; later replaced with the React/Tailwind healthcare portal when requirements changed.*
- **Prompt:** “Create healthcare website using react-vite and tailwind css…Doctor List Page, filters, detail page, booking modal, appointments page.” → *AI generated Vite/Tailwind setup, routing, context provider, doctor data, components, and styles implementing all requested features.*
- **Prompt:** “Include AI feature…Ask AI if this doctor is a good match…No backend required.” → *AI added rule-based symptom matcher, UI controls, and recommendation messaging on the doctor detail page.*
- **Prompt:** “Persisting to localStorage = bonus” → *AI updated the DoctorsProvider to hydrate/persist appointments from/to `localStorage`.*
- **Prompt:** “Need symptom examples & AI collaboration log deliverables” → *AI added the sample symptom table on the detail page and created this log.*

## 3. Reflection
- **Most helpful:** Rapid scaffolding of React components, Tailwind styles, routing, and context logic; also useful for drafting the AI recommendation feature and persistence helpers.
- **Incorrect or adjusted AI code:** Early Tailwind install defaulted to v4 (no CLI); downgraded to v3.4.14 manually. Added manual fallback for `crypto.randomUUID` and ensured type-only imports to satisfy TypeScript `verbatimModuleSyntax`.
- **Suggestions not used:** No significant features were discarded, but certain generated boilerplate (e.g., Angular app) was replaced once the React requirement was clarified.

