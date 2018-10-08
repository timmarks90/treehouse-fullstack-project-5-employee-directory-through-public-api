
// Add search container
const searchContainer = document.querySelector('.search-container');

// Create search form
const searchForm = document.createElement('form');
searchForm.setAttribute('method', 'get');
searchForm.setAttribute('action', '#');

// Gallery
const gallery = document.getElementById('gallery');

// Create modal container
let modalContainer = document.createElement('div');

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
    .then(res => res.json())
    .then(data => cardInfo(data.results))

// Create person card components from API
function cardInfo(data) {
    let cardHTML = '';
    data.forEach(person => {
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
    });
    gallery.innerHTML = cardHTML;
    // Create modal on click of employee card
    const card = document.querySelectorAll('.card');
    for(i = 0; i < card.length; i++) {
        card[i].addEventListener('click', () => {
            modalContainer.style.display = "block";
            modal(this);
            console.log('works');
        })
    }
}


/* ----------------------------------------------------------------------------------------------------------------------
Modal
------------------------------------------------------------------------------------------------------------------------- */
const modal = (e) => {
    // Grab person card info
    const cardName = document.querySelector('.card-name').textContent;
    const cardImg = document.querySelector('.card-img').textContent;
    const cardEmail = document.querySelector('.card-text').textContent;
    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${e.cardImg}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${e.cardName}</h3>
                    <p class="modal-text">${e.cardEmail}</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                </div>
            </div>
        
            // IMPORTANT: Below is only for exceeds tasks 
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;
    modalContainer.innerHTML = modalHTML;
    gallery.parentNode.insertBefore(modalContainer, gallery);
    
    // Close modal on click of 'X' close button
    const modalClose = document.getElementById('modal-close-btn');
    modalClose.addEventListener('click', () => {
        modalContainer.style.display = "none";
    })
}