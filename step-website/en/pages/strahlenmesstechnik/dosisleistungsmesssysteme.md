DLMon/RMon
-----------

# Intelligent Dose and Dose Rate Measuring System

![](../media/img/dlmonsymb.jpg)

Intelligent Monitoring System to measure and display dose and dose rate for medical and general applications with computer assisted analysis of acquired data.

Suitable for patient-monitoring in nuclear medical radio-iodine-therapy, for room- and process- monitoring of laboratories and nuclear power plants as well as general monitoring at manufacturing radio nuclides.

Several bus-compatible components (up to 255) can be arranged in a custom-designed and universal monitoring system. The analysis software bases on a modern client-server-concept and allows a fast incorporation of special customer demands in terms of analysis and presentation of acquired data.

[Data Sheet - PDF 0.3MB](../media/pdf/prospect_idmon.pdf)

#### Components
*	Intelligent, bus-compatible Detector with an internal micro-controller
*	Intelligent, bus-compatible Single and Double Displays with an internal micro-controller and selectable threshold, incl. alarm
*	Intelligent, bus-compatible Large-Scale Displays with special functions
*	Central data acquisition and processing unit (consisting of PC, printer, no-break power supply and RS-485 interface)
*	Client-Server-Software (operating systems: Windows NT, 2000, XP)
*	Data storage in a MS-SQL data base

### Component: Intelligent Radiation Detector SON 16

![](../media/img/son16.gif)

*	**Measured value:** Photon dose rate equivalent respectively, Ambient dose rate equivalent
*	**Detector:** Geiger-Mueller-Tube / Type 70004
*	**Measurement range:** 0.1 µSv/h\* ... 500 µSv/h \*(Measuring period 200 s, measuring uncertainity < 3 %)
*	**Energy range:** 35 keV ... 1,3 MeV
*	**Collimator:** Material: lead (Pb), Aperture angle: ± 30°

#### Electronics

*	Micro-controller with internal memory
*	128-kByte-FLASH-EEPROM
*	Data transfer via an RS-485 interface
*	Calculation of dose rate from counting rate
*	Correction of detector dead time and background counting rate
*	Data memory (up to 9088 values) including date and time in non-volatile cycling memory, even at a shutdown of the PC
*	Acquisition parameters (cquisition time, number of cycles) can be defined
*	Continuous self-monitoring of all internal and external operating voltages, functional tests of the detector, of the interface and memory

---

### Component: Intelligent Radiation Detector SON 20

![](../media/img/son20.gif)

*	**Measured value:** Photon dose rate equivalent respectively, Ambient dose rate equivalent
*	**Detector:** Geiger-Mueller-Tube / Type 70013E (energy compensated for the photon equivalent dose rate), Geiger-Mueller-Tube / Type 70013A (energy compensated for the ambient equivalent dose rate)
*	**Measurement range:** 0.05 µSv/h\* ... 200 µSv/h \*(Measuring period 200 s, measuring uncertainity < 3 %)
*	**Energy range:** 35 keV ... 1,3 MeV
*	**Collimator:** None

#### Electronics

*	Micro-controller with internal memory
*	128-kByte-FLASH-EEPROM
*	Data transfer via an RS-485 interface
*	Calculation of dose rate from counting rate
*	Correction of detector dead time and background counting rate
*	Data memory (up to 9088 values) including date and time in non-volatile cycling memory, even at a shutdown of the PC
*	Acquisition parameters (cquisition time, number of cycles) can be defined
*	Continuous self-monitoring of all internal and external operating voltages, functional tests of the detector, of the interface and memory

#### Optional extras

*	Lead collimator
*	Potential free display for alarming threshold overruns and disturbances, every output can withstand 24 volt and 0.5 amps

---

### Component: Intelligent Display AT1-x

![](../media/img/at1-x.jpg)

Intelligent single and double displays (AT1-1 and AT1-2) for visual presentation of measurements in flush-mounted construction

#### Visualization of measurements
*	3½-digit-display (height of the digits: 17.8 mm), LCD with backlight
*	Visual and acoustical alarm at the display (to switch off by software)
*	Quasi-analogue bar graph (20 elements)
*	3 LED's (red, yellow, green) for immediately signalling of the health risk for the staff
*	(separate programmable thresholds for every display)
*	Data transfer by an RS-485 interface
*	Storage of all relevant parameters in an EEPROM

#### Electronics

*	Microcontroller with an internal memory
*	128-kByte-FLASH-EEPROM
*	Data transfer by an RS-485 interface
*	3 internal thresholds
*	Data Memory in a non-volatile, cyclic memory, even at a computer breakdown
*	Self-monitoring of all internal and external operation voltages and the interface

#### Optional extras
*	Construction frame for on-wall installation

---

### Component: Module-Server

Local server for data-acquisition from connected radiation detectors and data transmission to corresponding display units

#### Other features
*	Automatic monitoring of all bus components
*	Fault-tolerant data acquisition
*	Automatic data backup (daily, monthly) in a MS-SQL-database
*	Calibrate function for detectors
*	Providing data for various client-Software

---

### Component: DLMon client software

Analysis software for patient monitoring for use in radio-iodine-therapy

![](../media/img/dlmon-client-en1.jpg)

![](../media/img/dlmon-client-en2.jpg)

![](../media/img/dlmon-client-en3.jpg)

#### Features

*	Display of the arrangement of each detector in the rooms to be monitored
*	Detector overview: display of the current dose rate digitally as well as by a colour code
*	Display of patient-dose-rate diagram
*	Long-term archiving of acquired data
*	Detector calibration
*	Marginal check: if pre-selected thresholds are exceeded - emission of warning signals and/or activation of safety facilities
*	Patient-database with function for the patient check-in (optional: chip-card reader)
*	Patien-diagrams including the display of discharge-thresholds (freely selectable)
*	Data fit to estimate the effective half-life of the incorporated nuclide
*	Diverse data-analysis-functions (e.g. uptake-calculation, calculation of the hearth dose)
*	Transfer of patients by mouse click
*	Drawing up reports on chosen periods
*	Printing forms for patient data, patient dose rate history, ward occupancy
*	Tool for patient planning

---

### Component: RMon client software

Analysis software for room- and process-monitoring in laboratories and radioactive contaminated rooms. The analysis software includes following functions:

![](../media/img/rmon-client-en1.jpg)

![](../media/img/rmon-client-en2.jpg)

![](../media/img/rmon-client-en3.jpg)

#### Features
*	Display of the arrangement of each detector in the rooms to be monitored
*	Detector overview: display of the current dose rate digitally as well as by a colour code
*	Display of patient-dose-rate diagrams
*	Detector calibration
*	Marginal check: if pre-selected thresholds are exceeded - emission of warning signals and/or activation of safety facilities
*	Long-term archiving of acquired data
*	Printing forms for patient dose rate history

---

## Referencelist

#### Referenzlist: Radiation monitoring system DLMon

#### 2017
*	Installation of DLMon-System in the new building of the University Hospital Jena
*	Renewel of the DLMon-System in the KABEG Klinkikum Klagenfurt
*	Partial Renewel of the DLMon-System in the University Hospital Halle

#### 2016
*	Partial Renewel of the DLMon-System in the Central Clinic Bad Berka
*	Installation of DLMon-System in the Nuclear Medicine Department in the clinic Sozialstiftung Bamberg

#### 2015
*	Expansion of the DLMon-System in the University Hospital Leipzig

#### 2014
*	Partial Renewel of the DLMon-System in the Landeskrankenhaus Innsbruck/TirolKliniken
*	Installation of DLMon-System in the  American Hospital Dubai

#### 2013
*	Installation of DLMon-System in the Prince Sultan Medical Military City in Riyadh City, Saudi Arabien

#### 2012
*	Partial Renewel of the DLMon-System in the Clinic Chemnitz

#### 2010
*	Installation of DLMon-System in the Saint Bartholomew's Hospital in London

#### 2009
*	Installation of DLMon-System in the University Hospital Jena

#### 2008
*	Fitting of two clinics with room monitoring system in South Korea in cooperation with GnG Radcom, Co. Ltd.

#### 2007
*	Installation of DLMon-System in the Clinic for Nuclear Medicine in the University Hospital at the Johann-Wolfgang-Goethe-University Frankfurt am Main.
*	Installation of DLMon-System in the service center for Radiology / Nuclear Medicine in the Sana Clinic Hof GmbH

#### 2005
*	Installation of DLMon-System in the Clinic for Diagnostische Radiologie and Nuclear Medicine in the University Hospital at the Otto-von-Guericke-Universität Magdeburg
*	Installation of DLMon-System in the Clinik for Nuclear Medicine in the Clinic Kemperhof Koblenz
*	Installation of DLMon-System in the Nuclear Medicine Department of Dubai Hospital / Dubai (VAE)
*	Installation of DLMon-System in the KABEG Clinic Klagenfurt

#### 2002
*	Installation of DLMon-System in the Clinic and Polyclinic for Nuclear Medicine in the Universitätsklinikum Leipzig AöR
*	Neubau and Expansion of the DLMon-System in the Clinic for Nuclear Medicine / PET-Zentrum in the Zentralklinik Bad Berka GmbH

#### 2001
*	Installation of DLMon-System in the Clinic for Nuclear Medicine at the Klinikum Chemnitz gGmbH
*	Installation of DLMon-System in the Radiologie and Nuclear Medicine Department in the Robert-Bosch-Hospital Stuttgart
*	Installation of DLMon-System in the clinic for Nuclear Medicine in the Landeskrankenhaus-Universitätskliniken Innsbruck (Austria)

#### 1999
*	Installation of DLMon-System in the clinic and Polyclinic for Nuclear Medicine in the University Hospital at the Martin-Luther-University Halle-Wittenberg

#### 1997
*	Installation of DLMon-System in the clinic for Nuclear Medicine at the HELIOS Clinic Erfurt