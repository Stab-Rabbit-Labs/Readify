import React, { useEffect, useState } from 'react';
import UserHistoryItem from '../components/UserHistoryItem';

// ### make scrollable
function UserHistoryContainer() {
  const [history, setHistory] = React.useState({
    historyItems: [],
  });

  useEffect(() => {
    fetch('/history')
      .then((response) => response.json())
      .then((data) => {
        let historyArr = [];
        data.forEach((x) => {
          const histObj = {
            bookTitle: x.title,
            playlist_id: x.playlist_id,
          };
          historyArr.push(histObj);
        });

        setHistory((oldHistory) => {
          const newHistory = { historyItems: historyArr };
          return newHistory;
        });
      });
  }, []);

  // console.log(history.historyItems)
  const historyItemArray = [];
  history.historyItems.forEach((x, i) => {
    historyItemArray.push(
      <UserHistoryItem
        bookTitle={x.bookTitle}
        playlist_id={x.playlist_id}
        key={`history-item-${i}`}
      ></UserHistoryItem>
    );
  });

  return (
    <div className="UserHistoryContainer">
      <h2 className="mt-20 mb-2 text-center text-3xl">Previous Playlists</h2>
      {historyItemArray}
    </div>
  );
}

export default UserHistoryContainer;
