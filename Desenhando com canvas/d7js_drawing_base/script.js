let currentColor = 'black';
let canDraw = false; // canDraw -> tradução seria pode desenhar

// Para trabalhar com canvas primeiro temos que selecionar ele pela id e depois temos que pegar o contexto
// esse contexto é pego em 2d para aplicar os desenhos, podemos trabalghar tbm com 3d mas aí já é um assunto
// mais particular sobre o canvas e o foco é JS
let screen = document.querySelector('#tela');
let contexto = screen.getContext('2d')

document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
});

/**
 * Passo a passo para desenhar no canvas:
 * - Qunado o click do mouse ABAIXAR, ative o modo desenho
 * - Quando o mouse se MOVER, se o modo desenho estiver ativo, desenhe.
 * - Quando o click do mouse LEVANTAR(ou o user para de clikar no mouse), desative o modo desenho.
 */

//  Eventos que detectam variancias no mouse
// mousedown -> Quando clikamos no mouise
// mousemove -> quando movemos o mouse
// mouseup -> quando soltamos o botão cliakdo
 screen.addEventListener('mousedown', mouseDownEvent);
 screen.addEventListener('mousemove', mouseMoveEvent);
 screen.addEventListener('mouseup', mouseUpEvent);

// esta função serve para que quando o usuário escolhe um cor esta cor precisa ter um destaque
// então aqui estamos setando para que cada cor escolhida tenha esse destaque
function colorClickEvent(e) {
    // Capturando a cor escolhida pelo user com 'data-color' que é uma var dentro do html guardando a cor selcionada
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    // Removendo destaque atual da cor selecionada
    // Note que as class estão sem espaço pois sem class sem espaços é usada quando queremos aceesar uma
    // class quando uma está em um div e a outra eestá em outra, aqui temos a mesma class na mesma div
    // com esses dois nomes 'color active' então selecionamos assim '.color.active'
    document.querySelector('.color.active').classList.remove('active');
    // Adicionando destaque para a cor selecionada
    e.target.classList.add('active');
}

// Função que escuta quando o user  clika no mouse e ativa o modo desenho canvas
function mouseDownEvent() {
    // Setando var canDraw ou 'podeDesenhar' para true
    canDraw = true;
}
// Função que escuta quando o mouse se move, porém ela só vai escutar com uma condição
// que é se canDraw tiver true
function mouseMoveEvent(e) {
    // Validação para impedir que o usuário desenhe se o mouse tiver apenas se movendo
    // para desenhar o mouse tem q estar clikado
    if (canDraw) {
        // e.pageX -> mostra a posição horinzontal do meu mouse
        // e.pageY -> mostra a posição vertical do meu mouse 
        canDraw()
    }
}
// Funcção que escuta quando o user parou de clikar o botão do mouse
function mouseUpEvent() {
    // Setando var canDraw ou 'podeDesenhar' para false
    canDraw = false;
}