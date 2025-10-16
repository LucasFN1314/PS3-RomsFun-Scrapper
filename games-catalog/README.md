# Games Catalog

## Overview
The Games Catalog project is a web application that displays a list of games in a paginated format. Users can search for specific games and navigate through pages of results. The application fetches data from a specified API and presents it in a user-friendly interface.

## Project Structure
```
games-catalog
├── index.html         # Main HTML document for the application
├── css
│   └── styles.css     # Styles for the application
├── js
│   ├── app.js         # Main JavaScript file for application logic
│   ├── api.js         # Functions for API interaction
│   └── pagination.js   # Pagination logic and controls
└── README.md          # Project documentation
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser to view the application.
3. Ensure that the API endpoint is correctly configured in `api.js`.

## Usage Guidelines
- Use the search input to filter games by name.
- Navigate through the paginated results using the pagination controls at the bottom of the game list.
- The number of games displayed per page can be configured in the `pagination.js` file (default is set to 20).

## Features
- Fetches game data from an external API.
- Displays games in a responsive, paginated format.
- Search functionality to quickly find specific games.
- Configurable number of products per page for user preference.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.