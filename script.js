const API_URL = 'https://rickandmortyapi.com/api/character';

const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const charactersContainer = document.getElementById('charactersContainer');
const favoritesContainer = document.getElementById('favoritesContainer');
const messageContainer = document.getElementById('messageContainer');

let allCharacters = [];
let favorites = JSON.parse(localStorage.getItem('rickAndMortyFavorites')) || [];

// Función para mostrar mensajes de error o avisos
function showMessage(text, isError = false) {
    messageContainer.textContent = text;
    messageContainer.className = `message ${isError ? 'error' : ''}`;
    messageContainer.classList.remove('hidden');
}

function hideMessage() {
    messageContainer.textContent = '';
    messageContainer.classList.add('hidden');
}

// Obtener personajes de la API usando fetch()
async function fetchCharacters() {
    try {
        hideMessage();
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al conectar con la API de Rick and Morty.');
        }

        const data = await response.json();
        allCharacters = data.results;
        
        displayCharacters(allCharacters);
        renderFavorites();
    } catch (error) {
        console.error(error);
        showMessage('Error al cargar los datos. Verifica tu conexión a internet o intenta más tarde.', true);
    }
}

// Mostrar personajes en la interfaz
function displayCharacters(characters) {
    charactersContainer.innerHTML = '';

    if (characters.length === 0) {
        showMessage('No se encontraron personajes que coincidan con la búsqueda.');
        return;
    } else {
        hideMessage();
    }

    // Asegurarnos de mostrar al menos los elementos requeridos
    characters.forEach(character => {
        const isFav = favorites.some(fav => fav.id === character.id);
        
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <div>
                    <h3>${character.name}</h3>
                    <p>Estado: ${character.status}</p>
                    <p>Especie: ${character.species}</p>
                </div>
                <button class="fav-btn" onclick="toggleFavorite(${character.id})">
                    ${isFav ? 'Quitar de Favoritos ⭐' : 'Agregar a Favoritos 🤍'}
                </button>
            </div>
        `;
        charactersContainer.appendChild(card);
    });
}

// Filtrar y buscar personajes
function filterCharacters() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;

    const filtered = allCharacters.filter(character => {
        const matchesName = character.name.toLowerCase().includes(searchTerm);
        const matchesStatus = statusValue === '' || character.status.toLowerCase() === statusValue;
        return matchesName && matchesStatus;
    });

    displayCharacters(filtered);
}

// Gestionar Favoritos y localStorage
window.toggleFavorite = function(id) {
    const character = allCharacters.find(c => c.id === id);
    const index = favorites.findIndex(fav => fav.id === id);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(character);
    }

    localStorage.setItem('rickAndMortyFavorites', JSON.stringify(favorites));
    displayCharacters(allCharacters);
    filterCharacters();
    renderFavorites();
}

function renderFavorites() {
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p style="color: #888; font-size: 0.9rem;">No hay favoritos guardados.</p>';
        return;
    }

    favorites.forEach(fav => {
        const item = document.createElement('div');
        item.className = 'fav-item';
        item.innerHTML = `
            <img src="${fav.image}" alt="${fav.name}">
            <span>${fav.name}</span>
            <button class="remove-fav" onclick="toggleFavorite(${fav.id})" title="Eliminar">❌</button>
        `;
        favoritesContainer.appendChild(item);
    });
}

// Event Listeners para buscador y filtros
searchInput.addEventListener('input', filterCharacters);
statusFilter.addEventListener('change', filterCharacters);

// Inicializar aplicación al cargar
fetchCharacters();
