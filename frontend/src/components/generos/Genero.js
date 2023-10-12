import React from 'react'
import { axiosConfiguration } from './configuration/axiosConfiguration';
import { useEffect, useState } from 'react';

export default function Genero() {

    const [generos, setGeneros] = useState([])

  useEffect(() => {
    listarGeneros()
  }, [])

  const listarGeneros = async () => {
   const response = await axiosConfiguration.get('generos/?estado=true', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //console.log(response.data)
    setGeneros(response.data)
  }
  return (
    <div className="container">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Estado</th>
      <th scope="col">Descripcion</th>
    </tr>
  </thead>
  <tbody>
    {
      generos.map((genero, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{genero.nombre}</td>
            <td>{genero.estado ? 'Activo': 'inactivo'}</td>
            <td>{genero.descripcion}</td>
          </tr>
        )
      })
    }
  </tbody>
</table>
    </div>
  )
}
