import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button'
import videosRepository from '../../../repositories/video'
import categoriesRepository from '../../../repositories/categories'


const CadastroVideo = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const categoryTitles = categories.map(({titulo}) => titulo);
  const { handleChange, values } = useForm({
    titulo:'video padrao',
    url: 'https://www.youtube.com/watch?v=jOAU81jdi-c',
    categoria: 'Front End'
  });

  useEffect(() => {
    categoriesRepository
      .getAll()
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(event) => {
        event.preventDefault();

        const categoriaEscolhida = categories.find((categoria) => {
          return categoria.titulo === values.categoria;
        });

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            console.log('VIDEO CADASTROU')
            history.push('/')
          })

      }}>
        <FormField
          label="Titulo do Video"
          name="titulo" 
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url" 
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria" 
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

      <Button type="submit">
        Cadastrar
      </Button>

      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );

};

export default CadastroVideo;