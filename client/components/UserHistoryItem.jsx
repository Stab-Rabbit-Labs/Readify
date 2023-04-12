import React from 'react';

function UserHistoryItem({ bookTitle, playlist_id }) {
  console.log('userHistory Item')
  return (
    <div className="flex flex-row justify-between my-10 py-5 px-10 border-2 border-solid border-primary rounded-lg">
      <div className="text-lg">
        <div className="bookTitle">
          {' '}
          <span className="font-bold mr-3">Title: </span>
          {bookTitle}
        </div>
        {/* <div className = 'author'> <span  class='font-bold mr-3'>Author:</span>{props.author}</div> */}
      </div>
      <div className="flex flex-row items-baseline text-right">
        {/* <div className='userChoices'> */}
        {/* <div className = 'isInstrumental'><span class='font-bold mr-3'>Instrumental: </span>{props.isInstrumental}</div>
                <div className = 'playlistLength'> <span class='font-bold mr-3'>Playlist Length:</span>{props.playlistLength}</div> */}
        {/* </div> */}
        <div
          id={playlist_id}
          className="self-center bg-primary ml-10 text-white rounded-md py-1 px-10"
        >
          PLAY ▷
        </div>

        {/* this button should bring back playlist */}
      </div>
    </div>
  );
}

export default UserHistoryItem;
