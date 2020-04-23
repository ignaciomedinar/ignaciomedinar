// API para crear un nuevo proyecto
const createEjercicio = ejercicio => {
    var url = "http://localhost:8080/api/ejercicios";
    const data = JSON.stringify(ejercicio);
    console.log(data);
    fetch(url, {
      method: "POST", // or 'PUT'
      body: data, // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status = 200){
          console.log("Status 200, sí se guardó!")
          getDatos()
        }
       })

      .catch(error => console.error("Error:", error))
     
  };
  
const formaAlta = document.getElementById("forma-alta");
formaAlta.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementsByName("nombre")[0].value;
  const numero = Number(document.getElementsByName("numero")[0].value);
  const email = document.getElementsByName("email")[0].value;
  if (ejercicioEdicion){
    updateEjercicio({id: ejercicioEdicion[0].id, nombre, numero, email});
  } else{
    createEjercicio({nombre, numero, email});
  }
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
const loadDatos = datos => {
  arregloDatos = [...datos];
  cargaMenu();
//  cargaEventosClickMenu();
};

// solicitar los proyectos al API
const getDatos = () => {
  var url = "http://localhost:8080/api/ejercicios";
  fetch(url)
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => loadDatos(response.data));
};

getDatos();

const menu = document.getElementById("datos");
const nom = document.getElementById("nom");
const num = document.getElementById("num");
const ema = document.getElementById("ema");

const cargaMenu = () => {
  // orden de ultimo a id a menor
    const menu = document.getElementById("datos");
    const arrSort = arregloDatos.sort((a,b) => {
      // console.log(a.numero, typeof a.numero)
      return b.numero - a.numero;
    }); //(a, b) => b.id - a.id);
  // agarro los ultimos n elementos para mostrar
  arrSort.splice(10);
  menu.innerHTML = arrSort
    .map(dato => {
      return `
      <tr>
        <td>${dato.nombre}</td>
        <td>${dato.numero}</td>
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
function Eliminar(id){
  var url = "http://localhost:8080/api/ejercicios/"+id;
    fetch(url, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status = 200){
          console.log("Status 200, sí se eliminó!")
          getDatos()
        }
       })

      .catch(error => console.error("Error:", error))

}

function CambiarStatus(id){
  var url = "http://localhost:8080/api/ejercicios/"+id;
    fetch(url, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status = 200){
          console.log("Status 200, sí se cambió el status!")
          getDatos()
        }
       })

      .catch(error => console.error("Error:", error))
}

var ejercicioEdicion

function Editar(id){
  var ejercicio = arregloDatos.filter(item=>{
    return item.id === id
  })
  document.getElementsByName("nombre")[0].value = ejercicio[0].nombre
  document.getElementsByName("numero")[0].value = ejercicio[0].numero
  document.getElementsByName("email")[0].value = ejercicio[0].email
  ejercicioEdicion = ejercicio
  console.log(ejercicio)
}

const updateEjercicio = ejercicio => {
  var url = "http://localhost:8080/api/ejercicios";
  const data = JSON.stringify(ejercicio);
  console.log(data);
  fetch(url, {
    method: "PUT", // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.status = 200){
        console.log("Status 200, sí se actualizó!")
        getDatos()
        ejercicioEdicion= null
        //aquí borrar forma
      }
     })

    .catch(error => console.error("Error:", error))
   
};