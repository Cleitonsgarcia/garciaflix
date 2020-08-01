import config from '../config'

const URL_VIDEOS = `${config.URL_BACKEND}/videos`

function create(videos) {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method:'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(videos),
  })
    .then(async (data)=> {

      if(data.ok) { 
        const resp = await data.json();
        return resp;
      }

      throw new Error('Não foi possivel cadastrar os dados');
    });
}

export default {
  create,
}