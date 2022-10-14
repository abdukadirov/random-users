import React from 'react';
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {deleteUser, setUserToDelete, toggleDeleteModalVisible} from "../actions/userAction";


function UserCards(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {id, title, first, last, country, city, email, img} = props
    const [deleteBtn, setDeleteBtn] = useState(false)


    return (
        <div className={props.userListType === 'LIST' ? "list-type" : "col-md-3"}>
            <div className={props.index % 2 === 1 && props.userListType === 'LIST' ? 'card flex-row-reverse' : 'card'}>
                <div onMouseLeave={() => setDeleteBtn(false)} onMouseEnter={() => setDeleteBtn(true)}
                     className="card-header">
                    {(<Button onClick={() => dispatch(setUserToDelete(id))}
                              className={deleteBtn ? "cross-btn-show" : "cross-btn"} size="sm"
                              variant="danger"><FontAwesomeIcon
                        icon="times"/></Button>)}
                    <img className="card-img-top" src={img} alt=""/>
                </div>
                <div className="card-body">
                    <p>{title}: {first} {last}</p>
                    <p>Country: {country}</p>
                    <p>City: {city}</p>
                    <span>Email: {email}</span>
                    <button onClick={() => {
                        history.push(`/users/${id}`)
                    }}
                            className="btn btn-success btn-block">See more
                    </button>
                </div>
            </div>
            <Modal show={props.deleteModalVisible} onHide={() => dispatch(toggleDeleteModalVisible())}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(toggleDeleteModalVisible())}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => dispatch(deleteUser())}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default connect(({userStore: {users, selectedUsers, userListType, showBtn, deleteModalVisible}}) => ({
    users,
    selectedUsers,
    userListType,
    showBtn,
    deleteModalVisible
}), null)(UserCards);