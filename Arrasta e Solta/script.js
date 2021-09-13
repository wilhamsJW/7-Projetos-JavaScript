// Demosntração de uso de ecento click
document.querySelector('.neutralArea').addEventListener('click', (e) => {
    
    // e.target me trás a div exata q foi clikada
    console.log('e.target', e.target);
    // e.currentTarget me trás a div q está recebendo o evento
    console.log('e.currentTarget', e.currentTarget);
    // apenas para alterar a cor da borda quando foi clikada
    e.target.style.border = '1px solid #ff0000'
})

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

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