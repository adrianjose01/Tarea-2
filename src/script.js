const $botones_calculadora = document.querySelectorAll(".btn");
const $input = document.querySelector(".input");
const contenedorHistorial = document.querySelector(".historial_contenedor");
const btnBorrar = document.querySelector(".btn_borrar_historial");

const agregarHistorial = (nuevoHistorial = []) => {
  const antiguoArreglo = JSON.parse(localStorage.getItem("historial"));
  let nuevoArreglo = [];
  if (antiguoArreglo) {
    nuevoArreglo = [...antiguoArreglo, nuevoHistorial];
    displayHistorial(nuevoArreglo);
  }
  localStorage.setItem("historial", JSON.stringify(nuevoArreglo));
};

const displayHistorial = (arreglo) => {
  contenedorHistorial.innerHTML = "";
  arreglo.forEach((historial) => {
    let html = `<p>${historial}</p>`;
    contenedorHistorial.insertAdjacentHTML("beforeend", html);
  });
};

// EMPEZANDO LA APP
agregarHistorial();

// LOOP DE TODOS LOS BOTONES
$botones_calculadora.forEach((btn) => {
  // AÑADIENDO EL EVENTO A CADA BOTÓN
  btn.addEventListener("click", (b) => {
    switch (btn.innerHTML) {
      case "CE":
        $input.value = "";
        break;
      case "=":
        if ($input.value != "") {
          evaluarOperacion($input);
        }
        break;
      default:
        $input.value += btn.innerHTML;
    }
  });
});

const evaluarOperacion = (operacion) => {
  let textoOperacion = operacion.value;
  operacion.value = eval(operacion.value);
  textoOperacion += ` = ${operacion.value}`;
  agregarHistorial(textoOperacion);
};

btnBorrar.addEventListener("click", () => {
  contenedorHistorial.innerHTML = "";
  localStorage.removeItem("historial");
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if ($input.value !== "") {
      evaluarOperacion($input);
    }
  }
});
