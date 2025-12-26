import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import './ViewCreator.css'

const ViewCreator = ({ data }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [wantsDelete, setWantsDelete] = useState(false)

  useEffect(() => {
    if (data && data.length > 0) {
      const found = data.find(c => String(c.id) === id)
      setCreator(found || null)
    }
  }, [data, id])

  if (!creator) {
    return <div className="loading">Loading...</div>
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
    } else {
      navigate("/")
    }
  }

  const goToYouTube = () => {
    window.open(creator.urls.youtube, "_blank")
  }

  const goToTwitter = () => {
    window.open(creator.urls.twitter, "_blank")
  }

  const goToInstagram = () => {
    window.open(creator.urls.instagram, "_blank")
  }

  return (
    <div className="view-creator">
      <h1 className="creator-name">{creator.name}</h1>

      <img
        src={creator.imageURL}
        alt={creator.name}
        className="creator-image"
      />

      <p className="creator-description">{creator.description}</p>

      <div className="social-media-links">
        {creator.urls?.youtube && (
          <span className="fa-brands fa-youtube" onClick={goToYouTube}></span>
        )}
        {creator.urls?.twitter && (
          <span className="fa-brands fa-twitter" onClick={goToTwitter}></span>
        )}
        {creator.urls?.instagram && (
          <span className="fa-brands fa-instagram" onClick={goToInstagram}></span>
        )}
      </div>

      <div className="creator-actions">
        <Link className="edit-btn" to={`/edit/${creator.id}`}>
          Edit Creator
        </Link>
        <button
          className="delete-btn"
          onClick={() => setWantsDelete(true)}
        >
          Delete Creator
        </button>
      </div>

      {wantsDelete && (
        <div className="delete-confirmation">
          <div className="delete-modal">
            <h1>Delete Creator?</h1>
            <p>
              This will permanently remove <strong>{creator.name}</strong>.
              This action cannot be undone.
            </p>

            <div className="delete-actions">
              <button className="danger" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="cancel"
                onClick={() => setWantsDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewCreator