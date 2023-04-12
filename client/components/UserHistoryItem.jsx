import React from 'react';

function UserHistoryItem({ bookTitle, playlist_id }) {
  console.log('userHistory Item')
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
        <div
          id={playlist_id}
          className="self-center bg-primary ml-10 text-white rounded-md py-1 px-10"
        >
          PLAY ▷
        </div>

        {/* make this into a button */}
      </div>
    </div>
  );
}

export default UserHistoryItem;
