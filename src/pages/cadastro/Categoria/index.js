import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault'
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm'


const CadastroCategoria= () => {
  const initialValues = {
    name: '',
    description: '',
    color: '',
  }

  const { handleChange, values, clearForm } = useForm(initialValues)

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/categorias'
    : 'https://garciaflix.herokuapp.com/categorias';
    
    fetch(URL_TOP)
      .then(async (data)=> {
        const resp = await data.json();
        setCategories([
          ...resp,
        ]);
      });

  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.name}</h1>

      <form onSubmit={function handleSubmit(e) {
        e.preventDefault();

        setCategories([ ...categories, values ]);
        clearForm();
      }}>

      <FormField
        label="Nome da Categoria"
        type="text"
        name="name" 
        value={values.name}
        onChange={handleChange}
      />

      <FormField
        label="Descrição" 
        type="textarea"
        name="description"
        value={values.description}
        onChange={handleChange}
      />

      <FormField 
        label="Cor"
        type="color"
        name="color"
        value={values.cor}
        onChange={handleChange}
      />

      <Button>
        Cadastrar
      </Button>

      </form>

      {categories.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categories.map((category) => {
          return (
            <li key={`${category.id}`}>
              {category.titulo}
            </li>
          )
        })
        }
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );

};

export default CadastroCategoria;