let currentQuestion = 0;
let correctAnswers = 0; // var que armazena os acertos do user

showQuestion()

// Events do botão para realizar teste novamente
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

function showQuestion() {
    
    // console.log('currentQuestion',currentQuestion);
    if (questions[currentQuestion]) {

        // var q armazena objeto com a questões, respostas e alternativas
        let q = questions[currentQuestion];

        // Definindo a barra de progresso de acordo com as respostas certas
        // estamos pegando "currentQuestion" e divindo por questions.length ou seja pelo tamanho total
        // de questoes q sempre será 10, mas currentQuestion é alterado a cada aternativa escolhida do user
        // fazendo com que currentQuestion tenha sempre um número diferente para dividir por questions.length
        // (currentQuestion está sendo atualizada dentro da função optionClickEvent() )
        // e aṕos essa divisao nós pegamos a porcetagem com * 100 e definimos a barra de progresso
        // pelo "style.width" como mostra logo abaixo
        // Math.floor apenas para arredondar os números pois alguns navegadores
        // costuma quebrar com números cheios de casas decimais
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`

        // scoreArea  está none pq é onde irá mostrar quantas questões o user acerttou
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
        finishQuiz();
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
        finishQuiz();
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

function finishQuiz() {

    // Math.floor apenas para arredondar os números pois alguns navegadores
    // costuma quebrar com números cheios de casas decimais
    // Aqui estamos definindo em porcetagem a qtd de acertos do user
    // ou seja temos "correctAnswers" q aramzena as respostas corretas e
    // questions.length que me trás o total de perguntas, então dividimos
    // e multiplciamos por 100 obtendo assim a porcetagem de acertos do usuário
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Estude mais um pouco. '
        document.querySelector('.scorePct').style.color = '#FF0000'
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom. '
        document.querySelector('.scorePct').style.color = '#FFF000'
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns. '
        document.querySelector('.scorePct').style.color = '#0d630d'
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

    // setando para block para que a pontuação exiba
    document.querySelector('.scoreArea').style.display = 'block';
    // setando para none para q as perguntas suma
    document.querySelector('.questionArea').style.display = 'none';
    // setando para 100% para que a barrinha de progresso vá a té o final
    document.querySelector('.progress--bar').style.width = '100%';
}

// Função que reseta tudo, esse botão aparece no final para o suuário 
// fazer os teste de novo
function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}