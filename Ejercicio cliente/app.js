// API para crear un nuevo proyecto
const createEjercicio = (ejercicio) => {
  var url = "http://localhost:8080/api/ejercicios";
  const data = JSON.stringify(ejercicio);
  console.log(data);
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if ((res.status = 200)) {
        console.log("Status 200, sí se guardó!");
        getDatos();
      }
    })

    .catch((error) => console.error("Error:", error));
};

const formaAlta = document.getElementById("forma-alta");
formaAlta.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementsByName("nombre")[0].value;
  const numero = Number(document.getElementsByName("numero")[0].value);
  const email = document.getElementsByName("email")[0].value;
  createEjercicio({ nombre, numero, email });
});

// // hacer que aparezca en el html
// const generarGastosContainer = proyecto_elegido => {
//     return `
//   <div class="card">
//       <div class="card-header">
//         <h4>Gastos
//         <img class="float-right" src="images/mas.svg" alt="add" height="25" width="25">
//         </h4>
//       </div>
//       <div class="card-body">
//         ${proyecto_elegido.gastos
//           .map(gasto => {
//             return `<strong>${gasto.ejecutivo} - ${gasto.concepto}</strong><br>
//             ${gasto.fechag}: ${formatter.format(gasto.montog)}<br>
//             `;
//           })
//           .join("")}
//       </div>
//   </div>
//   `;
//   };

// const menu = document.getElementById("menu");

let arregloDatos = [];
// cargar proyectos y actualizar menu
const loadDatos = (datos) => {
  arregloDatos = [...datos];
  cargaMenu();
  //  cargaEventosClickMenu();
};

// solicitar los proyectos al API
const getDatos = () => {
  var url = "http://localhost:8080/api/ejercicios";
  fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => loadDatos(response.data));
};

getDatos();

const menu = document.getElementById("datos");
const nom = document.getElementById("nom");
const num = document.getElementById("num");
const ema = document.getElementById("ema");

const cargaMenu = () => {
  // orden de ultimo a id a menor
  const menu = document.getElementById("datos");
  const arrSort = arregloDatos.sort((a, b) => {
    // console.log(a.numero, typeof a.numero)
    return b.numero - a.numero;
  }); //(a, b) => b.id - a.id);
  // agarro los ultimos n elementos para mostrar
  arrSort.splice(10);
  menu.innerHTML = arrSort
    .map((dato) => {
      return `
      <tr id="${dato.id}">
        <td>${dato.nombre}</td>
        <td >${dato.numero}</td>
        <td>${dato.email}</td>
        <td><button onClick="Eliminar(${dato.id})">Borrar de la base</button></td>
        <td><button onClick="CambiarStatus(${dato.id})">Borrar (visible)</button></td>
        <td><button onClick="Editar(${dato.id})">Editar</button></td>
      </tr>
    `;
    })
    // nom.innerHTML = arrSort
    // .map(dato => {
    //   return `
    //   <td>${dato.nombre}</td>
    // `;
    // })
    // num.innerHTML = arrSort
    // .map(dato => {
    //   return `
    //   <td>${dato.numero}</td>
    // `;
    // })
    // ema.innerHTML = arrSort
    // .map(dato => {
    //   return `
    //   <td>${dato.email}</td>
    // `;
    // })
    .join("");
};
function Eliminar(id) {
  var url = "http://localhost:8080/api/ejercicios/" + id;
  fetch(url, {
    method: "DELETE", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if ((res.status = 200)) {
        console.log("Status 200, sí se eliminó!");
        getDatos();
      }
    })

    .catch((error) => console.error("Error:", error));
}

function CambiarStatus(id) {
  var url = "http://localhost:8080/api/ejercicios/" + id;
  fetch(url, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if ((res.status = 200)) {
        console.log("Status 200, sí se cambió el status!");
        getDatos();
      }
    })

    .catch((error) => console.error("Error:", error));
}

var ejercicioEdicion;

function Editar(id) {
  let ejercicio;
  for (var i = 0; i < arregloDatos.length; i++) {
    if (arregloDatos[i].id === id) {
      ejercicio = arregloDatos[i];
    }
  }
  ejercicioEdicion = ejercicio;
  generateHtmlForEdit(ejercicio);
}

function generateHtmlForEdit(ejercicio) {
  const rowToEdit = document.getElementById(ejercicio.id);
  console.log(rowToEdit);
  const htmlRowToEdit = `<tr id="${ejercicio.id}">
  <td>
    <input type="text" value="${ejercicio.nombre}" id="nombre_actualizado"/>
  </td>
  <td>
    <input type="text" value="${ejercicio.numero}" id="numero_actualizado"/>
  </td>
  <td>
    <input type="text" value="${ejercicio.email}" id="email_actualizado"/>
  </td>
  <button onClick="actualizarEjercicio()">Actualizar</button>
  </tr>`;
  rowToEdit.innerHTML = htmlRowToEdit;
}

function actualizarEjercicio() {
  const nombre = document.getElementById("nombre_actualizado").value;
  const numero = Number(document.getElementById("numero_actualizado").value);
  const email = document.getElementById("email_actualizado").value;
  updateEjercicio({
    id: ejercicioEdicion.id,
    nombre,
    numero,
    email,
  });
}

const updateEjercicio = (ejercicio) => {
  var url = "http://localhost:8080/api/ejercicios";
  const data = JSON.stringify(ejercicio);
  console.log(data);
  fetch(url, {
    method: "PUT", // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if ((res.status = 200)) {
        console.log("Status 200, sí se actualizó!");
        getDatos();
        ejercicioEdicion = null;
        //aquí borrar forma
      }
    })

    .catch((error) => console.error("Error:", error));
};

// filtrado en tabla

(function () {
  "use strict";

  var TableFilter = (function () {
    var search;

    function dquery(selector) {
      // Regresa un arreglo de elementos correspondientes al selector
      return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function onInputEvent(e) {
      // El texto a buscar
      var input = e.target;
      search = input.value.toLocaleLowerCase();
      // Saca donde debe buscar
      // El atributo data-table se usa para identificar donde esta la informacion que debe buscar)
      var selector = input.getAttribute("data-table") + " tbody tr";
      console.log(selector);
      var rows = dquery(selector);
      console.log(rows);
      // Busca el texto a buscar en todas las filas de la tabla
      [].forEach.call(rows, filter);
      // Puedes actualizar el conteo de registros
      // El atributo data-count se usa para mostrar esa informacion
      var writer = input.getAttribute("data-count");
      if (writer) {
        // Actualizamos el contador
        var count = rows.reduce(function (t, x) {
          return t + (x.style.display === "none" ? 0 : 1);
        }, 0);
        // Mostramos el contador
        dquery(writer)[0].textContent = count;
      }
    }

    function filter(row) {
      // Buscamos siempre en lowercase
      if (row.lowerTextContent === undefined)
        row.lowerTextContent = row.textContent.toLocaleLowerCase();
      // Esconde la fila sino coincide con la busqueda
      row.style.display =
        row.lowerTextContent.indexOf(search) === -1 ? "none" : "block";
    }

    return {
      init: function () {
        // selecciona el o los inputs si hay mas con el atributo data-table
        var inputs = dquery("input[data-table]");
        console.log(inputs);
        [].forEach.call(inputs, function (input) {
          // Evento para cachar cuando teclean el texto a buscar
          input.oninput = onInputEvent;
          // If we already have a value (following navigation back), we relaunch the search
        });
      },
    };
  })();

  TableFilter.init();
})();
