const form = document.getElementById('postalCodeForm');
const apiUrl = 'https://geo.api.gouv.fr/communes?codePostal=';
const communeSelect = document.getElementById('commune');
const errorMessage = document.getElementById('communesList');
communeSelect.hidden = true ;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const postalCode = document.getElementById('postalCode').value;
    const postalCodeRegex = /^\d{5}$/;

    if (!postalCodeRegex.test(postalCode)) {
        errorMessage.textContent = 'Veuillez entrer un code postal valide (5 chiffres).';
        communeSelect.hidden = true ;
        return;
    }

    fetch(apiUrl + postalCode)
     .then(response => {
            return response.json();
        })
     .then(data => {
            if (data.length === 0) {
                errorMessage.textContent = 'Le code postal demandé n\'existe pas.';
                communeSelect.hidden = true ;
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