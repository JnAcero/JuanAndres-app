import { getSkills, postSkill ,deleteSkill} from "../apis/apis.js";

function subirSkill(e){
    const nameSkill = document.querySelector('#nombreSkill').value;
    const skill ={
        nameSkill:nameSkill
    }
    try{
        postSkill(skill);

    }catch(error){
        console.log(error);

    }
    
}
function borrarSkill(){
    let btnsDelete = document.querySelectorAll('.delete');
    console.log(btnsDelete);
    btnsDelete.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let ident = e.target.dataset.id;
            console.log(ident);
            deleteSkill(ident);
        })
    })
}
async function renderSkill(){
    try{
        await getSkills()
        .then(response=>{
            console.log(response);
            let template =""
            response.forEach(element => {
                const {id,nameSkill} = element;
                template+=`
                <tr>
                    <td scope="row">${id}</td>
                    <td>${nameSkill}</td>
                    
                    <td><button data-id="${id}" class="delete">Eliminar</button></td>
                </tr>
                `
                
                
            });
            const cuerpoTabla = document.querySelector('tbody');
            cuerpoTabla.innerHTML=template;
            borrarSkill();
            
        })
    }catch(error){

    }
   
}


const btnSkill = document.querySelector('#btnRegSkill');
btnSkill.addEventListener('click',subirSkill);
window.addEventListener('DOMContentLoaded',renderSkill);