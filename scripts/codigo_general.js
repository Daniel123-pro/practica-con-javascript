//cargar local storage

window.addEventListener("DOMContentLoaded", () => {
  let Tema = localStorage.getItem("Tema");

 if(Tema == "emo"){
   document.querySelector("body").className = Tema;
 }

 if(document.querySelector("body").className == 'emo'){
    document.querySelector(".tema i").classList.toggle("fa-sun");
 }

})

//programando los eventos
 const d = document;
 const $cuerpo = d.querySelector("body");
 const $jugador = d.querySelector(".player_1");
 let codigo = 0;
 let tema = null;

 let down = 0;
 let left = 0;

 let limites_caja = d.querySelector(".caja").getBoundingClientRect();
 let limites_player = $jugador.getBoundingClientRect();

 let musica = d.createElement("audio");
 musica.setAttribute("src", "assets/alarma.mp3");

 let seguimiento = false;

//centro de botones

 d.addEventListener("click", (e) => {
   //menu interactivo
    if(e.target.matches(".links") || e.target.matches(".menu") || e.target.matches(".menu i")){
      d.querySelector(".contenedor_2").classList.toggle("mostrar");
    }

   //botones seccion 1
   if(e.target.matches(".on") || e.target.matches(".on").textContent){
    d.querySelector(".on").setAttribute("disabled", "true");
    d.querySelector(".tiempo").classList.remove("ocultar");
    seguimiento = true;
   }

   if(e.target.matches(".off") || e.target.matches(".off").textContent){
    d.querySelector(".tiempo").classList.add("ocultar");
    d.querySelector(".on").removeAttribute("disabled");
    seguimiento = false;
   }

   if(e.target.matches(".sound_on") || e.target.matches(".sound_on").textContent){
    musica.play();
    d.querySelector(".sound_on").setAttribute("disabled","true");
   }

   if(e.target.matches(".sound_off") || e.target.matches(".sound_off").textContent){
    musica.pause();
    musica.currentTime = 0;
    d.querySelector(".sound_on").removeAttribute("disabled");

   }

   //tema oscuro

   if(e.target.matches(".tema") || e.target.matches(".tema i")){
    d.querySelector(".tema i").classList.toggle("fa-sun");
    $cuerpo.classList.toggle("emo");
     
    tema = $cuerpo.className;

    localStorage.setItem("Tema", tema);

    $cuerpo.style.transition = "background-color 0.2s, color 0.2s"

   }

   //sorteo

   let $participantes = Array.prototype.slice.call(d.querySelectorAll(".participante"));

   if(e.target.matches(".sortear") || e.target.matches(".sortear").textContent){
    
    alert("La persona ganadora es " + d.querySelectorAll(".participante")[Math.round(Math.random() * (8 - 0) + 0)].textContent);
   }

   //coleccion responsive

   let $imgs = Array.prototype.slice.call(d.querySelectorAll(".coleccion img"));
   let numero = d.querySelector(".desocultar").getAttribute("id");

   if(e.target.matches(".izquierda") || e.target.matches(".izquierda i")){
     if(numero - 1 < 0){
       $imgs[numero].classList.remove("desocultar");
       $imgs[$imgs.slice(-1)[0].getAttribute("id")].classList.add("desocultar");
     }
     else{
      $imgs[numero].classList.remove("desocultar");
      $imgs[numero - 1].classList.add("desocultar");
     }
   }

   if(e.target.matches(".derecha") || e.target.matches(".derecha i")){
     if(parseInt(numero) + 1 > $imgs.slice(-1)[0].getAttribute("id")){
       $imgs[numero].classList.remove("desocultar");
       $imgs[0].classList.add("desocultar");
     }
     else{
      $imgs[numero].classList.remove("desocultar");
      $imgs[parseInt(numero) + 1].classList.add("desocultar");
     }
   
  }
  });

//programando el reloj de la seccion 1
function hora(){
  let time = new Date();

  let horas = time.getHours().toString().length < 2 ? "0" + time.getHours() : time.getHours();
  let minutos = time.getMinutes().toString().length < 2 ? "0" + time.getMinutes() : time.getMinutes();
  let segundos = time.getSeconds().toString().length < 2 ? "0" + time.getSeconds() : time.getSeconds();

  let real = `${horas}:${minutos}:${segundos}`;

  if(seguimiento){
   document.querySelector(".tiempo").textContent = real;
  }

  
}

  setInterval(() => {
    hora();
    },1000);
 

//programando las teclas





//eventos de teclado
$cuerpo.addEventListener("keydown",e => {
   limites_caja = d.querySelector(".caja").getBoundingClientRect();
   limites_player = $jugador.getBoundingClientRect();

   if(e.keyCode === 40){
     e.preventDefault();
     down += 3;
     $jugador.style.top = down + "px";
   }

   while(down >= (limites_caja.height / 2 - limites_player.height / 2)){
      down -= 3;
      $jugador.style.top = down + "px";
   }

   if(e.keyCode === 38){
     e.preventDefault();
     down -= 3;
     $jugador.style.top = down + "px";
   }

   while(down <= (limites_caja.height / 2 - limites_player.height / 2)* -1 ){
     down += 3;
     $jugador.style.top = down + "px";
   }

   
   if(e.keyCode === 39){
     e.preventDefault();
     left += 3;
     $jugador.style.left = left + "px";
   }
   
   if (e.keyCode === 37) {
     e.preventDefault();
     left -= 3;
     $jugador.style.left = left + "px";
   }

   while(left >= (limites_caja.width / 2 - limites_player.width / 2)){
     left -= 3;
     $jugador.style.left = left + "px";
   }
  
   while(left <= (limites_caja.width / 2 - limites_player.width / 2)* -1 ){
     left += 3;
     $jugador.style.left = left + "px";
   }
});

//cuenta regresiva

function cuenta_regresiva(dias_,horas_,minutos_,segundos_){

  segundos_++;

  const $dias = d.querySelector(".dias"),
  $horas = d.querySelector(".horas"),
  $minutos = d.querySelector(".minutos"),
  $segundos = d.querySelector(".segundos");

  let dias = dias_,
  horas = horas_,
  minutos = minutos_,
  segundos = segundos_;

  while(segundos > 59){
   segundos -= 60;
   minutos++;
  }

  while(minutos > 59){
   minutos -= 60;
   horas++;
  }

  while(horas > 23){
   horas -= 24;
   dias++;
  }

  

  let ide = setInterval(() => {

   if((dias + horas + minutos + segundos) > 0){
    segundos--;
   
    if(horas < 0 && dias > 0){
     dias--;
     horas += 24;
    }
   
    if(minutos < 0 && horas > 0){
     horas--;
     minutos += 60;
    }
   
    if(segundos < 0 && minutos >= 0){
     minutos--;
     segundos += 60;
    }
   
    if(minutos < 0 && horas > 0){
     horas--;
     minutos += 60;
    }
   
    if(horas <= 0 && dias > 0){
     dias--;
     horas += 24;
    }
   }

    $dias.textContent = dias.toString();
    $horas.textContent = horas.toString();
    $minutos.textContent = minutos.toString();
    $segundos.textContent = segundos.toString();

    if((dias + horas + minutos + segundos) <= 0){
     $dias.textContent = "0";
     $horas.textContent = "0";
     $minutos.textContent = "0";
     $segundos.textContent = "0";

    d.querySelector(".sorpresa").textContent = "FELIZ CUMPLEAÑOS!!!!!";
    clearInterval(ide);
    }

  },1000);

    
}

cuenta_regresiva(0,1,0,20);

//Boton de scroll

const desaparicion = 771;

window.addEventListener("scroll", e => {
  if(window.scrollY >= desaparicion){
    d.querySelector(".flecha").classList.remove("invisible");
  }

  if(window.scrollY <= desaparicion){
    d.querySelector(".flecha").classList.add("invisible");
  }
});

//testeador 

const $formulario = d.getElementsByName("formulario");
let direccion = null;
let alto = null;
let ancho = null;

formulario.addEventListener("submit", e => {
  e.preventDefault();

  direccion = d.getElementsByName("direccion")[0].value;
  alto = d.getElementsByName("alto")[0].value;
  ancho = d.getElementsByName("ancho")[0].value;

  open(direccion, "practica_JS",`width = ${ancho}px,height = ${alto}px`);
})

//exclusividad de navegadores

d.querySelector(".version").textContent = navigator.userAgent;

const expchrome = /chrome/i;

if(expchrome.test(navigator.userAgent)){
  d.querySelector(".mensaje").textContent = "Este mensaje es exclusivo del navegador chrome.";

}

//deteccion de conexion

window.addEventListener("online", e => {
   d.querySelector(".conectado").style.bottom = "0";

   setTimeout(() => {
   d.querySelector(".conectado").style.bottom = "-20px";
   }, 3000)
});

window.addEventListener("offline", e => {
   d.querySelector(".desconectado").style.bottom = "0";

   setTimeout(() => {
   d.querySelector(".desconectado").style.bottom = "-20px";
   }, 3000)
});

//reconocimiento de webcam

const $video = d.getElementById("webcam");

if(navigator.mediaDevices.getUserMedia){
  navigator.mediaDevices
   .getUserMedia({video: true , audio: false})
   .then(stream => {
    $video.srcObject = stream;
    $video.play();
   })
   .catch((err) => {
     d.querySelector(".errorr").textContent = `A ocurrido un error: ${err}`;
   });
}

//geolocalizacion

navigator.geolocation.getCurrentPosition((Position) => {
  console.log(Position);

  d.querySelector(".longitud").textContent = `Longitud : ${Position.coords.longitude}`;
  d.querySelector(".latitud").textContent = `Latitud : ${Position.coords.latitude}`;

  const ubicacion = d.querySelector(".mapa");

  ubicacion.textContent = `Ver en google maps`;
  ubicacion.href = `https://www.google.com/maps/place/14%C2%B019'03.7%22N+87%C2%B012'48.1%22W/@${Position.coords.latitude},${Position.coords.longitude},17z/data=!4m5!3m4!1s0x0:0x0!8m2!3d14.3177049!4d-87.2133548`;
} ,
(errorPosition) => {
  d.querySelector(".mapa").textContent = "No se pudo acceder a su ubicacion ._."
}
);

//buscador
let buscador = null;
const $barra = d.querySelector(".barrita");

$barra.addEventListener("keyup", () => {
  buscador = d.querySelector(".barrita").value;

  let $fotos = Array.prototype.slice.call(d.querySelectorAll(".elementos div"));

  for(let i = 0; i < $fotos.length;i++){

    let ids = $fotos[i].getAttribute("id");
    
    if(ids.toUpperCase().indexOf(buscador.toUpperCase().split(" ").join("_")) == 1){
      d.getElementById(ids).classList.remove("ocultar");
    }
    else if(ids.toUpperCase().indexOf(buscador.toUpperCase().split(" ").join("_")) == -1){
      d.getElementById(ids).classList.add("ocultar");
    }
    else {
      d.getElementById(ids).classList.remove("ocultar");
    }
  }
  
});

//scroll spy
const options = {
  rootMargin: "20px",
  threshold: 0.5
}



let observer = new IntersectionObserver(function(entries,observe){

  entries.forEach(entrie => {
    if(entrie.isIntersecting){
     for(let i = 0 ; i < Array.prototype.slice.call(d.querySelectorAll(".links")).length;i++){
      d.querySelectorAll(".links")[i].classList.remove("iluminado");
     }

    d.querySelectorAll(".links")[entries[0].target.getAttribute("id").split("c").join("") -1].classList.add('iluminado');
   }
 
  });

 
 
  
},options);

d.querySelectorAll(".cuadrado").forEach((el) => observer.observe(el));

//video inteligente

   const $trailer = d.querySelector(".majorask");
   let fisgon = new IntersectionObserver((entries,observe) => {

   

   entries.forEach(entrie => {
    if(entrie.isIntersecting){
     $trailer.play();
   }else {
     $trailer.pause();
   }

   window.addEventListener("visibilitychange", (e) => {
     if(d.visibilityState !== "visible"){
       entrie.target.pause();
     }
   });
   })

}, {
  rootMargin: "0px",
  threshold: 1
});

fisgon.observe($trailer);

//validacion de formulario

const $validador = d.querySelector(".validador");
let text_nombre = null;
let text_email = null;
let text_contraseña = null;
let text_descripcion = null;

const vali_nombre = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/i;
const vali_email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
const vali_contraseña = /(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i;
const vali_descripcion = /^[\s\S]{50,9999}$/;

$validador.addEventListener("keyup",e => {
  text_nombre = d.querySelector(".vali1").value;
  text_email = d.querySelector(".vali2").value;
  text_contraseña = d.querySelector(".vali3").value;
  text_descripcion = d.querySelector(".vali4").value;

  //validando nombre

  if(vali_nombre.test(text_nombre) === true && text_nombre != ""){
    d.querySelector(".vali1").className = "vali1 valido";
  }
  else if(vali_nombre.test(text_nombre) === false && text_nombre != ""){
    d.querySelector(".vali1").className = "vali1 no_valido";
  }
  else {
    d.querySelector(".vali1").className = "vali1";
  }

  //validando e-mail

  if(vali_email.test(text_email) === true && text_email != ""){
    d.querySelector(".vali2").className = "vali2 valido";
  }
  else if(vali_email.test(text_email) === false && text_email != ""){
    d.querySelector(".vali2").className = "vali2 no_valido";
  }
  else {
    d.querySelector(".vali2").className = "vali2";
  }

 //validando contraseña
  if(vali_contraseña.test(text_contraseña) === true && text_contraseña != ""){
    d.querySelector(".vali3").className = "vali3 valido";
  }
  else if(vali_contraseña.test(text_contraseña) === false && text_contraseña != ""){
    d.querySelector(".vali3").className = "vali3 no_valido";
  }
  else {
    d.querySelector(".vali3").className = "vali3";
  }

  //validando descrpcion

  if(vali_descripcion.test(text_descripcion) === true && text_descripcion != ""){
    d.querySelector(".vali4").className = "vali4 valido";
  }
  else if(vali_descripcion.test(text_descripcion) === false && text_descripcion != ""){
    d.querySelector(".vali4").className = "vali4 no_valido";
  }
  else {
    d.querySelector(".vali4").className = "vali4";
  }

  //activacion de submit

  if(vali_nombre.test(text_nombre) == true && vali_email.test(text_email) == true && vali_contraseña.test(text_contraseña) == true && vali_descripcion.test(text_descripcion) === true){
    d.querySelector(".permiso").removeAttribute("disabled");
  }
  else{
    d.querySelector(".permiso").disabled = "true";
  }
});
