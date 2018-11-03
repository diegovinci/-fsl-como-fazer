const axios = require('axios');

const baseURL = 'https://fsl-como-fazer.firebaseio.com';
const secret = 'xthayvJWmwr0ctGYfw8NlirJxm08SpQcHlpR9frH';
const authParam = `?auth=${secret}`;

const list = async (key) => {
  const content = await axios.get(`${baseURL}/${key}.json${authParam}`);
  if (content.data) {
    const objetos = Object.keys(content.data)
      .map((key) => {
        return {
          id: key, ...content.data[key]
        }
      });
    return objetos;
  } else {
    return [];
  }
}

const remove = async (key, id) => {
  await axios.delete(`${baseURL}/${key}/${id}.json${authParam}`);
  return true
}

const get = async (key, id) => {
  const content = await axios.get(`${baseURL}/${key}/${id}.json${authParam}`);
  return {
    id: id,
    ...content.data
  }
}

const update = async (key, id, data) => {
  await axios.put(`${baseURL}/${key}/${id}.json${authParam}`, data);
  return true;
}

const create = async (key, data) => {
  await axios.post(`${baseURL}/${key}.json${authParam}`, data);
  return true;
}

module.exports = {
  list,
  remove,
  get,
  update,
  create
};