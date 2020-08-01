import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault'
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';


const CadastroCategoria= () => {
  const initialValues = {
    name: '',
    description: '',
    color: '',
  }

  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState(initialValues);


  function setValue(key, value) {
    setValues({
      ...values, 
      [key]: value,
    });
  }

  function handleChange(e) {
    setValue(e.target.getAttribute('name'), e.target.value)
  }

  useEffect(() => {
    console.log('Aloooo')
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

    // setTimeout(() => {
    //   setCategories([
    //     ...categories,
    //     {
    //       "id": 1,
    //       "name": "Font End",
    //       "descrição": "Uma categoria boa",
    //       "cor": "#cbd1ff"
    //     },
    //     {
    //       "id": 2,
    //       "name": "Back End",
    //       "descrição": "Outra categoria boa",
    //       "cor": "#cbd1ff"
    //     }

    //   ])
    // }, 4*1000);
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.name}</h1>

      <form onSubmit={function handleSubmit(e) {
        e.preventDefault();

        setCategories([ ...categories, values ]);
        setValues(initialValues)
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
        value={values.cor}
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
            <li key={`${category.name}`}>
              {category.name}
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