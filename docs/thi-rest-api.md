# Endpoint

- <https://hiplan.thi.de/webservice/production2/index.php>
- POST request
- `Content-Type: application/x-www-form-urlencoded`
- `User-Agent:Embarcadero RESTClient/1.0`

Only the House plan uses:
<https://hiplan.thi.de/webservice/raumplan.html>

# Services

## Session

### open

```http
username: <username>
passwd:   <password>
service:  session
method:   open
format:   json
```

Note the third value in the `data` list seems to be related to the account type. E.g. for an employee account it was `0`.

```json
{
  "data": ["<session token>", "<username>", 3],
  "date": "02.11.2020",
  "status": 0,
  "time": "20:28:40"
}
```

### close

```http
service: session
method:  close
format:  json
session: <session token>
```

```json
{
  "data": "STATUS_OK",
  "date": "02.02.2022",
  "status": 0,
  "time": "22:35:40"
}
```

### isalive

```http
service: session
method:  isalive
format:  json
session: <session token>
```

```json
{
  "data": "STATUS_OK",
  "date": "02.11.2020",
  "status": 0,
  "time": "20:34:28"
}
```

## Personal Data

```http
service: thiapp
method:  persdata
format:  json
session: <session token>
```

```json
{
  "data": [
    0,
    {
      "pcounter": "<printing credits e.g. 42.13€>",
      "persdata": {
        "aaspf_echt": "<B for bachelor, M for master>",
        "bibnr": "<library number>",
        "email": "<personal email>",
        "fachrich": "<course of study e.g. Informatik, Robotik, ...>",
        "fhmail": "<thi email>",
        "mtknr": "<Matrikelnummer>",
        "name": "<second name>",
        "ort": "<city>",
        "plz": "<city postcode>",
        "po_url": "<URL of the Pruefungsordnung>",
        "pvers": "<version number of the Pruefungsordnung>",
        "rchtg": null,
        "rue": "1",
        "rue_sem": "WS 2020/21",
        "stg": "<short course of study e.g. ROB>",
        "stgru": "<semester number>",
        "str": "<home street>",
        "swpkt": "{NULL,NULL,NULL}",
        "telefon": "",
        "user": "<thi username>",
        "vname": "<first name>"
      }
    }
  ],
  "date": "02.11.2020",
  "status": 0,
  "time": "20:46:21"
}
```

## Exams

```http
service: thiapp
method:  exams
format:  json
session: <session token>
```

```json
{
  "data": [
    0,
    [
      {
        "ancode": "001",
        "anm_date": "2020-11-04",
        "anm_time": "18:39:21",
        "anmerkung": "Termin durch PrÃ¼fer bestimmt",
        "exam_rooms": null,
        "exam_seat": null,
        "exam_time": null,
        "exm_date": null,
        "fs_semesterzeiten": "39",
        "hilfsmittel": "{\"3 DIN-A4 Blätter handschriftliche Formelsammlung\",\"nicht programmierbarer Taschenrechner / pocket calculator, not programmable\",\"3 DIN-A4 Blätter handschriftliche Formelsammlung\",\"nicht programmierbarer Taschenrechner / pocket calculator, not programmable\",\"3 DIN-A4 Blätter handschriftliche Formelsammlung\",\"nicht programmierbarer Taschenrechner / pocket calculator, not programmable\"}",
        "modus": "1",
        "prf_katalog_id": "109477",
        "pruefer_namen": "<prof name>",
        "pruefungs_art": "schrP90 - schriftliche Prüfung, 90 Minuten",
        "pruefvorgezogen": "2021-01-19",
        "sem": "220",
        "stg": "<short course of study e.g. ROB>",
        "titel": "Elektrotechnik",
        "uname": "<username>"
      }
      // MORE...
    ]
  ],
  "date": "04.11.2020",
  "status": 0,
  "time": "21:40:00"
}
```

## Grades

```http
service: thiapp
method:  grades
format:  json
session: <session token>
```

```json
{
  "data": [
    0,
    [
      {
        "anrech": "",
        "ects": "5,0",
        "fristsem": "",
        "frwpf": "null",
        "kztn": "z_",
        "note": "<your grade, e.g. 1,0 or 4,0>",
        "pon": "110",
        "stg": "<short course of study e.g. ROB>",
        "titel": "Computer-Forensik"
      },
      {
        "anrech": "",
        "ects": "5,0",
        "fristsem": "",
        "frwpf": "null",
        "kztn": "z_",
        "note": "<your grade, e.g. 1,0 or 4,0>",
        "pon": "210",
        "stg": "<short course of study e.g. ROB>",
        "titel": "Security Engineering in der IT"
      }
      // more...
    ]
  ],
  "date": "02.11.2020",
  "status": 0,
  "time": "20:46:49"
}
```

## Personal Timetable

Setting `details` to `1` results in the fields `inhalt`, `literatur` and `ziel` to be filled with HTML code with further information.

```http
service: thiapp
method:  stpl
format:  json
session: <session token>
day:     02
month:   11
year:    2020
details: 0
```

```json
{
  "data": [
    0,
    "WS 2020",
    [
      {
        "datum": "2020-11-01",
        "name": "Allerheiligen"
      }
    ],
    [
      {
        "bis": "09:45:00",
        "datum": "2020-10-26",
        "dozent": "Mustermann, M.",
        "ectspoints": "5",
        "fach": "Technische Mechanik 1",
        "inhalt": null,
        "literatur": null,
        "pruefung": "schrP90 - schriftliche Prüfung, 90 Minuten",
        "raum": "E_Online",
        "stg": "ROB-B",
        "stgru": "ROB1",
        "sws": "4",
        "teilgruppe": "0",
        "veranstaltung": "ROB-TM1",
        "von": "08:15:00",
        "ziel": null
      },
      {
        "bis": "11:25:00",
        "datum": "2020-10-27",
        "dozent": "Doe, J.",
        "ectspoints": "5",
        "fach": "Elektrotechnik",
        "inhalt": null,
        "literatur": null,
        "pruefung": "schrP90 - schriftliche Prüfung, 90 Minuten",
        "raum": "E_Online",
        "stg": "ROB-B",
        "stgru": "ROB1",
        "sws": "4",
        "teilgruppe": "0",
        "veranstaltung": "ROB-ET",
        "von": "09:00:00",
        "ziel": null
      }
      // MORE! ...
    ],
    [
      {
        "bis": "2020-11-13",
        "intervall": "Prüfungsanmeldung",
        "von": "2020-11-04"
      }
    ]
  ],
  "date": "02.11.2020",
  "status": 0,
  "time": "20:57:14"
}
```

## Rooms

```http
service: thiapp
method:  rooms
format:  json
session: <session token>
day:     02
month:   11
year:    2020
```

```json
{
  "data": [
    0,
    {
      "email": null,
      "rooms": [
        {
          "datum": "2020-11-02",
          "rtypes": [
            {
              "raumtyp": "Kleiner Hörsaal  (40-79 Plätze)",
              "stunden": {
                "1": {
                  "bis": "09:00",
                  "raeume": "B108, D113, D115, D213, D305, D312, D314, D315, D316, E001, E002, E101, E102, E103, G102, G105, G108, G202, G204, G208, G302, G304, G309",
                  "von": "08:15"
                },
                "2": {
                  "bis": "09:45",
                  "raeume": "B108, D113, D115, D213, D305, D312, D314, D315, D316, E001, E002, E101, E102, E103, G102, G204, G208, G302, G304, G309",
                  "von": "09:00"
                }
                // ...
              }
            },
            {
              "raumtyp": "PC Pool",
              "stunden": {
                //...
              }
            },
            {
              "raumtyp": "Seminarraum (< 40 Plätze)",
              "stunden": {
                //...
              }
            }
          ]
        }
        // more days ...
      ]
    }
  ],
  "date": "02.11.2020",
  "status": 0,
  "time": "20:59:31"
}
```

## Mensa

```http
service: thiapp
method:  mensa
format:  json
session: <session token>
```

```json
{
  "data": [
    {
      "gerichte": {
        "1": {
          "name": [
            "",
            "Hähnchen Cordon Bleu mit Zitrone ",
            "2,38 €",
            "3,38 €",
            "4,76 €"
          ],
          "zusatz": "Wz,Mi"
        },
        "2": {
          "name": ["", "Ungarische Krautnudeln ", "2,29 €", "3,40 €", "4,58 €"],
          "zusatz": "1,Wz,So"
        }
      },
      "tag": "Montag 02.11.2020"
    }
    // more days...
  ],
  "date": "02.11.2020",
  "status": 0,
  "time": "21:13:17"
}
```

## Parking

In the official app the UI using this request is hidden from all users except employees.
The area `TG Gießerei Hochschule` refers to the area of the THI itself, guarded by
barries and only accesible to employees and some mebers of the students council.

```http
service: thiapp
method:  parking
format:  json
session: <session token>
```

```json
{
  "data": [
    "timestamp:2021-05-06 23:34:34.427",
    {
      "name": "Congressgarage",
      "max": "352",
      "free": "171",
      "availstatus": "0",
      "tendency": "3"
    },
    {
      "name": "TG Gießerei Hochschule",
      "max": "89",
      "free": "80",
      "availstatus": "0",
      "tendency": "3"
    }
  ],
  "date": "06.05.2021",
  "time": "23:35:02",
  "status": 0
}
```

## News

```http
service: thiapp
method:  thiwebinfo
format:  json
session: <session token>
```

```json
{
  "data": ["<html source code>", "<html source code>"],
  "date": "02.11.2020",
  "status": 0,
  "time": "21:14:31"
}
```

## Imprint

```http
service: thiapp
method:  impressum
format:  json
session: <session token>
```

```json
{
  "data": ["1", "<html snippet>"],
  "date": "02.03.2021",
  "status": 0,
  "time": "00:00:28"
}
```

## Jobs

### categories

```http
service: thiapp
method:  jobs
query:   categories
format:  json
session: <session token>
```

```json
{
  "data": [
    0,
    {
      "areas": [
        "Alle",
        "Informatik",
        "Ingenieurwissenschaften & Technik",
        "Kommunikation & Design",
        "Mathematik",
        "Naturwissenschaften",
        "Wirtschaftswissenschaften"
      ],
      "classes": [
        "Alle",
        "Betreute Abschlussarbeit",
        "Einstiegsposition",
        "Fachposition",
        "Praktikum",
        "Studentenjob",
        "Trainee"
      ]
    }
  ],
  "date": "02.03.2021",
  "status": 0,
  "time": "00:02:07"
}
```

### offers

```http
service: thiapp
method:  jobs
query:   offers
days:    10
format:  json
session: <session token>
```

```json
{
  "data": "Service not available",
  "date": "02.03.2021",
  "status": -112,
  "time": "00:02:29"
}
```

## Lecturers

### Personal Lecturers

```http
service: thiapp
format:  json
session: <session token>
method:  stpllecturers
```

```json
{
  "data": [
    0,
    [
      {
        "einsichtnahme": "14. März um 10.30 Uhr UND 31. März 12 Uhr; Raum: H-666 (geändert am: 16.02.2021)",
        "email": "max.mustermann@thi.de",
        "funktion": "Professor(in)",
        "id": "1337",
        "ist_intern": "t",
        "name": "Mustermann",
        "organisation": "Fakultät Elektro- und Informationstechnik",
        "raum": "H666",
        "sprechstunde": "SS 2021: Montag (Monday) 14.00 - 10.00 Uhr (geändert am: 07.03.2021)",
        "tel_dienst": "0841/ 9348-1234",
        "titel": "Prof. Dr.",
        "vorname": "Max"
      }
      // more ...
    ]
  ],
  "date": "30.03.2021",
  "status": 0,
  "time": "19:49:07"
}
```

### All lecturers (from A to Z)

```http
service: thiapp
method:  lecturers
format:  json
session: <session token>
from:    a
to:      c
```

```json
{
  "date": "30.03.2021",
  "time": "19:37:23",
  "data": [
    0,
    [
      {
        "id": "1337",
        "name": "Doe",
        "vorname": "Jane",
        "titel": "",
        "raum": "",
        "email": "Kontaktinformationen bitte der Dozentenseite in Moodle entnehmen",
        "tel_dienst": " ",
        "sprechstunde": "Bitte im Dekanat Ihrer Fakultät erfragen.",
        "einsichtnahme": "Bitte die Angaben aus Moodle entnehmen.",
        "ist_intern": "f",
        "organisation": "Sprachenzentrum or Professor(in)",
        "funktion": "Lehrbeauftragte(r)"
      }
      // more profs / teachers / etc.
    ]
  ],
  "status": 0
}
```

## Reservations (library)

### getreservation

```http
service: thiapp
method:  reservations
format:  json
session: <session token>
type:    1
subtype: 1
cmd:     getreservation
data:
```

As of 2021-06 the API returns "Service not available" when no reservations are available

```json
{
  "data": "Service not available",
  "date": "10.06.2021",
  "time": "14:23:27",
  "status": -112
}
```

Old response:

```json
{
  "data": "No reservation data",
  "date": "02.11.2020",
  "status": -126,
  "time": "20:36:31"
}
```

```json
{
  "data": [
    0,
    [
      {
        "rcategory": "Lesesaal Galerie",
        "reservation_begin": "2020-11-03 06:00:00",
        "reservation_end": "2020-11-03 10:00:00",
        "reservation_id": "6678",
        "reserved_at": "2020-11-02 20:25:50",
        "reserved_by": "<username>",
        "resource": "2",
        "resource_id": "3",
        "rsubtype": "1"
      }
    ]
  ],
  "date": "02.11.2020",
  "status": 0,
  "time": "20:34:29"
}
```

### addreservation

```http
service: thiapp
method:  reservations
format:  json
session: <session token>
type:    1
subtype: 1
cmd:     addreservation
data:    {"resource":"3","from":"06:00","to":"10:00","at":"2020-11-03","place":"-1"}
```

```json
{
  "data": [0, ["<reservation number>"]],
  "date": "02.11.2020",
  "status": 0,
  "time": "21:29:51"
}
```

### delreservation

```http
service: thiapp
method:  reservations
format:  json
session: <session token>
type:    1
subtype: 1
cmd:     delreservation
data:    6678
```

```json
{
  "data": "No reservation data",
  "date": "02.11.2020",
  "status": -126,
  "time": "20:36:31"
}
```

### getavailabilities

```http
service: thiapp
method:  reservations
format:  json
session: <session token>
type:    1
subtype: 1
cmd:     getavailabilities
data:
```

parts redacted, see getavailabilities-full.json

```json
{
  "date": "02.11.2020",
  "time": "20:37:54",
  "data": [
    0,
    [
      {
        "date": "2020-11-02",
        "hasReservation": false,
        "resource": [
          {
            "from": "18:00",
            "to": "24:00",
            "resources": {
              "1": {
                "room_name": "Lesesaal Nord (alte Bibliothek)",
                "seats": [
                  "1",
                  "4",
                  "5",
                  "8",
                  "9",
                  "12",
                  "14",
                  "16",
                  "18",
                  "20",
                  "21",
                  "24",
                  "25",
                  "28",
                  "29",
                  "32",
                  "33",
                  "36",
                  "37",
                  "40",
                  "41",
                  "44",
                  "45",
                  "48",
                  "49",
                  "50",
                  "51",
                  "52",
                  "53",
                  "54",
                  "56",
                  "57"
                ],
                "num_seats": 32,
                "maxnum_seats": 32
              }
              // more rooms ...
            }
          }
        ]
      }
      // more days, more times ...
    ]
  ],
  "status": 0
}
```
