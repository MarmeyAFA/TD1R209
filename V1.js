const form = document.getElementById('postalCodeForm');
const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const communeSelect = document.getElementById('commune');
const errorMessage = document.getElementById('communesList');
communeSelect.hidden = true;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const postalCode = document.getElementById('postalCode').value;
    const postalCodeRegex = /^\d{5}$/;

    if (!postalCodeRegex.test(postalCode)) {
        errorMessage.textContent = 'Veuillez entrer un code postal valide (5 chiffres).';
        communeSelect.hidden = true;
        return;
    }

    fetch(apiUrl + postalCode)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                errorMessage.textContent = 'Le code postal demandé n\'existe pas.';
                communeSelect.hidden = true;
            } else {
                communeSelect.hidden = false;
                communeSelect.innerHTML = '';
                data.forEach(commune => {
                    const option = document.createElement('option');
                    option.value = commune.code;
                    option.text = commune.nom;
                    communeSelect.add(option);
                });
                errorMessage.textContent = '';
            }
        })
});

const tempMax = document.getElementById('tempMax');
const apiUrlMeteo = `https://api.meteo-concept.com/api/forecast/daily/0?token=60ccd6b81e9378ac6005821b08b15c14ba80cf5c66af5477711a39a55b40f839&insee=`;

communeSelect.addEventListener('change', async () => {
    const selectedCommune = communeSelect.value;
    fetch(apiUrlMeteo + selectedCommune)
        .then(response => {
            return response.json();
        })
        .then(meteo => {
            data.forEach(meteo => {
            tempMax.textContent = meteo.forecast.tmax;
        })
    })
})
