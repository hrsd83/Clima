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
    .then(datos => {

      // LIMPIAR EL HTML PREVIO
      limpiarHtml()

      if(datos.cod === '404'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Disculpa, esta ciudad no se encuentra',
          
        })
        return
      }
      mostrarClima(datos)
    })
  }

  function mostrarClima(datos){
    const {main: {temp, temp_max, temp_min} } = datos;
    
    const centigados = kelvinACentigrados(temp);

    const tempActual = document.createElement('div');
    tempActual.style.color = "firebrick";
    tempActual.style.fontSize = "80px"
    tempActual.style.marginLeft = "120px"

    tempActual.innerHTML = `${centigados} &#8451;`;
    
    const resultadodiv = document.createElement('div');
    resultadodiv.appendChild(tempActual);

    resultado.appendChild(resultadodiv)
  } 

  // CREAR FUNTION DE GRADOS KELVIS A CENTIGRADOS

  const  kelvinACentigrados = grados => parseInt(grados - 273.15);
  

  // FUNTION PARA LIMPIAR
  function limpiarHtml(){
    while(resultado.firstChild){
      resultado.removeChild(resultado.firstChild);
    }
  }


