//Clase usuario:
class usuario {
  constructor(correo, tiempoRecord, tiempoUltimaJugada) {
    this.correo = correo;
    this.tiempoRecord = tiempoRecord;
    this.tiempoUltimaJugada = tiempoUltimaJugada;
  }
}
//variables globales:
var contadorTiempo;
var mensajeContador;
var tablero;
//funcion para activar el tiempo del juego:
function activarTiempo() {
  detenerTiempo()
  
  

  document.getElementById("conteoInicio").style.display = "block"
  var contador = 0;

  contadorTiempo = window.setInterval(function () {
    contador++;
    document.getElementById('tiempoPartida').innerText = contador;
  }, 1000);
  mensajeContador.innerText = "";
  contador.innerText = "";

}
//funcion para detenerel tiempo del juego:
function detenerTiempo() {
  clearInterval(contadorTiempo);
}
//funcion para evaluar si el usuario acerto todas las cartas:
function acertoTodasLasCartas() {
  mensajeContador = document.getElementById("contador-acertaste");
  mensajeContador.innerText = cartasAcertadas;
 tablero = document.getElementById("tabla-de-juego");
  var h1Ganador = document.getElementById("ganador");
  console.log(cartasAcertadas)


  if (cartasAcertadas == 8) {
    h1Ganador.style.display = "block";
    tablero.style.display = "none";
    detenerTiempo()


  }

}

//eventos:
var btnIniciar = document.getElementById("iniciar");
btnIniciar.onclick = activarTiempo;




//contador de las cartas acertadasd:
var cartasAcertadas = 0;


// Seleccionamos todas las cartas con la clase 'flip-card'
const cartasVolteadas = document.querySelectorAll('.flip-card');

// Variable para almacenar las cartas seleccionadas
let tarjetas_volteadas = [];

// Variable para evitar que el usuario pueda hacer clic en más de dos cartas al mismo tiempo
let canFlip = true;

// Recorremos las cartas para asignar el evento de clic
cartasVolteadas.forEach(cartasVolteadas => {
  cartasVolteadas.addEventListener('click', function () {
    if (!canFlip || cartasVolteadas.classList.contains('flipped')) {
      return; // Si la carta ya está volteada o no se puede hacer flip, no hacemos nada
    }

    // Volteamos la carta
    cartasVolteadas.classList.add('flipped');

    // Añadimos la carta a la lista de cartas volteadas
    tarjetas_volteadas.push(cartasVolteadas);

    // Si tenemos dos cartas volteadas, comparamos si son iguales
    if (tarjetas_volteadas.length === 2) {
      canFlip = false; // Evitamos hacer clic en más cartas mientras estamos comparando

      const [firstCard, secondCard] = tarjetas_volteadas

      // Comparamos si las cartas son iguales usando el atributo 'data-id' o algún otro criterio
      if (firstCard.dataset.id === secondCard.dataset.id) {
        cartasAcertadas++;
        console.log(firstCard.dataset.id)
        var acertaste = document.getElementById("acertaste");
        acertaste.style.display = "block";
        setTimeout(() => {
          acertaste.style.display = "none";
        }, 1000)

        //llamado a la funcion para evaluar si el usuario acerto todas las cartas:
        acertoTodasLasCartas();


        // Si son iguales, dejamos las cartas volteadas
        tarjetas_volteadas = []; // Reseteamos la lista de cartas volteadas
        canFlip = true;
      } else {
        // Si no son iguales, las volteamos de nuevo después de un breve retraso
        var fallaste = document.getElementById("fallaste");
        fallaste.style.display = "block";
        setTimeout(() => {
          fallaste.style.display = "none"
        }, 1000)
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          tarjetas_volteadas = []; // Reseteamos la lista de cartas volteadas
          canFlip = true;
        }, 1000); // Esperamos 1 segundo antes de voltearlas de nuevo
      }
    }
  });
});