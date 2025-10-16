// This file manages pagination logic. It exports functions to calculate the total number of pages, update the current page, and render pagination controls based on the number of games and the configurable items per page.

const itemsPerPage = 20;

function calculateTotalPages(totalItems) {
    return Math.ceil(totalItems / itemsPerPage);
}

function renderPaginationControls(totalItems, currentPage, onPageChange) {
    const totalPages = calculateTotalPages(totalItems);
    const paginationContainer = document.getElementById('pagination');

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'page-button';
        pageButton.disabled = i === currentPage;

        pageButton.addEventListener('click', () => {
            onPageChange(i);
        });

        paginationContainer.appendChild(pageButton);
    }
}

function updateCurrentPage(currentPage) {
    const pageButtons = document.querySelectorAll('.page-button');
    pageButtons.forEach((button, index) => {
        button.disabled = index + 1 === currentPage;
    });
}

export { itemsPerPage, calculateTotalPages, renderPaginationControls, updateCurrentPage };