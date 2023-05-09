import { postTeam, getTeam, deleteTeam} from "../apis/apis.js";


function registroEquipo(e){
    let nombreEquipo = document.querySelector('#nombreEquipo').value;
    let nombreTrainner = document.querySelector('#nombreTrainer').value;
    
    let equipo={
        nombre_equipo: nombreEquipo,
        nombre_trainner: nombreTrainner
    }
    console.log(JSON.stringify(equipo));
     try{
         postTeam(equipo);
         
     }catch(error){
         console.log(error);
     }
}
function borrarTeam(){
    let btnsDelete = document.querySelectorAll('.delete');
    console.log(btnsDelete);
    btnsDelete.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let ident = e.target.dataset.id;
            console.log(ident);
            deleteTeam(ident);
        })
    })
}
async function obtenerEquipos(){
    await getTeam()
    .then(response=>{
        console.log(response);
        let template =""
        response.forEach(element => {
            const {id,nombre_equipo,nombre_trainner} = element;
            template+=`
            <tr>
                <td scope="row">${id}</td>
                <td>${nombre_equipo}</td>
                <td>${nombre_trainner}</td>
                <td><button data-id="${id}" class="delete">Eliminar</button></td>
            </tr>
            `
            
            
        });
        const cuerpoTabla = document.querySelector('tbody');
        cuerpoTabla.innerHTML=template;
        borrarTeam();
    })
}

const btnRegistro = document.querySelector('#btnRegEquipo');
//funcion que registra un nuevo equipo
btnRegistro.addEventListener('click',registroEquipo);
//al cargarse la pagina reenderiza todos los equipos que se hallan creado en la base de datos 
window.addEventListener('DOMContentLoaded',obtenerEquipos);
