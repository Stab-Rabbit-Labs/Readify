import React, { useState, useEffect } from 'react';

function PlayerCard(props) {
  return (
    <div className="inline">
      <iframe
        style={{ borderRadius: '12px' }}
        src={`https://open.spotify.com/embed/playlist/${props.playlist_id}?utm_source=generator`}
        width="50%"
        height="380"
        frameBorder="0"
      ></iframe>
      <div className="bg-red">
        <img className="h-380 max-w-xsm-auto" src={props.imageURL} />
      </div>
    </div>
  );
}

export default PlayerCard;
