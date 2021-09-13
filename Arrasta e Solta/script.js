// Demosntração de uso de ecento click
document.querySelector('.neutralArea').addEventListener('click', (e) => {
    
    // e.target me trás a div exata q foi clikada
    console.log('e.target', e.target);
    // e.currentTarget me trás a div q está recebendo o evento
    console.log('e.currentTarget', e.currentTarget);
    // apenas para alterar a cor da borda quando foi clikada
    e.target.style.border = '1px solid #ff0000'
})