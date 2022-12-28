
/*Nível de dificuldade*/
var tempoMosquito;
var level = window.location.search;
var tempo = 10;

/*Cronômetro*/
var cron = setInterval(function(){
    tempo-=1;
    document.getElementById('timer').innerHTML = tempo;
    if (tempo < 0) {
        clearInterval(cron);
        clearInterval(createMosquito);
        window.location.href = 'vitoria.html';      
    } else {

    }
}, 1000);

/*Área do Jogo*/
var largura;
var altura;

/*Controle de vidas*/
var life = 1; 


/*Nível de dificuldade*/
level.replace('?', '');

if (level === 'normal'){
    tempoMosquito = 2000;
} else if (level === 'dificil') {
    tempoMosquito = 1500;
} else{
    tempoMosquito = 1000;
}

/*Área do Jogo*/

function adjustGameZone(){
    largura = window.innerWidth;
    altura = window.innerHeight;
}

adjustGameZone();


/*Criação e posicionamento do mosquito*/
function randomicPosition() {
    //Remover mosquito
    var oldMosquito = document.getElementById('mosquito');

    if (oldMosquito){
        oldMosquito.remove();
        if (life > 3) {
           window.location.href = 'game_over.html';
        } else{
            document.getElementById('v' + life).src = "../assets/imagens/coracao_vazio.png";
            life++;
        }
    }
    var posX = Math.floor(Math.random() * largura) - 90;
    var posY = Math.floor(Math.random() * altura) - 90;

    posX = posX < 0 ? 0 : posX;
    posY = posY < 0 ? 0 : posY;

    /*Criação do mosquito*/
    var mosquito = document.createElement('img');
    mosquito.src = '../assets/imagens/mosquito.png';
    mosquito.classList.add(randomicSize());
    mosquito.classList.add(randomicSide());
    mosquito.style.position = 'absolute';
    mosquito.style.left = posX + 'px';
    mosquito.style.top = posY + 'px';
    mosquito.id = 'mosquito';
    mosquito.onclick = function(){
        this.remove();
    }
    document.body.appendChild(mosquito);
}

/*Adição de classe para tamanho da imagem*/
function randomicSize(){
    var sizeClass = Math.floor(Math.random() * 3);
   
    switch (sizeClass){
        case 0: 
            return 'mosquito-1';
        case 1: 
            return 'mosquito-2';
        case 2:
            return 'mosquito-3';
    }
}

/*Adição de classe para lado da imagem*/
function randomicSide(){
    var sideClass = Math.floor(Math.random() * 2);
   
    switch (sideClass){
        case 0: 
            return 'sideA';
        case 1: 
            return 'sideB';
    }
}

