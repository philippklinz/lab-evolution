# LAB 04 – Evolution des Lebens · V0.1 / 22.11.2026

## Ziel

Von der populationsgenetischen Veränderung über Artbildung und Rekonstruktion verwandtschaftlicher Beziehungen bis zu großen Übergängen in der Geschichte des Lebens. **Evolution hat keinen Plan.**

## Bereits implementiert

| Modul | Leitfrage | Experiment | Modellgrenze |
|---|---|---|---|
| 01 · Populationen | Wie ändern sich Allelhäufigkeiten? | Selektion, Mutation und Drift, N 10–1000, Seed, Schritte bis Gen 100 | haploid, ein Genort, zwei Allele |
| 02 · Genfluss | Wie stark unterscheiden sich Populationen? | zwei Habitate, Migration 0–50 %, lokal unterschiedliche Selektion, Drift | keine berechnete Fortpflanzungsbarriere |
| 03 · Stammbäume | Welche Topologie ist plausibler? | drei Quartetttopologien mit Fitch-Zustandswechseln | 3 abstrahierte Merkmale, keine echte Genomphylogenie |
| 04 · LUCA | Wie ist das Leben verwandt? | auswählbare Gruppen, HGT/Symbiose als ergänzte Linien | keine exakte zeitlich datierte Rekonstruktion |
| 05 · Übergänge | Was ermöglicht neue Formen? | fünf Punkte auf linearer Zeitachse, fünf Fragen | Datierungen sind Orientierungswerte; lange, überlappende Prozesse |
| 06 · Evidenz | Was zeigen Studien tatsächlich? | sechs Primärarbeiten, evidenzbasierte Auswahlfragen | Interpretationsübung, keine experimentelle Reproduktion |

## Inhaltliche Architektur

- Modul 01–02: Zufallsmodelle mit reproduzierbaren Seeds; explizite Parameter und numerische Grenzfälle.
- Modul 03: Homologie vs. Konvergenz; die parsimonischste Antwort ist im Übungsset nicht automatisch die einzig mögliche Geschichte.
- Modul 04: LUCA, Bakterien/Archaeen/Eukaryoten und Vernetzung. Rekonstruktion ≠ direkt gemessene Geschichte.
- Modul 05: Sauerstoffanreicherung, Eukaryogenese, Vielzelligkeit, Landpflanzen, Tetrapoden; Übergänge sind keine vorgegebenen Schritte Richtung Mensch.
- Modul 06: Feldselektion, Langzeit-Evolution, Übergangsfossil, experimentelle Vielzelligkeit, Genomdaten, LUCA-Rekonstruktion.

## Quellen und Referenzen

Siehe die unterlaborspezifischen Referenzabschnitte und das README mit DOI-/Volltextlinks. Quellen sind **Referenzen**, keine fremden SVG-Arbeiten oder eingebetteten Paper-Volltexte.

## Künftige fachliche Vertiefung

1. Mehrere Allele/Loci, diploide Genetik, effektive Populationsgröße, Landschaften mit räumlichem Genfluss; validierte Empiriedatensätze.
2. Gemessene Mikroevolutionsdaten (Finken, Mikroben), Szenariovergleich mit dokumentierten Parametern.
3. Erweiterter phylogenetischer Datensatz, Character Mapping, Konfidenz, Stammbäume mit taxonomisch und zeitlich recherchierten Metadaten.
4. Netzwerkdarstellungen bei tiefen Lebenslinien, statt eine einfache Schere als vollständige LUCA-Geschichte auszugeben.
5. Große Übergänge mit Unsicherheitsintervallen und quellenbasierten geologischen Datierungen.
6. Wissenschaftliche Fachreview und Benutzerbeobachtung der didaktischen Experimente.

## Technische Abnahme

Automatisierte Chromium-Tests für sieben Seiten bei zwölf Viewports plus sechs Interaktions- und Berechnungsprüfungen. Scripts und CI im Repository. `index.html` ist Portal und alle sechs Unterlabore sind statisch direkt aufrufbar, ohne Login oder Backend.
