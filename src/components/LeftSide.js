import React from 'react';
import {ListGroup} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import data from '../data/menu.json'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "./Spinner";
import {useHistory} from "react-router-dom";

function LeftSide(props) {
const history = useHistory()
  const { loading } = props;
  return (
    <div className="left-side">
      <ListGroup>
        {data.menu.map((item) => (
          <ListGroup.Item style={{cursor: "pointer"}} key={item.id}>
            <div role="button" className="d-flex justify-content-between align-items-center" onClick={() => history.push(item.link)}>
              <Link to={item.link}>{item.name}</Link>
              <FontAwesomeIcon icon={item.icon} />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {loading && (<Spinner />)}
    </div>
  );
}

export default connect(({userStore: {loading}}) => ({loading}), () => ({}))(LeftSide);
