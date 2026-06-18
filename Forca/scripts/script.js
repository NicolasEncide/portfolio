const palavra = obterPalavra();
const letrasChutadas = [];
let tentativas = 6;

console.log(palavra);

// ********************************************* Funções Utilitárias e Eventos **************************************** //

const divMensagem = document.getElementById("mensagem");

function eventoTecla(e) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const letra = e.key.toUpperCase();

    if (alfabeto.includes(letra)) {
        verificarLetra(letra);
    }
}
document.addEventListener("keydown", eventoTecla);

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function atualizarLetrasChutadas() {
    document.getElementById("letras").textContent = letrasChutadas.join(", ");
}

function atualizarForca() {
    const img = document.querySelector("#forca img");
    switch (tentativas) {
        case 5:
            img.src = "./img/cabeca.jpg";
            break;
        case 4:
            img.src = "./img/corpo.jpg";
            break;
        case 3:
            img.src = "./img/perna_esquerda.jpg";
            break;
        case 2:
            img.src = "./img/perna_direita.jpg";
            break;
        case 1:
            img.src = "./img/braco_direito.jpg";
            break;
        case 0:
            img.src = "./img/braco_esquerdo.jpg";
            break;
        default:
            return;
    }
}

// ********************************************* Funções Principais **************************************** //

function obterPalavra() {
    const listaPalavras = {
        "Fruta": ["BANANA", "MAÇÃ", "UVA", "LARANJA", "ABACAXI", "MORANGO", "MELANCIA", "PERA", "AMEIXA", "MANGA", "LIMÃO", "CEREJA", "COCO", "FIGO", "KIWI", "MARACUJÁ", "CAJU", "GOIABA", "MELÃO", "PITANGA"],
        "Nome": ["CARLOS", "MARIANA", "PEDRO", "JULIA", "RAFAEL", "FERNANDA", "LUCAS", "AMANDA", "BRUNO", "CAMILA", "GUSTAVO", "ISABELA", "EDUARDO", "TATIANE", "LEANDRO", "LARISSA", "FELIPE", "SOFIA", "DANIEL", "VANESSA"],
        "Animal": ["CACHORRO", "GATO", "ELEFANTE", "TIGRE", "LEÃO", "ZEBRA", "GIRAFA", "JACARÉ", "URSO", "MACACO", "GORILA", "TUBARÃO", "ÁGUIA", "COBRA", "GOLFINHO", "LOBO", "PAPAGAIO", "RAPOSA", "CAVALO", "PANDA"],
        "País": ["BRASIL", "ARGENTINA", "MÉXICO", "CANADÁ", "FRANÇA", "ALEMANHA", "ESPANHA", "ITÁLIA", "JAPÃO", "CHINA", "ÍNDIA", "AUSTRÁLIA", "RÚSSIA", "PORTUGAL", "EGITO", "GRÉCIA", "TURQUIA", "SUÍÇA", "COREIA", "HOLANDA"],
        "Objeto": ["CADEIRA", "MESA", "CELULAR", "COMPUTADOR", "TELEVISÃO", "RELÓGIO", "CANETA", "LÁPIS", "CADERNO", "MOCHILA", "ÓCULOS", "GARRAFA", "SAPATO", "TOALHA", "SOFÁ", "GELADEIRA", "ESPELHO", "CHAVE", "LANTERNA", "CONTROLE"]
    };

    const arrayChaves = Object.keys(listaPalavras),
        chaveAleatoria = arrayChaves[Math.floor(Math.random() * arrayChaves.length)],
        arrayDica = listaPalavras[chaveAleatoria],
        palavra = arrayDica[Math.floor(Math.random() * arrayDica.length)],
        divPalavra = document.getElementById("palavra");

    for (let i = 1; i <= palavra.length; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "letra");
        div.setAttribute("id", i-1);
        divPalavra.appendChild(div);
    }

    document.getElementById("dica").textContent = `Dica: ${chaveAleatoria}`;

    return palavra;
}

function verificarLetra(letra) {
    if (letrasChutadas.includes(letra)) {
        tentativas--;
        atualizarForca();
        if (verificarSeVenceu() === undefined) {
            divMensagem.textContent = `A letra "${letra}" já foi. Você tem ${tentativas} tentativas restantes.`;
            return;
        }
        return;
    }
    if (!removerAcentos(palavra).includes(letra)) {
        tentativas--;
        atualizarForca();
        letrasChutadas.push(letra);
        atualizarLetrasChutadas();
        if (verificarSeVenceu() === undefined) {
            divMensagem.textContent = `Não tem "${letra}" na palavra. Você tem ${tentativas} tentativas restantes.`;
            return;
        }
        return;
    }
    if (removerAcentos(palavra).includes(letra)) {

        for (let i = 0; i < palavra.length; i++) {
            if (removerAcentos(palavra[i]) === letra) {
                document.getElementById(i).textContent = palavra[i];
            }
        }
        
        letrasChutadas.push(letra);
        atualizarLetrasChutadas();
        if (verificarSeVenceu()) {return;}
        divMensagem.textContent = `Boa! Tem "${letra}" na palavra. Você tem ${tentativas} tentativas restantes.`;
        return;
    }
}

function verificarSeVenceu() {
    if (tentativas === 0) {
        divMensagem.textContent = "Você perdeu o jogo! Que peninha. Recarregue a página para jogar novamente.";
        document.removeEventListener("keydown", eventoTecla);
        return false;
    }
    const divLetras = document.querySelectorAll("#palavra div");
    let contagem = 0;
    divLetras.forEach(div => {
        if (div.textContent != "") {
            contagem++;
        }
    });
    if (contagem === palavra.length) {
        divMensagem.textContent = "Parabéns, você ganhou! Recarregue a página para jogar novamente.";
        document.removeEventListener("keydown", eventoTecla);
        return true;
    }
    return undefined;
}