# 🏛️ Utah Temple Rankings

An interactive, mobile-friendly website for exploring and ranking temples across Utah.

Rate each temple, write personal notes, save favorites, explore the map, and keep a private photo journal for every location.

![HTML](https://img.shields.io/badge/HTML5-static-e34f26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-responsive-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f7df1e?logo=javascript&logoColor=111)
![No build step](https://img.shields.io/badge/build-none-success)

## ✨ Features

- Browse Utah temples in a searchable directory.
- Rate temples from `0–10` in five categories.
- Automatically sort temples by overall score or individual categories.
- Open an animated detail popup for each temple.
- Add notes for individual rating categories.
- Mark a temple as a favorite or rate “Would Visit Again?” separately from the main score.
- Explore temple locations with an interactive Leaflet map.
- See ranked temples turn green on the map.
- See a 🏆 trophy on the highest-rated temple.
- Add personal journal photos for each temple.
- View journal photos in that temple’s **Pictures** section on the Rankings page.
- Responsive layout for desktop, tablet, and mobile screens.

## 📊 Scoring system

Each category is scored from `0` to `10`.

| Category | Weight |
| --- | ---: |
| 🏛️ Architecture | 25% |
| 🌳 Grounds | 20% |
| ✨ Overall Experience | 20% |
| 📜 Historical Significance | 10% |
| ⭐ Uniqueness | 25% |

The overall score is calculated automatically:

```text
architecture × 0.25
+ grounds × 0.20
+ experience × 0.20
+ history × 0.10
+ uniqueness × 0.25
```

The final result is displayed out of `10`, rounded to two decimal places.

Favorites and “Would Visit Again?” ratings are personal preferences. They do not affect the weighted ranking score.

## 🗂️ Project structure

```text
TempleListRanking/
├── index.html              # Homepage
├── temple-list.html        # Searchable temple directory
├── Temple-Rankings.html    # Rating and ranking dashboard
├── MapofTemples.html       # Interactive map and photo journal
├── script.js               # Temple data, scoring, sorting, and popup logic
├── css/
│   └── style.css           # Shared responsive styling
├── Images/                 # Temple photos and map marker icons
└── .gitignore              # Keeps personal camera photos out of Git
```

## 🚀 Run it locally

No framework, package manager, or build process is required.

### Option 1: Open the homepage

Double-click `index.html` in File Explorer.

### Option 2: Use a local server

A local server provides the most reliable experience for maps and browser storage.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

