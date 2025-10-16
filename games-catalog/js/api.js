function fetchGames(page = 1, itemsPerPage = 20, searchQuery = '') {
    const apiUrl = `http://localhost:3000/games?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(searchQuery)}`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error('Error fetching games:', error);
            throw error;
        });
}

export { fetchGames };