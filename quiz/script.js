let currentQuestion = 0;

showQuestion()

function showQuestion() {
    if (questions[currentQuestion]) {

        // var q armazena objeto com a questões, respostas e alternativas
        let q = questions[currentQuestion];

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        // Exibindo a pergunta na tela
        // document.querySelector('.question').innerHTML = q.question;
        // document.querySelector('.options').innerHTML = "";

        // *** Primeira Forma de mostrar as alterantivas na tela: ***
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
            optionHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionHtml;

    } else {

    }
}