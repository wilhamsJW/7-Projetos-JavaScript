let currentQuestion = 0;
let correctAnswers = 0; // var que armazena os acertos do user

showQuestion()

function showQuestion() {
    console.log('currentQuestion', currentQuestion);
    if (questions[currentQuestion]) {

        // var q armazena objeto com a questões, respostas e alternativas
        let q = questions[currentQuestion];
        console.log('q',q);

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        // Exibindo a pergunta na tela
        document.querySelector('.question').innerHTML = q.question;
        // document.querySelector('.options').innerHTML = "";

        // *** Primeira Forma de mostrar as alternativas na tela: ***
        // Utilizando for in para percorre o array com as alternativas e exibir na tela
        // só que aqui definimos o contéudo q vai aparecer na tela diretamente dentro do for
        // o que irá custar um processamento a mais para renderização, o ideal seria da segunda forma abaixo:
        // for (let i in q.options) {
        //     document.querySelector('.options').innerHTML += `<div>${q.options[i]}</div>`;
        // }

        // *** Segunda Forma ***
        let optionHtml = "";
        for (let i in q.options) {
            // lembrese que precisa do += para haver a concatenação, sem isso só iria pegar o último valor
            // parseInt() está sendo usado para que fique sendo apresentado os números de 1 em diante
            // e não apareça o zero em diante como no mundo da programação, o parseInt() tranforma num inteiro
            // até então era uma string, se vc der um typeof de "i" vc verá q é uma string,
            // para que possa haver a concatenação precisa ser um inteiro ou número e não uma string
            // parseInt converteu a string para número
            // se der este console, verá q o retorno é de number console.log(typeof parseInt(i));
            optionHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionHtml;

        // Fazendo com que todas as alternativas tenha um evento de clik
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })

    } else {

    }
}

function optionClickEvent(e) {
    
    // Armazena a alternativa pelo índice do array que o user acabou de clikar
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    // Note que todas as respostas são iguais ao índice de cada alternativa
    // isso facilita na hora de comparar para saber a resposta correta
    // então é só comparar a resposta com o índice, se forem iguais é a resposta correta
    // olhe o arquivo questions nessa mesma pasta e compare
    if (questions[currentQuestion].answer === clickOption) {
        // Adicionando +1 se o user acertou a respostaa
        correctAnswers++;
    } else {
        
    }

    // currentQuestion++ é o que faz as perguntas serem passadas para próxima pergunta
    // currentQuestion++ é setado no início como "0" e passado assim: questions[currentQuestion]
    // dentro da funcção showQuestion(), questions é um obejto no arquivo questions.js, desa forma
    // se currentQuestion++ for "0" irá mostrar a primeira pergunta, mas após passar dentro dessa função
    // nós setamos currentQuestion++ acrescentando mais "1" e invocamos showQuestion() novamenteq agora
    // terá um novo valor em currentQuestion++
    currentQuestion++;
    console.log('currentQuestion',currentQuestion);
    // Para atualizar a tela novamente
    showQuestion();
}