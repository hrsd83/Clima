// SE CREAN LAS VARIABLES 

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// SE CREAR L ADDVENLISTENER PARA ESCUCHAR CUANDO SE BUSQUE EL CLIMA 

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
});

// SE CREA LA FUNTION PARA BUSCAR EL CLIMA 

function buscarClima(e) {
   e.preventDefault();

    // VALIDACION
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;
  // console.log(ciudad)
  // console.log(pais)

    // CONSULTAR LA API

}

// crear una function de error


