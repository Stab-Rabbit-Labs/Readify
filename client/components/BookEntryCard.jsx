import React, { useState } from 'react';
import PlayerCard from './PlayerCard';

function BookEntryCard() {
  const [cardState, setCardState] = useState({
    bookName: '',
    playlist_id: '37i9dQZF1DWZwtERXCS82H', //default playlist
    imgURL: '',
  });

  const handleClick = (e) => {
    fetch('/api/get-title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: cardState.bookName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setCardState({
          ...cardState,
          playlist_id: data.playlist_id,
          imgURL: data.imageURL,
        });
      });
  };

  // convert to onBlur method
  const handleOnChange = (e) => {
    setCardState({ ...cardState, bookName: e.target.value });
  };

  return (
    <div className=" m-10 ">
      <input
        className="text-slate-900 pl-5 w-10/12 h-10 my-10 rounded-sm"
        type="text"
        placeholder="Enter Book Title"
        onChange={handleOnChange}
      ></input>
      <button
        className="h-10 bg-primary text-black w-2/12 rounded-sm"
        onClick={handleClick}
      >
        Send
      </button>
      <PlayerCard
        playlist_id={cardState.playlist_id}
        imageURL={cardState.imgURL}
      />
    </div>
  );
}

export default BookEntryCard;
