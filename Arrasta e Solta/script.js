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

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

// Toda área que for feita para arrastar e soltar, tem que ter esse 3 eventos abaixo
// dragOver -> Função criada para detectar onde o objeto arrastado deve ficar
// dragLeave -> detecta a saída do obejto q está sendo rastreado dentro do local q ele deve ficar
// drop -> 
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});


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
    e.preventDefault();
    // class será adicionada quando o objeto arrastado entrar na área desejada
    e.currentTarget.classList.add('hover');
}

function dragLeave(e) {
    // class será removida quando o objeto arrastado sairr da área desejada
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    console.log('soltou');
}