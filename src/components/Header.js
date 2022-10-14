import React from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import {showSearchList, changeList, setRandom} from "../actions/userAction";
import {connect, useDispatch} from "react-redux";

function Header(props) {
  const dispatch = useDispatch()

  return (
    <header className="header">
      <div>header</div>
      <div className="d-flex">
        <button onClick={() => dispatch(setRandom())} className="btn btn-primary mr-3">random</button>
        <button onClick={() => dispatch(changeList('GRID'))} className="btn btn-success">Grid</button>
        <button onClick={() => dispatch(changeList('LIST'))} className="btn btn-success mx-3">List</button>
        <button onClick={() => dispatch(changeList('TABLE'))} className="btn btn-success">Table</button>
      </div>
      <div>
        <Button onClick={() => dispatch(showSearchList())} variant="primary" id="button-addon2">Search</Button>
      </div>
    </header>
  );
}


export default connect(({userStore: {userListType}}) => ({userListType}), null)(Header);
