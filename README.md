# Evolution des Lebens — Learning Lab 04

> Evolution hat keinen Plan. Wie entstehen Vielfalt, Anpassung und gemeinsame Abstammung?

**Stand:** sechs interaktive Unterlabore als V0.1-Lernmodelle. [GitHub Pages](https://philippklinz.github.io/lab-evolution/).

## Alle Unterlabore

| Modul | Interaktive Frage | Experiment |
| --- | --- | --- |
| 01 · [Populationen, Selektion und Drift](01_populationen.html) | Wie verändert sich die Häufigkeit eines Allels? | Haploide, zweiallelische Wright-Fisher-Lehrsimulation mit Populationsgröße, Selektion, symmetrischer Mutation und reproduzierbarem Zufalls-Seed. 100 Generationen, Einzel- oder 20er-Schritte und Verständnisfrage. |
| 02 · [Genfluss und Artbildung](02_artbildung.html) | Wann unterscheiden sich Populationen genetisch? | Zwei Habitate mit entgegengesetzter lokaler Selektion, Migration und Zufallsstichproben. Frequenzdiagramm plus Quiz. **Unterschiedliche Allelfrequenzen sind keine Artdefinition.** |
| 03 · [Stammbäume und Homologie](03_stammbaeume.html) | Welche Gruppierung erklären Merkmale am einfachsten? | Drei ungerichtete Quartetttopologien, eine dreizeilige binäre Toy-Merkmalsmatrix, Fitch-Parsimony-Berechnung, Homologie/Konvergenz-Aufgabe. |
| 04 · [LUCA und Baum des Lebens](04_baum_des_lebens.html) | Was bedeutet der letzte gemeinsame Vorfahr? | Vier auswählbare Knoten, schematische Verzweigung mit optionalen Gen-/Symbiosebeziehungen und LUCA-Verständnisfrage. |
| 05 · [Große biologische Übergänge](05_uebergaenge.html) | Welche Neuerungen verändern Lebensmöglichkeiten? | Fünf auswählbare Übergänge auf einer linearen, ausdrücklich ungenauen geologischen Zeitleiste, symbolische Grafiken, fünf aktive Fragen. |
| 06 · [Evolution belegen](06_evidenz.html) | Was beweisen Fossilien, Feld- und Laborexperimente? | Sechs veröffentlichte Forschungsbeispiele, je drei Aussagen und erläuterndes Feedback, Primärquellen und Neustart. |

Alle Unterlabore sind ohne vorherigen Lernstand zugänglich. Ihre Reihenfolge ist eine **didaktische Empfehlung**, kein historischer Verlauf und keine technische Abhängigkeit.

## Wissenschaftliche Definitionen und Grenzen

- **Evolution** bedeutet Veränderung vererbbarer Merkmale bzw. Allelfrequenzen von Populationen über Generationen, keine planvolle Bewegung zu „höheren“ Lebewesen.
- **Mutation** ist keine zielgerichtete Antwort auf ein Bedürfnis. Im Populationsmodell gilt die symmetrische Modellrate μ für A ↔ a; ein Fitnesskoeffizient s verändert den erwarteten Fortpflanzungserfolg von A relativ zu a.
- **Drift** wird ausdrücklich über eine **Binomialstichprobe** pro Generation ermittelt. N bezeichnet haploide Modellindividuen, nicht einen empirisch gemessenen Bestand oder die effektive Größe einer realen diploiden Population.
- **Populationsmodell:** `p_sel = p(1+s)/(1+p s)`, `p_mut = p_sel(1−μ)+(1−p_sel)μ`, anschließend `A_next ~ Binomial(N,p_mut)`. Initialwerte werden bei Kontrolländerung zurückgesetzt; Seed und Parameter reproduzieren dieselbe Folge. Keine räumliche Struktur oder sexuelle Rekombination.
- **Genflussmodell:** Zwei Populationen beginnen bei p_A=.2 und p_B=.8; lokale Selektion begünstigt A im ersten Habitat, a im zweiten; nach einem symmetrischen Migrantenanteil m erfolgt je eine Binomialstichprobe. Das Modell simuliert **keine tatsächlichen Artgrenzen**, Paarungsbarrieren oder genomweite Divergenz.
- **Parsimony:** Das Quartetttestset Kuh/Delfin/Hai/Lachs enthält nur drei absichtlich vereinfachte binäre Merkmale: Milchdrüsen, Lungenatmung und Stromlinienform. Die minimale Zustandswechselzahl mit Fitch-Parsimony ist ein **Lernwert**, kein statistisch abgesicherter realer Artstammbaum. Die Ähnlichkeit von Delfin und Hai in der Stromlinienform zeigt **Konvergenz**.
- **LUCA** (last universal common ancestor) ist der rekonstruierte gemeinsame Abstammungsbezug der heutigen zellulären Linien, weder die erste Zelle noch ein einzelnes gefundenes Fossil. Ein Modell (Moody et al., 2024) schätzt etwa 4,2 Milliarden Jahre; Zeitwerte sind unsicher und modellabhängig.
- **Große Übergänge:** Die Sauerstoffanreicherung, eukaryotische Zellen, mehrfach entstandene Vielzelligkeit und Landgänge sind langfristige und teils unabhängige Prozesse. Die fünf Zeitmarkierungen sind Orientierungspunkte, **keine wissenschaftlich gesicherten punktförmigen Erstereignisse**.
- **Evidenztrainer:** Primärforschung wird paraphrasiert und kontextualisiert. Ein einzelner Befund erklärt nicht die gesamte Evolutionsgeschichte.

## Verwendete wissenschaftliche Quellen

- UC Berkeley, *Evolution 101*: https://evolution.berkeley.edu/evolution-101/
- Natural History Museum, *Convergent evolution*: https://www.nhm.ac.uk/discover/convergent-evolution.html
- Price et al. (1984), selection in Darwin's finches: https://www.nature.com/articles/309787a0
- Blount, Borland & Lenski (2008), historical contingency of citrate use in E. coli: https://doi.org/10.1073/pnas.0803151105
- Shubin, Daeschler & Jenkins (2006), Tiktaalik fin and early tetrapod limb: https://doi.org/10.1038/nature04637
- Ratcliff et al. (2012), experimental evolution of multicellularity: https://doi.org/10.1073/pnas.1115323109
- Lamichhaney et al. (2015), Darwin's finch genomes, gene flow and beak shape: https://www.nature.com/articles/nature14181
- Moody et al. (2024), inferred LUCA properties and age: https://www.nature.com/articles/s41559-024-02461-1
- Vosseberg et al. (2024), early eukaryote evolution: https://www.nature.com/articles/s41586-024-07677-6
- Major Biological Innovations in Earth history (2024): https://pmc.ncbi.nlm.nih.gov/articles/PMC11071111/
- Bozdag et al. (2026), evolution of multicellularity: https://www.nature.com/articles/s41586-026-11038-w

Die Quelle einer Aussage steht zusätzlich im jeweiligen Unterlabor. Eigene Diagramme sind keine Originalfotos oder echten Messdaten.

## Technik und Qualitätssicherung

- **Standalone** GitHub Pages, statisches HTML/CSS/JavaScript, **kein Login, keine Telemetrie, kein Backend, kein Laufzeit-CDN**.
- Lokal vendortes `modern-objectivity.css` (GPL-2.0-only; Quell-Blob `c6af71a8688b9001313d19a642e8f308fa463280`), laborspezifisches `evolution.css`.
- `evolution-labs.js`: Modelle 01–03; `evolution-later.js`: Module 04–06.
- **Browser-QA**: `tests/layout-check.mjs` prüft alle sieben HTML-Seiten mit zwölf Viewports zwischen 320 und 1600 px. `tests/interactions-check.mjs` prüft Kernfunktionen und Grenzwerte aller sechs Module. GitHub-Workflow: [Evolution laboratory browser checks](https://github.com/philippklinz/lab-evolution/actions/workflows/lab-04-checks.yml).
- Beide Testdateien verwenden Playwright **nur im CI**, kein Paket benötigt für Besucher. Tests ersetzen keine tiefergehende wissenschaftliche Begutachtung.
- Eigene Inhalte und Quellcode unter [GPL v2.0 only](LICENSE), wissenschaftliche Publikationen sind nur verlinkt.

## Weitere Entwicklung

Siehe [AGENTS.md](AGENTS.md) für verbindliche Spielregeln. Weiterer Ausbau kann populationsgenetische Diploidie, mehrere Loci, empirische Daten, datierte phylogenetische Stammbäume und differenzierte geologische Unsicherheitsintervalle behandeln, aber erst nach fachlicher Quellenprüfung.
