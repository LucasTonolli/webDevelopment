function calculate(type, value){
    if (type === 'action') {
        if (value ===  'c') {
            document.getElementById('result').value = '';
        } else if(value === '='){
            var total = eval(document.getElementById('result').value);
            document.getElementById('result').value = total;
        }else{
            document.getElementById('result').value += value;
        }

    } else if ( type === 'value'){
        document.getElementById('result').value += value;
    }
}