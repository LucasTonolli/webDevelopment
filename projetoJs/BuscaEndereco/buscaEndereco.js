const $zipCodeField = document.querySelector('input[name="zipcode"]');
const $cityField = document.querySelector('input[name="city"]');
const $stateField = document.querySelector('input[name="state"]');
const $neighborhoodField = document.querySelector('input[name="neighborhood"]');
const $addresField = document.querySelector('input[name="address"]');
const $url = 'https://viacep.com.br/ws/';

$zipCodeField.addEventListener('keyup', function () {
    if ($zipCodeField.value.length === 5) {
        $zipCodeField.value = $zipCodeField.value + '-';
    };

    if ($zipCodeField.value.length === 9) {
        getAddress();
    }
});

// $zipCodeField.addEventListener('blur', 'getAddress')

function getAddress() {
    let zipcodeValue = $zipCodeField.value;
    zipcodeValue = zipcodeValue.replace(/[^\d]/g, '');

    if (zipcodeValue.length !== 8) {
        alert('CEP inválido');
        clearFields();
        return;
    }

    let request = new XMLHttpRequest();
    request.open('GET', $url + zipcodeValue + '/json');

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const $response = JSON.parse(request.responseText);
            if ($response.erro) {
                alert('CEP não encontrado');
                clearFields()
                return;
            }
            $cityField.value = $response.localidade;
            $stateField.value = $response.uf;
            $neighborhoodField.value = $response.bairro;
            $addresField.value = $response.logradouro + ' ' + $response.complemento
        }

        if (request.readyState === 4 && request.status === 404) {
            alert('Url não encontrada');
            clearFields()
        }
    }
    request.send();
}

function clearFields() {
    $cityField.value = '';
    $stateField.value = '';
    $neighborhoodField.value = '';
    $addresField.value = '';
    $zipCodeField.value = '';
}