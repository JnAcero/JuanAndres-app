import { getTeam, postRecluta ,getReclutas,deleteRecluta} from "./apis/apis.js";
function llenarSelectEquipos(){
    getTeam()
    .then(response=>{
        const selectEquipos =document.querySelector('#idEquipo');

        response.forEach(element=>{
           const {id,nombre_equipo} = element;
           const optionEquipo = document.createElement('option');
           optionEquipo.textContent=`(${id})-${nombre_equipo}`
         selectEquipos.appendChild(optionEquipo);
        })
       
    })
}
llenarSelectEquipos();
function registrarRecluta(e){
    let inputsF=[];
    e.preventDefault();
    let inputsForm = document.querySelectorAll('.form-control');
    console.log(inputsForm);
    inputsForm.forEach(input=>{
        inputsF.push(input.value);
    })
    console.log(inputsF);
    let opcionSelect = document.querySelector('.form-select').value;
    let idEquipo = parseInt(opcionSelect.slice(1,2));
    let fechaActual= new Date().getFullYear();
    console.log(fechaActual);
    let fechaNacimineto = parseInt(inputsF[5].slice(0,4));
    let edad = fechaActual - fechaNacimineto;
    
    let recluta ={
        nDocumento:inputsF[0],
        nombre:`${inputsF[1]} ${inputsF[2]}`,
        telefono:inputsF[3],
        direccion:inputsF[4],
        fechaNacimineto:inputsF[5],
        fechaIngreso:inputsF[6],
        idEquipo:idEquipo,
        edad:edad
    }
    console.log(recluta);
    try{
        postRecluta(recluta);

    }catch(error){
        console.log(error);
    }
}
function borrarRecluta(){
    const btnsDelete = document.querySelectorAll('.delete');
    btnsDelete.forEach(btn =>{
        btn.addEventListener('click',(e)=>{
            let ident = e.target.dataset.recluta; 
            deleteRecluta(ident);

        })
    })
}
async function renderReclutas(){
    const tableReclutas = document.querySelector('.table');
    tableReclutas.style.display = 'block';
    await getReclutas()
    .then(response=>{
        console.log(response);
        let template =""
        response.forEach(element => {
            const {id,nDocumento,nombre,telefono,direccion,idEquipo} = element;
            template+=`
            <tr>
                <td scope="row">${nDocumento}</td>
                <td>${nombre}</td>
                <td>${telefono}</td>
                <td>${direccion}</td>
                <td>${idEquipo}</td>
                <td><button data-recluta="${id}" class="delete">Eliminar</button></td>
            </tr>
            `
        });
        const cuerpoTabla = document.querySelector('tbody');
        cuerpoTabla.innerHTML=template;
        borrarRecluta();
    })
}

const btnListar = document.querySelector('#btnlistarReclutas');
btnListar.addEventListener('click',renderReclutas)

const btnRegistro = document.querySelector('#btnregisRecluta')
btnRegistro.addEventListener('click',registrarRecluta)

const fecha = '2020-02-05'
 console.log(fecha.slice(0,4));