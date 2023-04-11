import React, { useState, useEffect } from "react";

// const [image, setImage] = useState('')

// useEffect()

function PlayerCard(props) {
  return (
    <div className='inline'>
    <iframe style={{"borderRadius": '12px'}} src={`https://open.spotify.com/embed/playlist/${props.playlistId}?utm_source=generator`} width="50%" height="380" frameBorder="0" allowFullScreen="" /*allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"*/></iframe>
    <div  className='bg-red'>
      <img className='h-380 max-w-xsm-auto' src={props.imageURL}/>
    </div>

    </div>
  )
}

export default PlayerCard;