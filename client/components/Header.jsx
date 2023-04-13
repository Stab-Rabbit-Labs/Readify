import React, { useState, useEffect } from 'react';
function Header() {
    // create a function that checks if cookie exists
    function getCookie(name) {
        // document.cookie.match returns an arr of regex, name, and boolean
        const cookieValue = document.cookie.match(
            '(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)'
        );
        return cookieValue ? cookieValue.pop() : '';
    }
    // set an isLoggedIn state in order to render/not render the login button
    const [isLoggedIn, setIsLoggedIn] = useState(
        // getCookie returns a boolean, and then we want to set isLoggedIn state.
        getCookie('isLoggedIn') === 'true' ? true : false
    );
    // let loggedIn = false;

    const handleClick = () => {
        window.location.href = '/login';
        // creating a cookie here
        document.cookie = 'isLoggedIn = true';
    };

    return (
        <div className="mt-10">
            {/* render button based on the isLoggedIn state */}
            {!isLoggedIn && (
                <button type="button" onClick={handleClick}>
                    Login to Spotify here!
                </button>
            )}
            <div className="text-6xl ml-10">Readify</div>
            <div className="text-3xl mt- 4 ml-10">Don't read in Silence</div>
        </div>
    );
}

export default Header;
