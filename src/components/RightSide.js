import React from 'react';
import { Switch, Route} from "react-router-dom";
import Main from "../views/Main";
import Users from "../views/Users";
import About from "../views/About";
import {getUsers} from "../actions/userAction";
import {useDispatch} from "react-redux";
import NotFound from "./NotFound";

function RightSide(props) {

  const dispatch = useDispatch()
  const thisGetUsers = () => {
    const params = {gender: "female", results: 20}
    dispatch(getUsers({params}))
  }
 const handleScroll = (e) => {

    const scrollBottom = e.target.scrollTop + e.target.offsetHeight + 1 >= e.target.scrollHeight;

    if (scrollBottom) {
      thisGetUsers()
    }
  }
  return (
    <div className="right-side" onScroll={handleScroll}>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/users' exact component={Users}/>
        <Route path='/users/:id' component={About}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default RightSide;