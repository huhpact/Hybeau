document.addEventListener('DOMContentLoaded', function() {
    initArticlesPage();
});

const articlesData = [
    {
        id: 1,
        title: "iPhone 17 Lineup Leaks: Ultra-Thin Air, Pro Camera Revamp & Reverse Charging",
        excerpt: "A roundup of the most consistent iPhone 17, 17 Air, and 17 Pro/Pro Max leaks—ultra-thin design, ProMotion across the lineup, new camera layouts, and the long-rumored reverse wireless charging.",
        category: "iphone",
        image: "/images/iphone17.jpg",
    date: "August 26, 2025",
        readTime: "9 min read",
        link: "articles/iphone-17-news.html"
    }
];

let currentArticles = [...articlesData];
let displayedArticles = 6;
let currentFilter = 'all';
let currentSearch = '';

function initArticlesPage() {
    renderArticles();
    initSearchAndFilter();
    initLoadMore();
}

function renderArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!articlesGrid) return;
    
    let filteredArticles = currentFilter === 'all' 
        ? [...articlesData] 
        : articlesData.filter(article => article.category === currentFilter);
    
    if (currentSearch) {
        filteredArticles = filteredArticles.filter(article => 
            article.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    currentArticles = filteredArticles;
    
    if (currentArticles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or filter selection</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    const articlesToShow = currentArticles.slice(0, displayedArticles);
    articlesGrid.innerHTML = articlesToShow.map(article => createArticleCard(article)).join('');
    
    loadMoreBtn.style.display = currentArticles.length > displayedArticles ? 'block' : 'none';
    
    const cards = articlesGrid.querySelectorAll('.article-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function createArticleCard(article) {
    return `
        <article class="article-card" data-category="${article.category}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="article-category">${getCategoryDisplayName(article.category)}</div>
            </div>
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span class="article-date">${article.date}</span>
                    <span class="read-time">${article.readTime}</span>
                </div>
                <a href="${article.link}" class="article-link">Read Article <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `;
}

function getCategoryDisplayName(category) {
    const categoryMap = {
        'iphone': 'iPhone',
        'ios': 'iOS',
        'mac': 'Mac',
        'ai': 'AI',
        'software': 'Software'
    };
    return categoryMap[category] || category;
}

function initSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentSearch = this.value.trim();
                displayedArticles = 6;
                renderArticles();
            }, 300);
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.category;
            displayedArticles = 6;
            renderArticles();
        });
    });
}

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedArticles += 6;
            renderArticles();
            
            setTimeout(() => {
                const newCards = document.querySelectorAll('.article-card');
                if (newCards.length > displayedArticles - 6) {
                    newCards[displayedArticles - 6].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        });
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}