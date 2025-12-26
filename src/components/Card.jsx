import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = (props) => {
  const goToYouTube = () => {
    window.open(props.person.urls.youtube, "_blank")
  }

  const goToTwitter = () => {
    window.open(props.person.urls.twitter, "_blank")
  }

  const goToInstagram = () => {
    window.open(props.person.urls.instagram, "_blank")
  }
  return (
    <div className="Card" style={{ backgroundImage: `url(${props.person.imageURL})`}}>

      <article>

        <div className="header-names">
          <h3>{props.person.name}</h3>
          <div className="social-media">
            {props.person.urls?.youtube && props.person.urls?.youtube !== '' ? (
              <span className="fa-brands fa-youtube" onClick={goToYouTube}></span>
            ) : "" }

            {props.person.urls?.twitter && props.person.urls?.twitter !== '' ? (
              <span className="fa-brands fa-twitter" onClick={goToTwitter}></span>
            ) : "" }

            {props.person.urls?.instagram && props.person.urls?.instagram !== '' ? (
              <span className="fa-brands fa-instagram" onClick={goToInstagram}></span>
            ) : "" }
          </div>
        </div>

        <div className="card-header-edit">
          <Link to={'/' + props.person.id} onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}><i className="fa-solid fa-circle-info"></i></Link>
          <Link to={'/edit/' + props.person.id} onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}><i className="fa-solid fa-pen"></i></Link>
        </div>

        <div className="card-description">
          <p>{props.person.description}</p>
        </div>
        
      </article>
 
    </div>
  )
}

export default Card