import { getReclutas, getTeam } from "../apis/apis.js";

const selectOptions = document.querySelector('#selectFiltro');
const selectEquipos = document.querySelector('#selectE');
const divConteEquipos = document.querySelector('.contenedor1');
const divEquipos = document.querySelector('.equipo');
const divEdad = document.querySelector('.edad');
const divConteEdad = document.querySelector('.contenedor2');
const selectEdad = document.querySelector('#selectEdad')

selectOptions.addEventListener('change', (e) => {
    let opcion = e.target.value;
    if (opcion == '1') {
        filtrarporEquipo();
    }
    else if (opcion == '2') {
        filtrarporEdad();
    }
    else if (opcion == '3') {
        //filtrarporTiempo();
    }
})
function llenarSelect() {
    getTeam()
        .then(response => {


            response.forEach(element => {
                const { id, nombre_equipo } = element;
                const optionEquipo = document.createElement('option');
                optionEquipo.textContent = `(${id})-${nombre_equipo}`
                optionEquipo.setAttribute('value', id);
                selectEquipos.appendChild(optionEquipo);
            })
        })
}

async function filtrarporEquipo() {

    divEquipos.style.display = 'block';
    divEdad.style.display = 'none';
    llenarSelect();
    selectEquipos.addEventListener('change', (e) => {
        let option = parseInt(e.target.value);
        console.log(typeof option);
        try {
            getReclutas()
                .then(reclutas => {
                    console.log(reclutas);
                    let filtrado = reclutas.filter(recluta => recluta.idEquipo == option)
                    if(filtrado.length > 0) {
                        renderReclutas(filtrado, divConteEquipos);

                    }else{
                        divConteEquipos.innerHTML=`<h5>No hay registro<h5>`;
                    }      
                })

        } catch (error) {
            console.log(error);

        }


    })
}
function renderReclutas(arreglo, father) {
    let template = "";
    arreglo.forEach(ele => {
        const { id, nDocumento, nombre, telefono, direccion, fechaIngreso, idEquipo,edad } = ele;
        template += `
    <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">N. Documento:${nDocumento}</p>
    <p class="card-text">Telefono:${telefono}</p>
    <p class="card-text">Direccion:${direccion}</p>
    <p class="card-text">Fecha de Ingreso:${fechaIngreso}</p>
    <p class="card-text">Id Equipo:${idEquipo}</p>
    <p class="card-text">Edad:${edad}</p>
  </div>
</div>
    `
    })
    father.innerHTML = template;
}
//hacer el filtro por edad
function filtrarporEdad() {
    divEquipos.style.display = 'none';
    divEdad.style.display = 'block';
    

    selectEdad.addEventListener('change', (e) => {
        let opcion = e.target.value;
        if(opcion == "mayores"){
            try {
                     getReclutas()
                         .then(reclutas => {
                             console.log(reclutas);
                             let filtrado = reclutas.filter(recluta => recluta.edad >= 18)
                             console.log(filtrado);
                             if(filtrado.length > 0) {
                                 renderReclutas(filtrado, divConteEdad);
        
                             }else{
                                divConteEdad.innerHTML=`<h5>No hay registro<h5>`;
                             }     
                         })
                 } catch (error) {
                     console.log(error);
                 }
        }else if(opcion == "menores"){
            try {
                getReclutas()
                    .then(reclutas => {
                        console.log(reclutas);
                        let filtrado = reclutas.filter(recluta => recluta.edad < 18)
                        console.log(filtrado);
                        if(filtrado.length > 0) {
                            renderReclutas(filtrado, divConteEdad);
   
                        }else{
                           divConteEdad.innerHTML=`<h5>No hay registro<h5>`
                        }     
                    })
            } catch (error) {
                console.log(error);
            }
        }
        // let edad = document.querySelector('#edadRecluta').value;
        // console.log(edad);
        // console.log(radio.value);
        // console.log(radioM.value);
        // try {
        //     getReclutas()
        //         .then(reclutas => {
        //             console.log(reclutas);
        //             let filtrado = reclutas.filter(recluta => recluta.edad == edad)
        //             console.log(filtrado);
        //             if(filtrado.length > 0) {
        //                 renderReclutas(filtrado, divConteEdad);

        //             }else{
        //                divConteEdad.innerHTML=`<h5>No hay registros con esta edad</h5>`
        //             }     
        //         })
        // } catch (error) {
        //     console.log(error);
        // }
    })
}