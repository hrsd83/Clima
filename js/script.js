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

    spinner();// MUESTRA EL SPINNER DE CARGA
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
      console.log(datos);
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
    const {name, main: {temp, temp_max, temp_min} } = datos;
    
    const centigados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    // SCRIPT DEL PAIS A CONSULTAR

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en ${name}`;
    nombreCiudad.style.color = "firebrick";
    nombreCiudad.style.fontSize = "50px"
    nombreCiudad.style.textAlign ='center';

    // SCRIPT DE TEMPERATURA ACTUAL
    const tempActual = document.createElement('div');
    tempActual.style.color = "firebrick";
    tempActual.style.fontSize = "100px"
    tempActual.style.textAlign ='center';
    tempActual.innerHTML = `${centigados} &#8451;`;
    
    // SCRIPT DE TEMPERATURA MAX
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML= `Max: ${max}  &#8451`;
    tempMaxima.style.color = "firebrick";
    tempMaxima.style.fontSize = "40px";
    tempMaxima.style.textAlign = 'center';
    
    
    // SCRIPT DE TEMPERATURA MIN
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML= `Min: ${min}  &#8451`;
    tempMinima.style.color = "firebrick";
    tempMinima.style.fontSize = "40px"
    tempMinima.style.textAlign = 'center';
    
    const resultadodiv = document.createElement('div');
    resultadodiv.appendChild(nombreCiudad);
    resultadodiv.appendChild(tempActual);
    resultadodiv.appendChild(tempMaxima);
    resultadodiv.appendChild(tempMinima);

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
 
  function spinner(){
    
    limpiarHtml();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-chase');
    divSpinner.style.marginLeft = '200px';
    divSpinner.style.width = '100px';
    divSpinner.style.height = '100px'; 
    
    divSpinner.innerHTML = `
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    `;
    
    resultado.appendChild(divSpinner);
  }
  
  
  


