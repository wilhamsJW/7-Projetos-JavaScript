document.body.addEventListener('keyup', (event) => {
    // event.code me retornar a tecla que o user teclou
    // toLowerCase() -> apenas para deixar tudo minusculo
    playSound(event.code.toLowerCase())
})

document.querySelector('.composer button').addEventListener('click', () => {
    // capturando os valores que o user colocou dentro do input para formar 
    // uma música digitada por ele
    var song = document.querySelector('#input').value;
    
    if (song != '') {
        // split separou por espaço, ou algo vazio e colocou as letras digitas em um
        // novo array
        var songArray = song.split('');
        palyComposition(songArray)
    }
})

function playSound(sound) {
    // Recebemos a tecla acionada da função acima, e armazenei ela em audioElement
    // ou seja só vai tocar o audio nas tags com as id que tem o audio no html
    // As teclas são Q,W,E   A,S,D   Z,X,C, essas tags estão com o audio no html
    // `#s_${sound}` --> estou buscando por id o audio a ser tocado, sound é a 
    // tecla q foi acionada que consrreponde a id no html
    // coloquei o nome das Ids como os mesmo nomes da tag capturada acima em event.code
    var audioElement = document.querySelector(`#s_${sound}`)

    // data-key --> é um atributo de uma tag html, estamos usando isso no hmtl
    // estamos buscando essa tag html para dá um efeito ao usuário clikar em uma
    // tecla do teclado e refletir na tela a letra mudando de cor 
    var keyElement = document.querySelector(`div[data-key='${sound}']`)

    if (audioElement) {
        // para que fique rápido a diferença de um som para o outro
        audioElement.currenTime = 0;
        // play() --> função nativa do JS para tocar o aúdio
        audioElement.play();
    }

    // dando cor na letr que está na tela ao user clikar em uma tecla
    if (keyElement) {
        keyElement.classList.add('active')
        // removendo a class para que não fique com a cor alterada o tempo todo
        setTimeout(() => {
            keyElement.classList.remove('active')
        }, 400)
    }
}

// Toca a musica com as notas ou teclas escolhidas pelo user
function palyComposition(songArray) {
    let wait = 0
    for (let songItem of songArray) {

        setTimeout(() => {
            playSound(`key${songItem}`)
        }, wait)

        wait += 250
        
    }
}