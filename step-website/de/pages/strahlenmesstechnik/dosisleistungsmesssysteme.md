DLMon/RMon
-----------

# Intelligente Dosis- und Dosisleistungsmessung

![](../media/img/dlmonsymb.jpg)

Intelligentes Messsystem zur Erfassung und Anzeige von Dosis und Dosisleistung für medizinische und allgemeine Anwendungen mit PC-Auswertung der erfassten Daten.

Geeignet zur Überwachung von Patienten in der nuklearmedizinischen Radio-Jod-Therapie, zur Raum- und Prozessüberwachung von Laboratorien und Kernkraftwerken sowie allgemeine Überwachungsfunktionen bei der Herstellung von Radionukliden u.ä.

Verschiedene busfähige Komponenten (max. 255) können zu einem universellen, kundenspezifischen Messsystem zusammengestellt werden. Die Auswerte-Software basiert auf der Grundlage des modernen Client-Server-Konzepts und ermöglicht somit die schnelle Einarbeitung spezieller Kundenwünsche bzgl. der Darstellung und Auswertung der erfassten Messdaten.

[Prospekt DLMon/RMon - PDF 306KB](../media/pdf/DLMon%20RMon%20Prospekt%20DE%2004-2014.pdf)
[Software-Kurzbeschreibung - PDF 1,1MB](../media/pdf/step_dlmon_skb_dlmon_software_kurzbeschreibung.pdf)
[Software-Beschreibung - PDF 4,6MB](../media/pdf/step_dlmon_sb_softwarebeschreibung_dlmon__v5.7.0.pdf)

#### Komponenten

*	Intelligenter, busfähiger Detektor mit eigenem Mikrocontroller
*	Intelligente, busfähige Einzel- und Doppelanzeige mit eigenem Mikrocontroller und einstellbaren Schwellwerten, inkl. Alarmfunktion
*	Intelligente, busfähige Großanzeigen mit Sonderfunktionen
*	Zentraler PC-Auswerteplatz mit Drucker, USV und RS-485-Interface 
*	Client-Server-Software unter Windows NT, 2000, XP 
*	Speicherung aller Daten in MS-SQL-Datenbank

---

### Komponente: Intelligente Sonde SON 16

Busfähiger Detektor mit eigenem Mikrocontroller

![](../media/img/son16.gif)

*	**Messgröße:** Photonenäquivalent-Dosisleistung bzw.Umgebungsäquivalent-Dosisleistung
*	**Detektor:** Geiger-Müller-Zählrohr / Typ 70004
*	**Messbereich:** 0,1 µSv/h* ... 500 µSv/h \*(Messzeit 200 s, Messunsicherheit < 3 %)
*	**Energiebereich:**	35 keV ... 1,3 MeV
*	**Kollimator:**	Material: Blei
	Öffnungswinkel: ± 30°

#### Elektronik
*	interner Mikrocontroller mit internem Speicher
*	128-kByte-FLASH-EEPROM
*	Datenübertragung per RS-485-Schnittstelle
*	interne Berechnung der Aktivität pro Volumen aus der Impulsrate
*	Korrektur der Totzeit und des Nulleffektes
*	Messwertspeicherung (max. 9088) mit Datum und Uhrzeit in einem nicht flüchtigen, zyklischen Speicher, auch bei Ausfall des PC
*	Messzeit und Messzyklen frei wählbar
*	Messzeit und Messzyklen frei wählbar
*	Selbstüberwachung aller externen und internen Betriebsspannungen, der Funktionsfähigkeit des Detektors, der Schnittstelle und der Speicher

---

### Komponente: Intelligente Sonde SON20

![](../media/img/son20.gif)

*	**Messgröße:** Photonenäquivalent-Dosisleistung bzw.Umgebungsäquivalent-Dosisleistung
*	**Detektor:** Geiger-Müller-Zählrohr / Typ 70013E (energiekompensiert für die Messgröße Photonenäquivalentdosis/-leistung bzw. Geiger-Müller-Zählrohr / Typ 70013A (energiekompensiert für die Messgröße Umgebungsäquivalentdosis/-leistung
*	**Messbereich:** 0,05 µSv/h\* ... 200 µSv/h
 \*(Messzeit 200 s, Messunsicherheit < 3 %)
*	**Energiebereich:**	35 keV ... 1,3 MeV
*	**Kollimator:**	Ohne

#### Elektronik
*	interner Mikrocontroller mit internem Speicher
*	128-kByte-FLASH-EEPROM
*	Datenübertragung per RS-485-Schnittstelle
*	interne Berechnung der Aktivität pro Volumen aus der Impulsrate
*	Korrektur der Totzeit und des Nulleffektes
*	Messwertspeicherung (max. 9088) mit Datum und Uhrzeit in einem nicht flüchtigen, zyklischen Speicher, auch bei Ausfall des PC
*	Messzeit und Messzyklen frei wählbar
*	Messzeit und Messzyklen frei wählbar
*	Selbstüberwachung aller externen und internen Betriebsspannungen, der Funktionsfähigkeit des Detektors, der Schnittstelle und der Speicher

#### Optionen
*	Bleikollimator
*	Potentialfreie Anzeige für die Meldung von Grenzwertüberschreitungen und Störungen, jeder Ausgang ist mit 24 V, 0,5 A belastbar

---

### Komponente: Intelligente Anzeige AT1-x

![](../media/img/at1-x.jpg)

Intelligente Einzel- bzw. Doppelanzeige (AT1-1 bzw. AT1-2) zur optischen Darstellung der Messwerte in Unterputzausführung.

#### Darstellung der Messwerte
*	3½-Digit-Anzeige (Höhe der Ziffern: 17,8 mm), LCD mit Hintergrundbeleuchtung
*	Optische und akustische Störungsmeldung an der Anzeige (per Software abschaltbar)
*	Quasianaloge Balkendarstellung (20 Elemente)
*	3 LED (rot, gelb, grün) zur sofortigen Signalisation des Gefährdungsgrades für das Personal
*	(Schwellwerte für jede Anzeige getrennt programmierbar)
*	Datenübertragung per RS-485-Schnittstelle
*	Speicherung aller relevanten Parameter in einem EEPROM

#### Elektronik
*	Interner Mikrocontroller mit internem Speicher
*	128-kByte-FLASH-EEPROM
*	Datenübertragung per RS-485-Schnittstelle
*	3 interne Alarmschwellen
*	Messwertspeicherung in einem nicht flüchtigen, zyklischen Speicher, auch bei Ausfall des PC
*	Selbstüberwachung aller externen und internen Betriebsspannungen und der Schnittstelle

#### Option
*	Montagerahmen zur Aufputzinstallation

---

### Komponente: Modul-Server

Als Dienst implementierter lokaler Server zur automatischen Messwerte-Erfassung von angeschlossenen Detektoren und Weiterleitung der Messwerte an die jeweiligen Anzeigen.

#### Sonstige Funktionen

*	Automatische Überwachung aller Bus-Komponenten
*	Fehlertolerante Datenerfassung
*	Speicherung der Messwerte in einer MS-SQL-Datenbank
*	Automatisches Daten-Backup (täglich, monatlich)
*	Kalibrierfunktion für Detektoren
*	Bereitstellung der Daten für unterschiedliche Client-Software

---

### Komponente: DLMon-CLient-Software

Auswertesoftware für die Patientenüberwachung in der nuklearmedizinischen Radio-Jod-Therapie mit folgenden Funktionen

![](../media/img/dlmon-client-de1.gif)

![](../media/img/dlmon-client-de2.gif)

![](../media/img/dlmon-client-de3.gif)

#### Funktionen

*	Lageplan aller Sonden in den zu überwachenden Räumen
*	Sondenübersicht mit farbiger Darstellung der aktuellen Dosisleistung
*	Patienten-Dosisleistungs-Diagramm
*	Langzeitarchivierung
*	Kalibrierung der Detektoren
*	Einstellung von Schwellwerten und Alarmgrenzen
*	Patienten-Datenbank mit Funktionen zur Patientenaufnahme (optional mit Chipkartenleser)
*	Patienten-Diagramme mit Anzeige der Entlassungsschwellen (frei wählbar)
*	Kurvenanpassung zur Bestimmung der effektiven Halbwertszeit
*	Diverse Messwert-Analyse-Funktionen (z.B. Uptake-Berechnung, Berechnung der Herddosis)
*	Patientenverlegung per Mausklick
*	Erstellung von Berichten über gewünschte Zeiträume
*	Formulardruck für Patientendaten, Patienten-Dosisleistungsverlauf, Stationsbeleg
*	Werkzeug zur Patientenplanung

[Softwarebeschreibung - PDF 2,7MB](../media/pdf/DLMon%20Softwarebeschreibung%20V5.4.7.pdf)

---

### Komponente: RMon-Client-Software

Auswerte-Software für den Raum- und Prizessüberwachung in Laboratorien und strahlenbelasteten Räumen

![](../media/img/rmon-client-de1.gif)

![](../media/img/rmon-client-de2.gif)

![](../media/img/rmon-client-de3.gif)

#### Funktionen

*	Lageplan aller Sonden in den zu überwachenden Räumen
*	Sondenübersicht mit farbiger Darstellung der aktuellen Dosisleistung
*	Darstellung von Dosisleistungs-Diagrammen
*	Kalibrierung der Detektoren
*	Einstellung von Schwellenwerten und Alarmgrenzen
*	Langzeitspeicherung von Messwerten
*	Formulardruck von Dosisleistungs-Diagrammen

---

## Referenzliste: Dosisleistungs-Messsystem DLMon

#### 2017
*	Neuinstallation DLMon-System im Neubau des Universitätsklinikum Jena im Standort Lobeda
*	Erneuerung DLMon-System im KABEG Klinkikum Klagenfurt
*	Teilweise Erneuerung DLMon-System im Universitätsklinikum Halle

#### 2016
*	Teilweise Erneuerung DLMon-System in Zentralklinik Bad Berka
*	Neuinstallation DLMon-System in der Nuklearmedizin im Klinikum Sozialstiftung Bamberg

#### 2015
*	Erweiterung DLMon-System im Universitätsklinikum Leipzig

#### 2014
*	Teilweise Erneuerung DLMon-System im Landeskrankenhaus Innsbruck/TirolKliniken
*	Neuinstallation DLMon-System im American Hospital Dubai

#### 2013
*	Neuinstallation DLMon-System im Prince Sultan Medical Military City in Riyadh City, Saudi Arabien

#### 2012
*	Teilweise Erneuerung DLMon-System im Klinikum Chemnitz

#### 2010
*	Neuinstallation DLMon-System im Saint Bartholomew's Hospital in London

#### 2009
*	Neuinstallation DLMon-System im Universitätsklinkum Jena

#### 2008
*	Ausstattung von zwei Kliniken mit Raumüberwachungssystemen in Südkorea durch GnG Radcom, Co. Ltd.

#### 2007
*	Neuinstallation DLMon-System in der Klinik für Nuklearmedizin im Universitätsklinikum der Johann-Wolfgang-Goethe-Universität Frankfurt am Main.
*	Neuinstallation DLMon-System im Dienstleistungszentrum Radiologie / Nuklearmedizin im Sana Klinikum Hof GmbH

#### 2005
*	Neuinstallation DLMon-System in der Klinik für Diagnostische Radiologie und Nuklearmedizin im Universitätsklinikum der Otto-von-Guericke-Universität Magdeburg
*	Neuinstallation DLMon-System in der Klinik für Nuklearmedizin (Abt. BwZK) im Klinikum Kemperhof Koblenz
*	Neuinstallation DLMon-System im Nuclear Medicine Department of Dubai Hospital / Dubai (VAE)
*	Neuinstallation DLMon-System im KABEG Klinkikum Klagenfurt

#### 2002
*	Neuinstallation DLMon-System in der Klinik und Poliklinik für Nuklearmedizin im Universitätsklinikum Leipzig AöR
*	Neubau und Erweiterung DLMon-System in der Klinik für Nuklearmedizin / PET-Zentrum im Zentralklinikum Bad Berka GmbH

#### 2001
*	Neuinstallation DLMon-System in der Klinik für Nuklearmedizin im Klinikum Chemnitz gGmbH
*	Neuinstallation DLMon-System in der Abteilung für Radiologie und Nuklearmedizin im Robert-Bosch-Krankenhaus Stuttgart
*	Neuinstallation DLMon-System in der Klinik für Nuklearmedizin im Landeskrankenhaus-Universitätskliniken Innsbruck (Österreich)

#### 1999
*	Neuinstallation DLMon-System in der Klinik und Poliklinik für Nuklearmedizin im Universitätsklinikum der Martin-Luther-Universität Halle-Wittenberg

#### 1997
*	Neuinstallation DLMon-System in der Klinik für Nuklearmedizin im HELIOS Klinikum Erfurt