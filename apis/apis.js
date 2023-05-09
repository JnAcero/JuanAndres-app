const urlEquipos= 'http://localhost:4001/equipos';
const urlReclutas = 'http://localhost:4001/reclutas';
const urlSkills = ' http://localhost:4001/skills';

export const postTeam = async(equipo)=>{
    await fetch(urlEquipos,{
        method:'POST',
        body: JSON.stringify(equipo),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
export const getTeam = async()=>{
   const respuesta =  (await fetch(urlEquipos)).json();
   return respuesta;
}
export const deleteTeam = async (id)=>{
    await fetch(`${urlEquipos}/${id}`,{
        method:'DELETE'
    })
}

// gestion de apis Reclutas
export const postRecluta = async(recluta)=>{
    await fetch(urlReclutas,{
        method:'POST',
        body: JSON.stringify(recluta),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

export const getReclutas = async()=>{
    const respuesta =  (await fetch(urlReclutas)).json();
    return respuesta;
 }

 export const deleteRecluta = async (id)=>{
    await fetch(`${urlReclutas}/${id}`,{
        method:'DELETE'
    })
}

export const postSkill = async(skill)=>{
    await fetch(urlSkills,{
        method:'POST',
        body: JSON.stringify(skill),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
export const getSkills = async()=>{
    const respuesta =  (await fetch(urlSkills)).json();
    return respuesta;
 }

 export const deleteSkill = async (id)=>{
    await fetch(`${urlSkills}/${id}`,{
        method:'DELETE'
    })
}

