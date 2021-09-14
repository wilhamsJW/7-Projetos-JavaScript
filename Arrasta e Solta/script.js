// Demosntração de uso de ecento click
document.querySelector('.neutralArea').addEventListener('click', (e) => {
    
    //           *** IMPORTANTE ***
    // e.target me trás a div exata q foi clikada
    // console.log('e.target', e.target);
    // e.currentTarget me trás a div q está recebendo o evento
    // console.log('e.currentTarget', e.currentTarget);
    // apenas para alterar a cor da borda quando foi clikada
    // e.target.style.border = '1px solid #ff0000'
})

//      *** Código começa aqui  ***

let areas = {
    a: '',
    b: '',
    c: ''
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

// Toda área que for feita para arrastar e soltar, tem que ter esse 3 eventos abaixo
// dragOver -> Função criada para detectar onde o objeto arrastado deve ficar
// dragLeave -> detecta a saída do obejto q está sendo rastreado dentro do local q ele deve ficar
// drop -> detecta quando o elemento sai do local desejado ou seja quando
// o user vem com o elemento sendo arrastado e solta dentro do local desejado
// mas na view temos 3 locais a serem soltos, então preciso saber qual deles
// está sendo solto
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

// dragover -> Qunado o elemento entra na área selecionada
// dragleave -> Quando o elemento sai da área desejada
// drop -> quando o user solta o elemento
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);


// dragStart a função é disparado quando vc começa arrastar
// e irá colocar uma opacidade no elemento para que fique nítido ao user
// que está movendo um item e da mesma forma é dragEnd
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}
// dragEnd a função é disparado quando vc solta o click
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

function dragOver(e) {
    // é necessário o preventDefault aqui para que o drop seja acionado
    // o comportamento natural é negar o drop, então se eu coloco um preventDefalt
    // estou parando esse comportamento de negar o drop e passo a aceitar o drop
    // para entender melhor de um log no drop sem o preventDefault e verá q a função não executa
    // mas se colocar o preventDefault() o log dentro do drop aparecerá
    
    if (e.currentTarget.querySelector('.item') === null ) {
        e.preventDefault();
        // class será adicionada quando o objeto arrastado entrar na área desejada
        // mas se ja tiver um item dentro a class não será adicionada, por isso
        // q a validação é para ver se é igual a 'null' pq se é null é pq não tem item dentro
        // então pode adicionar, mas se não for null é pq tem item dentro e não pode adicionar
        e.currentTarget.classList.add('hover');
    }
    
}

function dragLeave(e) {
    // class será removida quando o objeto arrastado sairr da área desejada
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    // É preciso remover a class hover (class q trás opacidade) pq se não
    // após soltar o elemento no local desejado irá ficar com a opacidade
    // estática e não é isso que eu quero, o que eu quero é que a opacidade
    // seja um efeito que muda a cor quando o user passa o objeto por cima
    // do local desejado, apenas para melhorar a expericenia do user
    // e ele saber que ali é o campo correto a se soltar o objeto
    e.currentTarget.classList.remove('hover');

    // Em dragStart estou adicionando a class dragging e em dragEnd eu removo
    // dessa forma o objeto arrastado sempre estar com a class da opacidade
    // então para identificar o objeto selecionado basta achar a class 'dragging'
    // dessa forma eu tenho aqui o item selecionado ou sendo arrastado pelo user
    let ItemSelecionado = document.querySelector('.item.dragging')

    // e.currentTarget.querySelector('.item') é a class q vai ser adicinada
    // para que o elemento arrastado seja solto dentro do local desejado
    // com o quadrado vazio é óbvio que essa class será 'null', etnão se for null
    // eu adiciono ela com appendChild( ItemSelecionado ) passando o valor da var
    // ItemSelecionado em 'e.currentTarget.appendChild'
    // Dessa forma tbm impede que mais de um item seja adicionado no mesmo local
    // pq? pq se item foi não for igual a null é sinal que já tem o meu elemento
    // hmtl lá dentro 
    if (e.currentTarget.querySelector('.item') == null ) {
        e.currentTarget.appendChild( ItemSelecionado );
        updateAreas();
    }

}

// Functions Neutral Areal - Para que os elmentos uma hora arrastados possam voltar
// para o local de origem caso o usuário queira q eles volte
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}
// Adicionando na área principal (a que contém os elementos), os itens novamente
// para que o user consiga trazelos de volta, o bom é que não precisa de validação
// pq mesmo q já tenha um item ele pode colocar outros dentro, diferente do drop acima
// que precisa de validação pq se houver um item não pode entrar outro 
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let ItemSelecionado = document.querySelector('.item.dragging')
    e.currentTarget.appendChild( ItemSelecionado );
    updateAreas();
}

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        // Capturando o atributo (que tbm é uma var), 'name' adicionado no hmtl (olhe o html)
        let name = area.getAttribute('name')

        // Estou entrando dentro de area.querySelector('.item') e veificando se é
        // diferente de 'null' pq se for diferente de null quer dizer que há um item
        // dentro da minha area (esse item foi adicionado na função drop na linha 104)
        // é o item q o user solta dentro da area desejada
        // então se houver esse item lá dentro eu coloco name dentro de areas
        // assim: areas[name]
        // area.querySelector('.item').innerHTML; -> capturando o contéduo de dentro do
        // html, q nesse caso é 1,2 ou 3
        // esse 'name' dentro da condicional if ele me trás o valor do atributo em questão
        // q seria a,b ou c então quando faço isso 'areas[name]' estou acessando o objeto
        // pela chave ou nome (tipo: digamos q name é igual a "A", então irei acessar no meu 
        // objeto a chave com nome "A", podemos acessar pela posição tbm de 0 a 3 mas não é viável nesa situação)
        // obtendo isto vamos dá um valor a 'areas[name]', esse valor é o "area.query....innerHTML"
        // que captura o conteúdo do html q é 1,2 ou 3 e assim tenho o valor definido de areas  
        if (area.querySelector('.item') != null ) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            // Aqui estou setando o tempo todo para q sempre seja null quando não houver
            // item dentro da minha área
            areas[name] = null
        }
    });

    // Monitorando para exibir msg ao user acertar a sequençia
    if (areas.a == '1' && areas.b == '2' && areas.c == '3') {
        document.querySelector('.areas').classList.add('correct');
        alert('Parabéns Vc conseguiu!!!')
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}