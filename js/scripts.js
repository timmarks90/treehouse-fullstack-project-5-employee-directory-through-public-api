// Add search container
const searchContainer = document.querySelector('.search-container');

// Create search form
const search = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;
// Add search to html
searchContainer.innerHTML = search;

const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');

// Filter page people results on click of search submit button
searchSubmit.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase();
    filterSearch(searchValue);
})

// Filter page people results from search
function filterSearch(value) {
    const card = document.querySelectorAll('.card');
    // loop through all people cards on page
    for(i = 0; i < card.length; i++) {
        // Grab person name from card
        const personName = card[i].querySelector('.card-name').textContent;
        if (personName.indexOf(value) != -1) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
}

// Gallery
const gallery = document.getElementById('gallery');

// Create modal container
let modalContainer = document.createElement('div');

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
        const personState =  person.location.state;
        const cellPhone =  person.cell;
        const homePhone =  person.phone;
        const streetAddress = person.location.street;
        const postcode = person.location.postcode;
        let birthday = person.dob.date;
        birthday = birthday.substring(0, birthday.indexOf('T'));
        
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
                <p class="modal-text cell">${cellPhone}</p>
                <p class="modal-text homePhone">${homePhone}</p>
                <p class="modal-text streetAddress">${streetAddress}</p>
                <p class="modal-text postcode">${postcode}</p>
                <p class="modal-text birthday">${birthday}</p>
            </div>
        </div>
        `;
    });
    gallery.innerHTML = cardHTML;

    // Create modal on click of employee card
    const card = document.querySelectorAll('.card');
    for(i = 0; i < card.length; i++) {
        const currentCard = (card[i].closest('.card'))
        card[i].addEventListener('click', () => {
            modalContainer.style.display = "block";
            modal(currentCard);
        })
    }
    // Hide HMTL values specific to modal popup by default
    const modalText = document.querySelectorAll('.modal-text');
    for (let i = 0; i < modalText.length; i++) {
        modalText[i].style.display = "none";
    }
}

/* ----------------------------------------------------------------------------------------------------------------------
Modal
------------------------------------------------------------------------------------------------------------------------- */
const modal = (card) => {
    // Grab person card info
    const cardName = card.querySelector('.card-name').textContent;
    const cardImg = card.querySelector('.card-img').src;
    const cardEmail = card.querySelector('.card-text').textContent;
    const cardLocation = card.querySelector('.card-text.cap').textContent;
    const cellModal = card.querySelector('.modal-text.cell').textContent;
    const streetAddressModal = card.querySelector('.modal-text.streetAddress').textContent;
    const postcodeModal = card.querySelector('.modal-text.postcode').textContent;
    const birthdayModal = card.querySelector('.modal-text.birthday').textContent;
    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${cardImg}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${cardName}</h3>
                    <p class="modal-text">${cardEmail}</p>
                    <p class="modal-text cap">${cardLocation}</p>
                    <hr>
                    <p class="modal-text">${cellModal}</p>
                    <p class="modal-text">${streetAddressModal}, ${cardLocation}, ${postcodeModal}</p>
                    <p class="modal-text">Birthday: ${birthdayModal}</p>
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

    // Close modal by clicking Escape key
    if(modalContainer.style.display = "block") {
        window.onkeydown = function(e) {
            if ( e.keyCode == 27 ) {
                modalContainer.style.display = "none";
            }
        };
    }
    
    // Go to previous or next person on click of buttons in modal
    const modalPersonPrev = document.getElementById('modal-prev');
    const modalPersonNext = document.getElementById('modal-next');

    modalPersonPrev.addEventListener("click", e => {
        console.log('back')
        if(e.indexOf(card) > 0) {
            console.log('more than 1')
            let prevPerson = modalPerson[modalPerson.indexOf(card) - 1];
            modal(prevPerson, modalPerson);
        } else {
            let prevPerson = modalPerson[11];
            modal(prevPerson, modalPerson);
            console.log('less than 1')
        }
    })

    modalPersonNext.addEventListener("click", e=> {
        console.log('next')
        if(e.indexOf(card) < 12) {
            console.log('more than 1')
            let nextPerson = modalPerson[modalPerson.indexOf(card) + 1];
            modal(nextPerson, modalPerson);
        } else {
            let nextPerson = modalPerson[0];
            modal(nextPerson, modalPerson);
            console.log('less than 1')
        }
    })
}