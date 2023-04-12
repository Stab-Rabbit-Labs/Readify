import React from "react"
import UserHistoryContainer from "./UserHistoryContainer";
import BookEntryCard from "../components/BookEntryCard";

function MainContainer() {
    return (
        <div>
        <BookEntryCard />
        <UserHistoryContainer />
        </div>
    )
}


export default MainContainer;