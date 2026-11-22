# Evolution des Lebens — Learning Lab 04

> Wie entstehen Vielfalt, Anpassung und gemeinsame Abstammung?

**Status: Konzept / Grundgerüst.** Interaktive Experimente sind hier noch nicht implementiert. Dieses Repository ist eine eigenständige, öffentlich teilbare Lernumgebung und wird unabhängig von den anderen Learning Labs entwickelt.

## Warum dieses Labor?

Variation, Selektion, Drift, Vererbung, Artbildung, Stammbäume und Großereignisse in der Geschichte des Lebens.

### Leitfragen

- Wie unterscheiden sich Mutation, Selektion und genetische Drift?
- Wie ändern sich Genhäufigkeiten in Populationen?
- Was zeigen Stammbäume und ihre Unsicherheiten?
- Warum ist Evolution kein zielgerichteter Fortschrittsprozess?

### Geplante Lernstationen

- Interaktive Populationssimulation mit veränderbaren Bedingungen
- Stammbaum-Explorer mit Zeitmaßstab
- Vergleich von Homologie und konvergenter Evolution

## Wissenschaftliche Sorgfalt

Evolution ist kein lineares Fortschrittsnarrativ; LUCA ist nicht mit dem ersten Leben gleichzusetzen. Stammbäume sind evidenzbasierte Rekonstruktionen.

Unser didaktisches Ziel: **beobachten → vermuten → experimentieren → erklären**. Wir trennen Modelle und Vereinfachungen von Messdaten, Belegen und offenen Hypothesen. Ein Einstieg ohne Vorwissen ist ausdrücklich vorgesehen.

## Nutzung und Technik

Die [Startseite](index.html) ist eine eigenständige HTML-Datei und kann direkt im Browser geöffnet oder über GitHub Pages veröffentlicht werden.

- Statisches HTML, CSS und JavaScript; bei Bedarf SVG, Canvas oder Three.js.
- Keine zentrale Plattform, Datenbank, Registrierung oder Build-Pflicht.
- Alle künftigen Lernstationen sind innerhalb **dieses Repositories** lauffähig.
- Verweise auf andere Labore sind optional, nicht für die Funktion notwendig.
- Gestalterische Richtung: **Modern Objectivity** (Arbeitsfassung), Graphit, warmes Off-White, Signal-Türkis `#009E98`.

## Entwicklung

Siehe [AGENTS.md](AGENTS.md) für Aufgaben, Designgrundsätze, Prüfpunkte und wissenschaftliche Leitplanken.

## Lizenz

[GNU General Public License v2.0](LICENSE) (GPL-2.0-only). Abweichende Lizenzen hinzugefügter Bibliotheken oder fremder Inhalte sind getrennt zu beachten.

## Modern Objectivity style kit

Die Gestaltung nutzt eine **lokale, unveränderte Kopie** des [Modern Objectivity Style Kits v0.1 (Draft)](https://philippklinz.github.io/modern-objectivity-style/) aus [`styles/modern-objectivity.css`](https://github.com/philippklinz/modern-objectivity-style/blob/main/styles/modern-objectivity.css), Quellstand `c6af71a8688b9001313d19a642e8f308fa463280` (GPL-2.0-only). Die eigenständige HTML-Seite definiert ihre spezifische Bühne über die semantischen `--mo-*`-Tokens. Keine externe Runtime oder CDN erforderlich.
