//1. variavel para guardar o numero do contador 
let contador = Number(localStorage.getItem('valorsalvo')) || 0;

//2. Referência ao elemento de texto que mostra o número
const elementoValor = document.getElementById('valor');

elementoValor.innerText = contador;
atualizarCor();

//nova função para mudar a cor 
function atualizarCor() {

    elementoValor.classList.remove('positivo', 'negativo', 'neutro');

    if (contador > 0) {
        elementoValor.classList.add('positivo');
    }else if (contador < 0) {
        elementoValor.classList.add('negativo');
    }else {
        elementoValor.classList.add('neutro');
         // volta para a cor padrão
    }
}

//3. função para aumentar 
function aumentar () {
    contador++; // soma1 
    elementoValor.innerText = contador; // atualiza o HTML
    atualizarCor();
    localStorage.setItem('valorsalvo', contador);
}

// 4. Função para diminuir 
function diminuir(){
    contador--; // subtrai 1
    elementoValor.innerText = contador;
    atualizarCor();
    localStorage.setItem('valorsalvo', contador);
}
function zera(){
    contador=0; 
    elementoValor.innerText = contador;
    atualizarCor();
    localStorage.setItem('valorsalvo',contador);
}
//5. Lógica para mudar o tema 
const btnTema = document.getElementById('btn-tema');

btnTema.addEventListener('click', () => {
    // o "toggle" adiciona a classe se não existir, e remove se existir
    document.body.classList.toggle('dark-mode');  
});