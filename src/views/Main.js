import React from 'react';
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-50">
            <div className="text-center">
                <h1>Welcome to Random Users Test site</h1>
                <b>Click to see <Link to='/users'>Users</Link></b>
            </div>
        </div>
    );
}

export default Main;