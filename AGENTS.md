# AGENTS.md — Evolution des Lebens

## Role and purpose

You are working on **Learning Lab 04 — Evolution des Lebens**, an independent static educational website. Primary purpose: curiosity-driven personal learning, experimentation, and occasional public sharing through GitHub Pages. It is **not** a commercial product, not a reusable platform, and not a production SaaS.

The lab number is an **optional learning route**, never a software dependency or required sequence. Do not assume access to any central Learning Labs runtime or Space.

## Subject scope

Variation, Selektion, Drift, Vererbung, Artbildung, Stammbäume und Großereignisse in der Geschichte des Lebens.

### Guiding learner questions

- Wie unterscheiden sich Mutation, Selektion und genetische Drift?
- Wie ändern sich Genhäufigkeiten in Populationen?
- Was zeigen Stammbäume und ihre Unsicherheiten?
- Warum ist Evolution kein zielgerichteter Fortschrittsprozess?

### Six implemented interactive modules (V0.1)

- 01: `01_populationen.html` with `evolution-labs.js` — haploid biallelic Wright-Fisher model, selection, symmetric mutation, seeded binomial drift.
- 02: `02_artbildung.html` — two habitats, opposing selection, migration, drift. **No real speciation is simulated**.
- 03: `03_stammbaeume.html` — four taxa, three toy characters, Fitch-parsimony score over three unrooted quartets, homology/convergence quiz.
- 04: `04_baum_des_lebens.html` with `evolution-later.js` — conceptual LUCA, bacteria, archaea and eukaryote lineage with optional reticulation.
- 05: `05_uebergaenge.html` — five major biological transitions as approximate markers in Earth history and five comprehension questions.
- 06: `06_evidenz.html` — six original research cases with interactive interpretation checks.

## Scientific responsibility

Evolution ist kein lineares Fortschrittsnarrativ; LUCA ist nicht mit dem ersten Leben gleichzusetzen. Stammbäume sind evidenzbasierte Rekonstruktionen.

- Distinguish observation, evidence, hypotheses, models, estimates, and consensus.
- Cite factual scientific claims from traceable credible sources when adding content.
- Explicitly label simplifications, scale distortions, uncertain dates and model limitations.
- Never invent publications, citations, simulations, measurements, validations, or sources.
- Never present a conceptual placeholder as a functioning experiment.

## Pedagogy

- Do not assume prior school knowledge. Introduce each object before abbreviations or jargon.
- Prefer **observe → predict → interact → explain**, with useful feedback.
- Make controls meaningful, use a consistent legend, and provide explanations at increasing depth when helpful.
- Prefer clear interfaces to decorative animation. Pause and step through time-dependent processes.
- An experiment should expose a scientifically meaningful relationship, not just an effect.

## Design direction

Modern Objectivity, as documented in the provisional Apperception Machinery BrandBook:
- Quiet graphical UI stage; graphite, warm near-white, signal turquoise `#009E98`.
- Liberation Sans, Liberation Serif, Liberation Mono with fallbacks.
- Accessibility: responsive layout, keyboard operability, discernible focus, explanatory labels, reduced-motion support.
- Scientific illustration colors may differ from brand accents, but must communicate meaning and include legends.
- Avoid implying that an unfinished design guide is formally approved.

## Architecture

- Standalone static HTML/CSS/JavaScript website deployable with GitHub Pages.
- SVG, Canvas, Three.js allowed when materially helpful. Keep versioned third-party dependencies and their notices.
- No required backend, database, registration, analytics, build pipeline, or network access unless unavoidable and explained.
- No shared cross-repository runtime. Copy small design patterns when needed rather than coupling repositories.
- Keep `index.html` as entry point, `README.md` as public project description, and `LICENSE` intact.
- This repository is licensed under GNU GPL v2.0; track separately licensed content and dependencies.

## Working process

1. Inspect the current code and state of the exhibit before changing it.
2. Make focused changes aligned to the learner's question.
3. Verify internal links, JavaScript syntax, central interactions, and responsive rendering where tools permit.
4. State what was tested, what was not, and any scientific uncertainty.
5. Never claim a browser test or GitHub Pages deployment without evidence.
6. Keep docs accurate: planned exhibits are not implemented features.

## Modern Objectivity implementation

Use the **locally vendored** `modern-objectivity.css` (the v0.1 draft [practical style kit](https://philippklinz.github.io/modern-objectivity-style/), source SHA `c6af71a8688b9001313d19a642e8f308fa463280`). Preserve the vendor stylesheet as an exact copy; make stage-specific changes in the local page styles and prefer `--mo-*` semantic tokens. This is a reference style, **not a universal visual mandate**. Keep the standalone site functioning with no CDN dependencies. If upgrading the kit, compare behavior and update attribution/version notes.

## Binding model contracts and automated QA

- **Numerical models:** Maintain seeded PRNG determinism for identical inputs. Allele A fitness is 1+s vs a fitness 1, so selection maps p to p(1+s)/(1+p*s). Mutation maps p to p(1−μ)+(1−p)μ. Sample a binomial N haploid allele count. N is NOT effective population size for an empirical diploid system.
- **Two habitats:** use a simultaneous update from the **old** pair of frequencies after local selection and symmetrical migration m. Do not introduce update-order bias. No speciation threshold can be inferred from a two-allele model.
- **Phylogeny:** three deliberately artificial binary characters, four taxa, three unrooted quartet alternatives. Fitch scores must be computed, not hardcoded. A dolphin's streamlined shape compared to a shark is convergence, not evidence of mammalian ancestry in a shark.
- **Life tree:** LUCA is NOT the first organism. Horizontal gene transfer and bacterial mitochondrial ancestry complicate a tree. Branches and location are symbolic; no exact temporal coordinates.
- **Major transitions:** never claim one origin of multicellularity or an exact single date for eukaryogenesis, oxygenic photosynthesis, land plants or tetrapods. These are repeated or prolonged phenomena.
- **Evidence:** each challenge has exactly one factually supported answer. Keep links to cited primary papers; no invented publications or absolute interpretations.
- **Layout:** no horizontal-padding resets on `.ev-wrap`; section spacing uses vertical padding only. `grid-template-columns:minmax(0,...)`, `min-width:0`, responsive breakpoints. Never mask overflow globally.
- **Automated tests:** `tests/layout-check.mjs` (all 7 pages at 12 viewport widths) and `tests/interactions-check.mjs` (all six models) run in `.github/workflows/lab-04-checks.yml`. If CI is red, do not claim completion.
- Do not silently modify the vendored `modern-objectivity.css`, introduce tracking/network calls, or couple runtime to other Learning Lab repos.
- Scientific citation URLs and their experimental implications must be checked before extending source-derived claims. Playwright checks implementation only, **not** scientific truth.
