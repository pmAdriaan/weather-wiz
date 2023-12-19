<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>WEATHER-WIZ</h1>
<h3>◦ Weather-Wiz: Your Forecast Friend For Life</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/jQuery-0769AD.svg?style=flat-square&logo=jquery&logoColor=white" alt="jQuery" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=&logo=css3&logoColor=white" alt="CSS3" />
<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=&logo=css3&logoColor=white" alt="BOOTSTRAP" />
</p>
<img src="https://img.shields.io/github/license/pmAdriaan/weather-wiz?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/pmAdriaan/weather-wiz?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/pmAdriaan/weather-wiz?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/pmAdriaan/weather-wiz?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#%EF%B8%8F-modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running Weather Wiz](#-running-weather-wiz)
    - [🌐 Live Demo Weather Wiz](#-live-demo-weather-wiz)
    - [📸 Screenshot Weather Wiz](#--screenshot-weather-wiz)
- [🛣 Project Roadmap](#-project-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---


## 📍 Overview

Weather-Wiz is a comprehensive Weather Dashboard web application providing real-time weather information based on a user’s location or a specified city or country. It delivers the current conditions and a five-day forecast, supplemented by animated weather-themed gifs fetched from the Giphy API. Additionally, it remembers previous search queries and also lets users clear their search history. The implementation ensures both desktop and mobile users have an optimized and satisfactory experience.

---


## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase has been organized in separate files for enhanced maintainability. Data persistence is achieved through local storage. |
| 🔗 | **Dependencies**   | Relies on vanilla JavaScript, JQuery for DOM manipulation, Bootstrap for styling, and Day.js for date operations.|
| 🧩 | **Modularity**     | The codebase functionality is split into separate files. CSS and JavaScript is organized in different files to improve code readability and maintainability.|
| 🧪 | **Testing**        | Manual testing has been conducted to ensure the functionality of the Weather Dashboard. No dedicated testing framework is currently in use.|
| ⚡️ | **Performance**    | The application is designed for optimal performance, taking advantage of its simplicity and reliance on local storage for efficient data management.|
| 🔐 | **Security**       | Currently lacks explicit security measures. It's important to note that data vulnerabilities may exist due to the use of local storage without encryption or protection mechanisms.|
| 🔀 | **Version Control**| Utilizes Git/GitHub for version control.|
| 🔌 | **Integrations**   | Integrations include Bootstrap for responsive design, Day.JS for date management, and JQuery for DOM manipulation.|
| 📶 | **Scalability**    | While the front-end design is scalable, the project's scalability is limited due to the absence of a back-end.|

---


## 📂 Repository Structure

```sh
└── weather-wiz/
    ├── css/
    │   ├── reset.css
    │   └── styles.css
    ├── index.html
    └── scripts/
        ├── config.js
        ├── domElements.js
        ├── giphy.js
        ├── history.js
        ├── icons.js
        ├── location.js
        ├── main.js
        └── weather.js

```

---


## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---                                                                                         | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [index.html](https://github.com/pmAdriaan/weather-wiz/blob/main/index.html)                 | The codebase `index.html` includes a search function to find weather details by city or country, a display for the current weather and a 5-day forecast, location services to find the user's current location, and a search history which can be cleared. Visual styling is provided through Bootstrap, custom CSS and Google Fonts, while dynamic functionality is implemented by several JavaScript modules.                                                                                                           |
| [reset.css](https://github.com/pmAdriaan/weather-wiz/blob/main/css\reset.css)               | The codebase `reset.css` is to reset CSS properties, such as margin, padding, and border styles, to improve cross-browser consistency. This helps to correct issues like line height inconsistency, font size adjustments after orientation changes in iOS, and the inconsistent rendering of elements like main, h1, etc., across different browsers, creating a normalized basis for further styling.                                                                                                                          |
| [styles.css](https://github.com/pmAdriaan/weather-wiz/blob/main/css\styles.css)             | The codebase `styles.css` defines styling for elements in the index.html file, including colors, fonts, text formats, border styles, and divisions. This includes specific styles for headers, body text, buttons, search bars, separators, and cards in both desktop and mobile views. Customized properties are used for color schemes, while media queries ensure the application is mobile-responsive.                                                                                                                  |
| [config.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\config.js)           | The codebase `config.js` holds configuration settings, specifically API keys for Giphy and OpenWeatherMap APIs. These keys are used to fetch data from corresponding services-animated images from Giphy and weather information from OpenWeatherMap.                                                                                                                                                                             |
| [domElements.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\domElements.js) | The codebase `domElements.js` extracts essential HTML elements needed for the app functionality via jQuery's selection methods. These elements include the search form, today's forecast container, five-day forecast container, history container, and buttons. It also sets up constants for Bootstrap classes and FontAwesome icons related to temperature, wind speed, and humidity which are used to style these elements.                                                                                        |
| [giphy.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\giphy.js)             | The codebase `giphy.js` it fetches a random GIF based on weather-related tags: sun, rain, storm, etc. The chosen GIF URL is then used to append an image to a target HTML element. If the request fails, errors are appropriately handled and logged.                                                                                                                                                                                                                                                    |
| [history.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\history.js)         | The codebase `history.js` include saving, loading, and clearing the search history of cities. It adds new cities to the history or reorders them if already present. The history, stored in the local storage, is loaded from there. The code also manages the display of a Clear History button based on the existence of items in the history.                                                                                                                                                                 |
| [icons.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\icons.js)             | The `icons.js` script generates weather icons for the weather application based on OpenWeatherMap's icon codes and the period of the day (day or night). It maps weather conditions codes to a suitable day or night weather icon, then creates and returns an image element with the corresponding icon. The icons are from [Noah Blon's animated Climacons](https://github.com/noahblon/animated-climacons).                                                                                                                                                                                                                            |
| [location.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\location.js)       | The code from the file `location.js` of the weather-wiz web application captures functionalities related to geolocation. It uses the browser's geolocation API to acquire the current location of the user, generates a weather API query using these coordinates after which it fetches weather data. It also handles potential location errors gracefully.                                                                                                                                                                                                                          |
| [main.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\main.js)               | The `main.js` script initializes the weather app. At startup, it sets up event listeners, loads history, displays a Clear History button if any history is present, clears input, and fetches a random gif. It handles form submissions by parsing inputs, building a query URL, fetching weather data, and resetting the input. Weather data is then displayed, with a clear distinction between current weather and the 5-day forecast. Other functionalities include creating weather card elements with required info, displaying error messages, and clearing forecast containers. |
| [weather.js](https://github.com/pmAdriaan/weather-wiz/blob/main/scripts\weather.js)         | The `weather.js` script in the weather-wiz application handles weather data retrieval and parsing. It includes functionalities to parse search terms into city, state code, and country code; construct a weather query URL for the OpenWeatherMap API; fetch weather data from the API, handling HTTP errors and displaying data or error messages; and handling other errors related to data fetching.                                                                                                                                                                              |

</details>

---

## 🚀 Getting Started

### 🔧 Installation

1. Clone the weather-wiz repository:
```sh
git clone https://github.com/pmAdriaan/weather-wiz
```

2. Change to the project directory:
```sh
cd weather-wiz
```

3. Install the dependencies:
```sh
N/A
```

### 🤖 Running Weather Wiz

```sh
► Open index.html with Live Server plugin in VS Code
```

### 🌐 Live Weather Wiz
► [Weather Wiz](https://pmadriaan.github.io/weather-wiz/)


### 📸 Weather Wiz Screenshot

![Screenshot Weather Wiz](./assets/images/screenshot_weather-wiz.png?raw=true "weather-wiz")

---


## 🛣 Project Roadmap

> - [ ] `ℹ️  Comming Soon`


---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/pmAdriaan/weather-wiz/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/pmAdriaan/weather-wiz/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/pmAdriaan/weather-wiz/issues)**: Submit bugs found or log feature requests for PMADRIAAN.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License


Copyright © 2023 Mihai Pirvu.

This project is licensed under the `ℹ️ MIT-License`. See the [MIT License](https://github.com/pmAdriaan/weather-wiz/blob/main/LICENSE) file for additional info.

[**Return**](#Top)

---
