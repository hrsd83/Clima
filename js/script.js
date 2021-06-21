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
  const ciudad = document.getElementById('ciudad').value;
  const pais = document.getElementById('pais').value;

  // console.log(ciudad)
  // console.log(pais)
 
  if(ciudad === '' || pais === ''){
    // HUBO UN ERROR
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos son obligatorios',
      
    })
    return;
    
  }
  // SE MANDA A LLAMAR LA FUNTION consultarApi con los parametros de (ciudad y pais)
  consultarApi(ciudad, pais);
}

  function consultarApi(ciudad, pais){

    const appId = '18721d885382fc39b9763bd42963f3c3';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => console.log(datos))
    
  }

  


