getArticlesHtml();

async function getArticlesHtml() {
    const processed = [];
    const articles = document.querySelectorAll('.archive-container');
    for (const article of articles) {
        const image = article.querySelector('img')?.getAttribute('src');
        const title = article.querySelector('h3')?.textContent?.trim();
        const link = article.querySelector('a')?.getAttribute('href');

        if (!image && !title && !link) continue;

        processed.push({ image, title, link });
    }
    await sendArticles(processed)
}

async function sendArticles(articles) {
    fetch('http://localhost:3000/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(articles)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const page_items = document.getElementsByClassName('page-item');
            /*
            if (page_items.length > 0) {
                window.scrollTo(0, page_items[0].offsetTop);
            }
            */

            for (const item of page_items) {
                if (item.classList.contains('active')) {
                    console.log("HERE", item);

                    const next_page = item.nextElementSibling;
                    if (next_page) {
                        const item = next_page.querySelector('.page-link');
                        if (item) item.click();
                    }
                }
            }
        })
        .catch(error => console.error('Error:', error));
}