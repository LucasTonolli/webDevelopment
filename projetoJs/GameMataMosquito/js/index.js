function startGame(){
    var level = document.getElementById('level').value;
    if (level === ''){
        alert('Selecione um nível para iniciar um jogo');
        return false;
    }
    window.location.href = 'game.html?' + level;
}