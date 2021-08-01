document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (!input) {
        alert('Digite o nome do local!')
    } else {
        showWarning('Loading...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`
        let results = await fetch(url)
        let json = await results.json(); // transformando o resultado em json
     
    }

    // appid = a numeração encontrada no final da url se trata da chave concedida quando se cria uma
    // conta na open weather
    // &units=metric -> serve para não te trazer os dados em farenheither, isso se econtra
    // mos parãmetros da doc da API https://openweathermap.org/current
    // lang=pt_br -> se encontra na APi tbm em mais informações e mostrará a a abreviação da
    // linguagem
   
})

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}