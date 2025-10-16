// This file contains the main JavaScript logic for the games catalog application.

const API_URL = 'http://localhost:3000/games'; // Replace with your API endpoint
const ITEMS_PER_PAGE = 20; // Configurable variable for number of products per page
let currentPage = 1;
let games = [];

// Function to fetch games from the API
async function fetchGames() {
    try {
        const response = await fetch(`${API_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        const data = await response.json();
        games = data.games; // Assuming the API returns an object with a 'games' array
        renderGames();
        renderPagination(data.totalCount); // Assuming the API returns total count of games
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

// Function to render games on the page
function renderGames() {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = ''; // Clear previous games

    games.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <a href="${game.link}" target="_blank">View Details</a>
        `;
        gameList.appendChild(gameItem);
    });
}

// Function to render pagination controls
function renderPagination(totalCount) {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('button');
        pageItem.innerText = i;
        pageItem.className = 'page-button';
        pageItem.onclick = () => {
            currentPage = i;
            fetchGames();
        };
        pagination.appendChild(pageItem);
    }
}

// Function to handle search queries
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.toLowerCase();
    const filteredGames = games.filter(game => game.title.toLowerCase().includes(query));
    renderFilteredGames(filteredGames);
}

// Function to render filtered games based on search
function renderFilteredGames(filteredGames) {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = '';

    filteredGames.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <a href="${game.link}" target="_blank">View Details</a>
        `;
        gameList.appendChild(gameItem);
    });
}

// Event listeners
document.getElementById('search-input').addEventListener('input', handleSearch);
window.onload = fetchGames;