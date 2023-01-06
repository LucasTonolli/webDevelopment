// Load field data
let selectMonth = document.getElementById('month');
let months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
for (let i = 1; i <= 12; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = months[i - 1];
    selectMonth.appendChild(option);
}

let selectYear = document.getElementById('year');
let currentYear = new Date();
currentYear = currentYear.getFullYear();

let years = [currentYear];
for (i = 1; i < 5; i++) {
    years.unshift(currentYear - i);
}

for (i in years){
    let option = document.createElement('option');
    option.value = years[i];
    option.innerHTML = years[i];
    selectYear.appendChild(option);
}

//Classes
class Cost{
    constructor(description, type, value, day, month, year){
        this.description = description;
        this.type = type;
        this.value = value;
        this.day = day;
        this.month = month;
        this.year = year;
    }

    validateData(){
        for (let i in this){
            if(!this[i])
               return false;     
        }
        return true;
    }


}

class DB{

    constructor(){
        let id = window.localStorage.getItem('id');

        if (!id){
            window.localStorage.setItem('id', 0);
        }
        
    }

    addCostToLocalStorage(cost){   
        let id = window.localStorage.getItem('id');          
        window.localStorage.setItem(id, JSON.stringify(cost));
        window.localStorage.setItem('id', ++id);
    }

    loadCosts(){
        let idStorage = window.localStorage.getItem('id');

        let costs = [];
        for (i = 0; i < idStorage; i++){
            let cost = JSON.parse(window.localStorage.getItem(i));

            if (cost === null)
                continue;
            cost.id = i;
            costs.push(cost);
        }
    
        return costs;
    }

    search(filterCost){
        let costs = this.loadCosts();

        return costs.filter(cost => {
            for (let attr in filterCost){
                if (filterCost[attr]){
                    if(cost[attr] !== filterCost[attr])
                        return false;
                }
            }
            return true;
        })
    }

    remove(id){
        window.localStorage.removeItem(id);
    }
}

let db = new DB();

//Functions
function createCost(){
    let year = document.getElementById('year');
    let month = document.getElementById('month');
    let day = document.getElementById('day');
    let type = document.getElementById('type');
    let description = document.getElementById('description');
    let value = document.getElementById('value');
      
    let cost = new Cost(description.value, type.value, value.value, day.value, month.value, year.value);
    

    // Variáveis p/ modal
    let modalTitle = document.getElementById('responseCreateCostLabel');
    let responseTitle = document.getElementById('response-title');
    let responseContent = document.getElementById('response-content');
    let responseButton = document.getElementById('response-button');

    if (cost.validateData()){
        db.addCostToLocalStorage(cost);
    
        modalTitle.classList.add('text-success');
        modalTitle.classList.remove('text-danger');
        modalTitle.innerHTML = 'Despesa cadastrada com sucesso';

        responseTitle.innerHTML = 'Perfeito';
        
        responseContent.innerHTML = `A despesa ${cost.description} com o valor de R$ ${cost.value} foi cadastrada com sucesso`;
        
        responseButton.classList.add('btn-success');
        responseButton.classList.remove('btn-danger');
        responseButton.innerHTML = 'Voltar';

        clearFields(description, year, month, day, type, description, value);
        
        $('#responseCreateCost').modal('show');
        
    } else {
    
        modalTitle.classList.add('text-danger');
        modalTitle.classList.remove('text-success');
        modalTitle.innerHTML = 'Informações faltando';

        responseTitle.innerHTML = 'Despesa não pode ser cadastrada';
        
        responseContent.innerHTML = 'Algumas informações estão faltando, verifique os campos do cadastro';
        
        responseButton.classList.add('btn-danger');
        responseButton.classList.remove('btn-success');
        responseButton.innerHTML = 'Corrigir';

        $('#responseCreateCost').modal('show');
    }
}

function loadCostsTable(filteredCosts = null){

    let tbody = document.getElementById('costs-tbody');
    tbody.innerHTML = '';

    let costs = filteredCosts ? filteredCosts : db.loadCosts();
    
    costs.forEach(function(d){

        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`;
        switch(parseInt(d.type)){
            case 1: d.type = 'Alimentação';
            break;
            case 2: d.type = 'Educação';
            break;
            case 3: d.type = 'Transporte';
            break;
            case 4: d.type = 'Lazer';
            break;
            case 5: d.type = 'Saúde';
            break;
        }
        row.insertCell(1).innerHTML = d.type;
        row.insertCell(2).innerHTML = d.description;
        row.insertCell(3).innerHTML = new Intl.NumberFormat('BRL',  { style: 'currency', currency: 'BRL' }).format(d.value);

        let button = document.createElement('button');
        button.className = 'btn btn-danger';
        button.id = `id_cost_${d.id}`;
        button.innerHTML = '<i class="fa-solid fa-x"></i>';
        button.onclick = function(){

            let id = this.id.replace('id_cost_', '');
            let buttonRemove = document.getElementsByClassName('btn-remove')[0];         
            buttonRemove.onclick = function(){
                db.remove(id);
                window.location.reload();
            }

            $('#removeCostConfirm').modal('show');
   
        };
        row.insertCell(4).append(button);
    });
}

function clearFields(...fields){
    fields.forEach(field => {
        field.value = '';
    });
}

function filterCosts(){
    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    let day = document.getElementById('day').value;
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;
    let value = document.getElementById('value').value;

    let filterCost = new Cost(description, type, value, day, month, year);

    loadCostsTable(db.search(filterCost));
}

function statisticsCosts(){
    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    let day = document.getElementById('day').value;
    let type = document.getElementById('type').value;

    let statisticCost = new Cost('', type, '', day, month, year);

    let allCosts = db.loadCosts();
    let filteredCosts = db.search(statisticCost);
    
    let sumAllCosts = allCosts.reduce((sum, cost) => sum + parseFloat(cost.value), 0);
    let sumFilteredCosts = filteredCosts.reduce((sum, cost) => sum + parseFloat(cost.value), 0);

    
    let elementTotal = document.getElementById('total');
    elementTotal.classList.add('text-info');
    let total = new Intl.NumberFormat('BRL',  { style: 'currency', currency: 'BRL' }).format(sumAllCosts);
    elementTotal.innerHTML = `Despesas totais: ${total}`;

    let elementPartial = document.getElementById('partial');
    elementPartial.classList.add('text-info');
    let partial = new Intl.NumberFormat('BRL',  { style: 'currency', currency: 'BRL' }).format(sumFilteredCosts)
    
    let elementPercent = document.getElementById('percent');
    let percent = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format((sumFilteredCosts/sumAllCosts) * 100);

    if (sumFilteredCosts === 0){
        elementPartial.innerHTML = 'Nenhuma despesa encontrada';
        elementPercent.innerHTML = '';
        return;
    }

    elementPartial.innerHTML = `Despesas filtradas: ${partial}`;

    elementPercent.innerHTML = `Essas despesas são ${percent}% da suas despesas totais`;

    if (percent >= 80) {
        elementPercent.className = 'text-danger';
    } else if (percent >= 50){
        elementPercent.className = 'text-warning';
    } else {
        elementPercent.className = 'text-secondary';
    }

}

