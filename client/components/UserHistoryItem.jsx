import React from 'react';

function UserHistoryItem({ bookTitle, playlist_id }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(`https://open.spotify.com/embed/playlist/${playlist_id}?utm_source=generator`);

  }

  return (
    <div className="flex flex-row justify-between my-10 py-5 px-10 border-2 border-solid border-primary rounded-lg">
      <div className="text-lg">
        <div className="bookTitle">
          {/* {' '} */}
          <span className="font-bold mr-3">Title: </span>
          {bookTitle}
        </div>
      </div>
      <div className="flex flex-row items-baseline text-right">
        <button id={playlist_id} className="self-center bg-primary ml-10 text-white rounded-md py-1 px-10" onClick = {handleClick}>
          PLAY ▷
        </button>
      </div>
    </div>
  );
}

export default UserHistoryItem;
