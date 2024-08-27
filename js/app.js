let textoEncriptarDesencriptar;
let textoNormalizado;
let textoDesencriptado;
let textoEncriptado;
let alerta = document.getElementById("alerta");
let divDelAlerta = document.getElementById("divAlerta");
let revisarMatchValidaciones;
let textoCopiar;
let mensajeAlCopiar =  document.getElementById("alertaDeCopiado");

const expresionesRegulares = {
    caracteresEspeciales: /[`@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, //solo dejamos que se pueda ingresar "!"
    digitos: /\d/gi
}

function validarTextos() {
    revisarMatchValidaciones = 0;
    //Se obtiene el valor que se haya ingresado en el Textarea de entrada para Encriptar/Desencriptar
    textoEncriptarDesencriptar = document.getElementById("textoAencriptar").value;
    //Validando que el valor ingresado no sea nulo (vacío):
    if (textoEncriptarDesencriptar == '') {
        divDelAlerta.classList.add("controles_advertencia_alerta");
        alerta.innerText = 'Se detectó que el campo esta vacío, ingrese texto a encriptar';
        limpiarCampos();
        setTimeout(() => {
            divDelAlerta.classList.remove("controles_advertencia_alerta");
            alerta.innerText = 'Ingresar solo letras minusculas';
        }, 3000);
        revisarMatchValidaciones = 1;
    }
    //Validando si se han ingresado carácteres especiales o números:
    else if (expresionesRegulares.caracteresEspeciales.test(textoEncriptarDesencriptar) || expresionesRegulares.digitos.test(textoEncriptarDesencriptar)) {
        divDelAlerta.classList.add("controles_advertencia_alerta");
        alerta.innerText = 'No se pueden ingresar Números ni carácteres especiales';
        limpiarCampos();
        setTimeout(() => {
            divDelAlerta.classList.remove("controles_advertencia_alerta");
            alerta.innerText = 'Ingresar solo letras minusculas';
        }, 3000);
        revisarMatchValidaciones = 1;
    }
    //Salida de variables con sus respectivos valores después de haber pasado por las validaciones de caracteres
    return revisarMatchValidaciones, textoEncriptarDesencriptar;
}

function encriptarTexto() {
    validarTextos();
    if (revisarMatchValidaciones == 0) {
        //Normalizado del texto ingresado por el usuario para que todas sean minusculas (por si pego el texto)
        textoNormalizado = textoEncriptarDesencriptar.toLowerCase();
        //VARIABLE A ENCRIPTAR
        textoEncriptado = textoNormalizado;
        //Encriptando los datos de la variable "textoEncriptar", respetando el orden sugerido para no hacer redundancia con vocales del cifrado
        textoEncriptado = textoEncriptado.replaceAll("e", "enter");
        textoEncriptado = textoEncriptado.replaceAll("i", "imes");
        textoEncriptado = textoEncriptado.replaceAll("a", "ai");
        textoEncriptado = textoEncriptado.replaceAll("o", "ober");
        textoEncriptado = textoEncriptado.replaceAll("u", "ufat");
        //Modificación visibilidad de Divs
        document.getElementById("salidasContenido").style.display = "none";
        document.getElementById("salidasTexto").style.display = "block";
        //Asignando el valor de la variable "textoEncriptado" a su respectiva salida, en este caso al texttarea:
        document.getElementById("textoDesencriptado").value = textoEncriptado;
    }
    else {
        console.log(revisarMatchValidaciones);
    }
}

function desencriptarTexto() {
    validarTextos();
    if(revisarMatchValidaciones ==0){
    //Normalizado del texto ingresado por el usuario para que todas sean minusculas (por si pego el texto)
    textoNormalizado = textoEncriptarDesencriptar.toLowerCase();
    //Variable a DESENCRIPTAR
    textoDesencriptado = textoNormalizado;
    //Desencriptando los datos de la variable "textoDesencriptado", respetando el mismo orden que a encriptar
    textoDesencriptado = textoDesencriptado.replaceAll("enter", "e");
    textoDesencriptado = textoDesencriptado.replaceAll("imes", "i");
    textoDesencriptado = textoDesencriptado.replaceAll("ai", "a");
    textoDesencriptado = textoDesencriptado.replaceAll("ober", "o");
    textoDesencriptado = textoDesencriptado.replaceAll("ufat", "u");
    //Modificación visibilidad de Divs
    document.getElementById("salidasContenido").style.display = "none";
    document.getElementById("salidasTexto").style.display = "block";
    //Asignando el valor de la variable " textoDesencriptado" a su respectiva salida, en este caso al texttarea:
    document.getElementById("textoDesencriptado").value = textoDesencriptado;
    }
}

async function copiarAportapapeles(){
    textoCopiar = document.getElementById("textoDesencriptado").value;
    try {
        await navigator.clipboard.writeText(textoCopiar);
        mensajeAlCopiar.classList.remove("texto_boton_alertaCopiado");
        setTimeout(() => {
            mensajeAlCopiar.classList.add("texto_boton_alertaCopiado");
        }, 3000);
      } catch (err) {
        console.error('Error al copiar: ', err);
      }
}

function limpiarCampos() {
    document.querySelector('#textoAencriptar').value = '';
    document.querySelector('#textoDesencriptado').value = '';
}

function colocarCursor() {
    $("#textoAencriptar").focus();
}