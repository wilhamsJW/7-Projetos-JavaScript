let currentColor = 'black';
// Para trabalhar com canvas primeiro temos que selecionar ele pela id e depois temos que pegar o contexto
// esse contexto é pego em 2d para aplicar os desenhos, podemos trabalghar tbm com 3d mas aí já é um assunto
// mais particular sobre o canvas e o foco é JS
let screen = document.querySelector('#tela');
let contexto = screen.get.Context('2d')

document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
});

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