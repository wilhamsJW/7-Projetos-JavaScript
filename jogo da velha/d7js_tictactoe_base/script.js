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

// função resete() sendo chamada aqui pq é responsavel pelo reset inicial do jogo
reset()

function itemClick(e) {
    // console.log('ev', e)
    // target.getAttribute -> pega o valor da div q está recebendo o click
    // precisamos disso para saber qual quadrado o user clikou
    // olhe no html como elas foram definidas e veja q é a mesma definição
    // do bjeto acima square
    var item = e.target.getAttribute('data-item');
    
    // Adicionando 'x' ou '0' dentro do objto
    if (playing && square[item] === '') {
        
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
        togglePlayer();
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
    checkGame();
}

// Renderiza a vez de quem é a vez de jogar e de quem ganhou
function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

// Alterna jogadores
function togglePlayer() {
    player = (player === 'x') ? '0' : 'x';
    renderInfo();
}

function checkGame () {
    if (checkWinnerFor('x')) {
        warning = 'O "x" Venceu!'
        playing = false
        console.log('venceu o x')
    } else if (checkWinnerFor('0')) {
        warning = 'O "0" Venceu!'
        playing = false
        console.log('venceu o 0')
    } else if (isFull()) {
        warning = "Deu empate"
        playing = false
        console.log('empate')
    }
}

function checkWinnerFor(player) {

    // console.log('plauer', player)

    // POssiblidades que o player pode ganhar o jogo, baseada nos dataitem das divs no html
    var possiblidades = [
        'a1, a2, a3',
        'b1, b2, b3',
        'c1, c2, c3',

        'a1, b1, c1',
        'a2, b2, c2',
        'a3, b3, c3',

        'a1, b2, c3',
        'a3, b2, c1',
    ];

    // console.log('square', square)

    for (let w in possiblidades) {

        // Usando split para transformar em um array, aonde tiver vírgula será transformado em um novo array
        let pArray = possiblidades[w].split(','); // 'a3, b2, c1'
        // console.log('pArray', pArray)
        // console.log('square', square)
        // console.log('player', player)

        // let vencedor = pArray.every( (option) => {
        //     square[option] == player
        //     // console.log('option',option)
        //     // console.log('square[option]',square[option])
        //     // console.log('player',player)
        // });

        var squareArray = square.map(function(obj) {
            return Object.keys(obj).map(function(chave) {
                return obj[chave];
            });
        });

        console.log('squareArray', squareArray)

        var vencedorX = square.filter((item) => {
            return item == 'x'
        })

        console.log('vencedorX', vencedorX);

        // A função every() retorna true ou false de acordo com a validação passada
        var vencedor = pArray.every((option) => {

            if (square[option] == player){
                // console.log('player', player)
                // console.log('square[option]', square[option])
                return true
            } else {
                // console.log('não são iguais')
                return false
            }

        });
        
        // console.log('vencedor', vencedor)
        if (vencedor) {
            console.log('venceu')
            return true;
        }
    }
    return false;
};

function isFull() {

    for(let i in square) {
        if (square[i] === '') {
            return false;
        }
    };

    return true;
}