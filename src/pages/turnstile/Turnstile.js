
import React, { useEffect, useState } from 'react'
import { Form, Carousel } from 'react-bootstrap'
import turnstilePostData from '../../postDataHelper/turnstilePostData'
import client from '../../client'
import { BASE_URL } from '../../index'
import './Turnstile.css'

function createImage(path, width = 100, altName = '') {
  const imageUrl = `${BASE_URL}${path}`
  return (
    <img
      className="card-img-bottom d-block w-100"
      style={{ width: `${width}px` }}
      src={ imageUrl }
      alt={ altName || path }
      key={path} 
    />
  )
}

export default function Turnstile() {
  const [caption, setCaption] = useState('')
  const [broshureLink, setBroshureLink] = useState('')
  const [modelName, setModelName] = useState('')
  const [modelPrice, setModelPrice] = useState('')
  // const [modules, setModules] = useState([])
  const [images, setImagePaths] = useState([])
  const [serias, setSerias] = useState([])
  const [moduleSelectors, setModuleSelectors] = useState([])

  async function fetchTurnstile(postData) {
    const data = await client.fetchTurnstile(postData)
    const {
      page_view: {
        caption,
        download_broshure_button_link: downloadBroshureLink,
        model_name: name,
        model_price: price,
        // model_module_list: moduleList,
        carousel_images: carouselImagePaths,
        seria_buttons: seriaButtons,
        module_selectors: selectors,
    } }= data

    setCaption(caption)
    setBroshureLink(downloadBroshureLink)
    setModelName(name)
    setModelPrice(price)
    // setModules(moduleList)

    const paths = carouselImagePaths.map(pathObj => pathObj.image_source)
    setImagePaths(paths)

    const prettySerias = seriaButtons.map(seria => ({ path: seria.image_source, ...seria }))
    setSerias(prettySerias)
    setModuleSelectors(selectors)
  }

  useEffect(() => {
    fetchTurnstile(turnstilePostData)
  }, [])

  function downloadInfo(url) {
    window.open(url, '_blank')
  }

  return (
    <div className="container-fluid">
    <div className="row justify-content-center">
      <h4 className="my-4">{ caption }</h4>
    </div>
    
    <div className="row justify-content-center">
      <div className="col">
          <div className="container">
              <div className="row row-cols-2">
                { serias.map((seria, index) => {
                  return (
                    <button
                      onClick={() => fetchTurnstile(turnstilePostData)}
                      key={`${index}+seria`} className="col"
                    >
                      <div className="card m-2">
                        { createImage(seria.path, 100, seria.name) }
                        <div className="card-body">
                          <div className="card-title">{ seria.caption }</div>
                        </div>
                      </div>
                    </button>
                  )
                }) }
              </div> 
            </div>
      </div> 
      <div className="col-sm">
        <div className="container">
          <Carousel>
            { images.map((path, index) => {
              return (
                <Carousel.Item key={`${path}+seria`}>
                  { createImage(path, 100) }
                </Carousel.Item>
              )
            } )}
          </Carousel>

          <div className="row">
            <div className="col mt-4">
              Комплектация
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <ul className="list-group">
                <li className="list-group-item border-0">{ modelName }</li>
                <li className="list-group-item border-0">{ modelPrice }</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm">
        <div className="container">
          <div className="row mt-2">
            <div className="col">Модель</div>
            <div className="col">{ modelPrice } руб.</div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">{ modelName }</div>
            <div className="col">
              <button
                onClick={() => downloadInfo(broshureLink)}
                type="button"
                className="btn btn-outline-primary">
                  Скачать
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-12 col-sm-offset-3 col-md-offset-4 mt-4">
                      <ul className="list-group">
                        { moduleSelectors.map((selector, index) =>{
                          return (
                            <li key={`${index}+selector`} className="list-group-item border-0">
                              <Form>
                                <Form.Check
                                  readOnly
                                  checked={!!(!selector.state)}
                                  disabled={selector.state}
                                  type="switch"
                                  id={selector.caption}
                                  label={selector.caption}
                                />
                              </Form>
                            </li>
                          )
                        }) }
                      </ul>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
