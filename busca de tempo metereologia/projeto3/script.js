document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    // split() = serve para várias coisas, mas aqui está sendo usado para
    // transformar a string em um array para que eu pudesse validar no if abaixo
    // com a propriedade length que irá detectar quantas letras o usuário digitou
    // as aspas vazias dentro do split() fazem com que cada letra tenha um índice
    // e seja um valor dentro do meu array
    // ex: a palavra "João", não será um valor único e sim 4 valores, cada letra
    // se refere a um valor diferente 
    let input = document.querySelector('#searchInput').value.split('');

    // feito inputString pq envio ele na requisição, na requisição não poderia enviar um array divido
    // em várias posições, tenho q enviar uma string completa 
    let inputString = document.querySelector('#searchInput').value;
    
    if (input.length <= 2) {
        clearInfo()
        alert('Digite pelo menos 3 letras!')
    }
    else {
        clearInfo();
        showWarning('Loading...')
        // appid = a numeração encontrada no final da url se trata da chave concedida quando se cria uma
        // conta na open weather
        // &units=metric -> serve para não te trazer os dados em farenheither, isso se econtra
        // mos parãmetros da doc da API https://openweathermap.org/current
        // lang=pt_br -> se encontra na APi tbm em mais informações e mostrará a a abreviação da
        // linguagem
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputString)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`
        let results = await fetch(url)
        let json = await results.json(); // transformando o resultado em json

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAgle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos a cidade procurada!')
        }

    }

})

function showInfo(json) {
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºc</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    // setAttribute = usado em configuração de src, o segundo parãmetro é o valor atual do que será
    // alterado
    // @2x -> no antes do nome da foto siginifica que a foto irá ter um aumneto no seu tamanho, esse valor
    // pode ir até 4
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAgle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}