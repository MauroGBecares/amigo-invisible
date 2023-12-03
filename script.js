const agregar = document.getElementById('btnAgregar')
const textoAmigo = document.getElementById('txtAgregar')
const finalizar = document.getElementById('btnFinalizar')
const listaAmigos = document.getElementById('lista-amigos')
const cargaDatos = document.getElementById('carga-datos')
const main = document.getElementsByTagName('main')
const mensajeValidacion = document.getElementById('mensaje-caja')
const mensajeParrafo = document.getElementById('mensaje')
const textoEmail = document.getElementById('txtEmail')

const amigos = []
const amigosEmails = []

function agregarAmigo() {
    if (textoAmigo.value != "") {
        if (!(validarExistencia(textoAmigo.value, textoEmail.value))){
            return
        }
        amigos.push(textoAmigo.value)
        amigosEmails.push(textoEmail.value)
        listaAmigos.innerHTML = amigos.join(" - ") 
        textoAmigo.value = ""
        textoEmail.value = ""
        textoAmigo.focus()
    }
    else{
        mostrarMensaje("Debe completar el campo de texto.", "amarillo")
    }
}

function validarExistencia(texto, email) {
    for (let i = 0; i < amigos.length; i++) {
        if(amigos[i] == texto){
            mostrarMensaje("El nombre ingresado ya existe.", "amarillo")
            return false
        }
        if(amigosEmails[i] == email){
            mostrarMensaje("El email ingresado ya existe.", "amarillo")
            return false
        }
    }
    return true
}

function finalizarCarga() {
    let html = ""
    if (!validarFinalizacion()) {
        return
    }
    let arrayDesordenado = ordenarArrayAleatoriamente(amigos);
    cargaDatos.style.display = "none"
    html += `
    <div class="caja-principal">
        <div class="titulo-caja-principal">
            <p>La selección quedó de la siguiente manera: </p>
        </div>
        <div>
    `
    for (let i = 0; i < amigos.length; i++) {
        html += `<p>${amigos[i]} <i class="fa-solid fa-gift"></i> <i class="fa-solid fa-arrow-right"></i> ${arrayDesordenado[i]} -  
        <a href="mailto:${amigosEmails[i]}?subject=Hola ${amigos[i]}. Tu amigo invisible es...&body=Tu amigo invisible es: ${arrayDesordenado[i]}" title="Enviar Email"><i class="fa-regular fa-envelope"></i></a></p>`
    }
    html += `   
    </div>
    <div class="finalizar">
        <h2>Feliz Navidad !!!</h2>
        <button class="botones" onclick="recargar()">Regresar</button>
    </div>
    </div>`
    main[0].innerHTML = html
}

function validarFinalizacion() {
    if (amigos.length < 2){
        mostrarMensaje("Debe agregar al menos dos amigos", "rojo")
        return false
    }
    if (amigos.length % 2 != 0) {
        mostrarMensaje("Debe agregar una cantidad par de amigos", "rojo")
        return false
    }
    return true
}

function recargar() {
    location.reload(true)
}

function ordenarArrayAleatoriamente(array) {
    let hayCoincidencia
    let nuevoArray
    do {
      nuevoArray = [...array]
      hayCoincidencia = false
      nuevoArray.sort(() => Math.random() - 0.5)
      for (let i = 0; i < nuevoArray.length; i++) {
        if (nuevoArray[i] == array[i]) {
          hayCoincidencia = true
          break;
        }
      }
    } while (hayCoincidencia)
  
    return nuevoArray
}

function mostrarMensaje(mensaje, color) {
    mensajeValidacion.style.display = "flex"
    mensajeParrafo.innerHTML = mensaje
    if(color == "rojo"){
        mensajeValidacion.style.backgroundColor = "red"
    }else if (color == "amarillo"){
        mensajeValidacion.style.backgroundColor = "yellow"
    }
    mensajeValidacion.style.border = "2px solid black"
    setTimeout(() => {
        mensajeValidacion.style.display = "none"
    }, 3000);
}