// Initial Data

var square = {
    a1: '',
    a2: '',
    a3: '',

    b1: '',
    b2: '',
    b3: '',

    c1: '',
    c2: '',
    c3: '',
};

var player = '';
var warning = '';
var playing = false;

//       *** Events *** 

document.querySelector('.reset').addEventListener('click', reset)

// Selecionando todas as divs q vamos trabalhar e percorrendo elas com forEach
// Note que o parãmetro da função itemClick() é enviado automaticamente apenas
// por cita-la após a definição do evento click  
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

//  *** Fazendo a mesma coisa que o código acima só que com um de cada vez
// após definir o evento click e chamar a função, automaticamente o parãmetro
// será passado a função itemClick()
// document.querySelector('div[data-item=a1]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=a2]').addEventListener('click', itemClick);
// document.querySelector('div[data-item=a3]').addEventListener('click', itemClick);




//          *** Functions ***

function itemClick(e) {
    // console.log('ev', e)
    // target.getAttribute -> pega o valor da div q está recebendo o click
    // precisamos disso para saber qual quadrado o user clikou
    // olhe no html como elas foram definidas e veja q é a mesma definição
    // do bjeto acima square
    var item = e.target.getAttribute('data-item');
    
    // Adicionando 'x' ou '0' dentro do objto
    if (square[item] === '') {
        
        // estou pegando o objeto square na posição atual, a posição é 'item'
        // item tem o mesmo nome das chaves do objeto square, por isso consigo
        // adicionar player no objeto com o mesmo nome do atributo capturado da tag
        // em item 
        // ex: vamos supor que item venha com 'a1' e player seja 'x'
        // ficaria assim square[a1] = x
        // então a posição passaria a ter um valor existente
        square[item] = player;

        // e então chamo renderSquare()
        renderSquare();
    }
}

function reset() {

    warning = '';

    var random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : '0';

    // Limpa todo o tabuleiro
    for (let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {

    // Percorro todos os itens para saber qual possui algum valor
    // lembre-se q esse valores são inseridos na função itemClick()
    // se possuir algum valor eu adiciono eles na tela com:
    // item.innerHTML = square[i];
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)

        item.innerHTML = square[i];

        // Poderia fazer esse if abaixo para adicionar os itens na tela
        // mas o código acima é mais inteligente
        // if (square[i] !== '') {
        //     item.innerHTML = square[i];
        // } else {
        //     item.innerHTML = '';
        // }
    }
}

function renderInfo() {

    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

}