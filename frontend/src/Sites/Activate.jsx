import React from 'react'
import { useParams } from 'react-router-dom'

export default function Activate() {
    const {KEY} = useParams(); //get the URL parameters

  return (
    <div>
        <h1>This is a product page for product {KEY} </h1></div>
  )
}