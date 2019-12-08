import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import './Main.css'

import { BASE_URL } from '../../index'
import client from '../../client'

export default function Main() {
  const [title, setTitle] = useState('')
  const [devices, setDevices] = useState([])

  useEffect(() => {
    async function fetchMain() {
      const data = await client.fetchMain('ksdhfkjsdhf')
      const { page_view: pageView } = data

      setTitle(pageView.caption)
      setDevices(pageView.device_buttons)
    }
    fetchMain()
  }, [])

  function cardRender(cards = []) {
    const cardItems = cards.map((card, index) => {
      const imageUrl = `${BASE_URL}/${card.image_source}`
      return (
        <Link key={`${index}+card`} to="/turnstile">
          <div className="col-3">
            <button className="card">
              <div className="card-body">
                <p>{ card.caption }</p>
                <img style={{ width: '500px' }} src={ imageUrl } alt={ card.name } />
              </div>
            </button>
          </div>
        </Link>
      )
    });
    return cardItems;
  }

  return (
    <div className="App">
      <div className="container-fluid">
        <h4>{ title }</h4>
        <div className="row">
          { cardRender(devices) }
        </div>
      </div>
    </div>
  )
}
