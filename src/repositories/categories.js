import config from '../config'

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`

function getAll() {
  return fetch(`${URL_CATEGORIES}`)
    .then(async (data)=> {

      if(data.ok) { 
        const resp = await data.json();
        return resp;
      }

      throw new Error('Não foi possivel pegar os dados');
    });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (data)=> {

      if(data.ok) { 
        const resp = await data.json();
        return resp;
      }

      throw new Error('Não foi possivel pegar os dados');
    });
}

export default {
  getAllWithVideos,
  getAll,
}