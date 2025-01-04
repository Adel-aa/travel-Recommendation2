// Sample travel data (normally this would come from an API)
const travelData = {
    beaches: [
        {
            name: "Bali Beaches",
            description: "Beautiful beaches with crystal clear waters in Indonesia",
            image: "https://source.unsplash.com/800x600/?bali,beach",
            country: "Indonesia",
            timezone: "Asia/Makassar"
        },
        {
            name: "Maldives",
            description: "Paradise on Earth with white sand beaches and luxury resorts",
            image: "https://source.unsplash.com/800x600/?maldives,beach",
            country: "Maldives",
            timezone: "Indian/Maldives"
        }
    ],
    temples: [
        {
            name: "Angkor Wat",
            description: "Ancient temple complex in Cambodia",
            image: "https://source.unsplash.com/800x600/?angkorwat",
            country: "Cambodia",
            timezone: "Asia/Phnom_Penh"
        },
        {
            name: "Golden Temple",
            description: "Sacred Sikh temple in Amritsar, India",
            image: "https://source.unsplash.com/800x600/?goldentemple",
            country: "India",
            timezone: "Asia/Kolkata"
        }
    ],
    countries: [
        {
            name: "Japan",
            description: "Land of the rising sun with rich culture and modern cities",
            image: "https://source.unsplash.com/800x600/?japan",
            timezone: "Asia/Tokyo"
        },
        {
            name: "Italy",
            description: "Historic architecture, amazing food, and beautiful landscapes",
            image: "https://source.unsplash.com/800x600/?italy",
            timezone: "Europe/Rome"
        }
    ]
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsContainer = document.getElementById('searchResults');

// Search functionality
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let results = [];

    if (searchTerm.includes('beach')) {
        results = travelData.beaches;
    } else if (searchTerm.includes('temple')) {
        results = travelData.temples;
    } else if (searchTerm.includes('country')) {
        results = travelData.countries;
    }

    displayResults(results);
});

// Reset functionality
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
});

// Display results
function displayResults(results) {
    resultsContainer.innerHTML = '';

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'destination-card';

        const currentTime = getCurrentTime(item.timezone);
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                ${currentTime ? `<p>Local Time: ${currentTime}</p>` : ''}
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}

// Get current time for a specific timezone
function getCurrentTime(timezone) {
    if (!timezone) return null;
    
    try {
        const options = { 
            timeZone: timezone, 
            hour12: true, 
            hour: 'numeric', 
            minute: 'numeric'
        };
        return new Date().toLocaleTimeString('en-US', options);
    } catch (error) {
        console.error('Error getting timezone:', error);
        return null;
    }
}