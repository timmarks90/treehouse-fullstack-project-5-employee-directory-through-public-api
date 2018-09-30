
// Add search container
const searchContainer = document.querySelector('.search-container');

// Create search form
const searchForm = document.createElement('form');
searchForm.setAttribute('method', 'get');
searchForm.setAttribute('action', '#');

// Create search inputs
const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'search');
searchInput.setAttribute('id', 'search-input');
searchInput.setAttribute('class', 'search-input');
searchInput.placeholder = "Search...";

const submitInput = document.createElement('input');
searchInput.setAttribute('type', 'submit');
searchInput.setAttribute('value', '&#x1F50D;');
searchInput.setAttribute('id', 'search-submit');
searchInput.setAttribute('class', 'search-submit');

searchForm.appendChild(searchInput);
searchForm.appendChild(submitInput);
searchContainer.appendChild(searchForm);

/* ----------------------------------------------------------------------------------------------------------------------
GALLERY
------------------------------------------------------------------------------------------------------------------------- */
// Send request to Random User Generator API
fetch('https://randomuser.me/api/?nat=us&results=12')
    .then(response => response.json())
    .then(data => cardInfo(data.results))

// Create person card components from API
function cardInfo(data) {
    let cardHTML = '';
    data.forEach(person => {
        const gallery = document.getElementById('gallery');
        const personImg =  person.picture.large;
        const personFirstName =  person.name.first;
        const personLastName =  person.name.last;
        const personEmail =  person.email;
        const personCity =  person.location.city;
        const personState =  person.location.state;;
        // Insert API variables into HTML
        cardHTML += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${personImg}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${personFirstName} ${personLastName}</h3>
                <p class="card-text">${personEmail}</p>
                <p class="card-text cap">${personCity}, ${personState}</p>
            </div>
        </div>
        `;
        gallery.innerHTML = cardHTML;
    });
}