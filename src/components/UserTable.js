import React from 'react';
import {Table} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {deleteUser, setUserToDelete, toggleDeleteModalVisible} from "../actions/userAction";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect, useDispatch} from "react-redux";
import Modal from "react-bootstrap/Modal";

const UserTable = props => {
    const {users} = props
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <Table bordered hover>
            <thead>
            <tr>
                <th>Avatar</th>
                <th>Full-name</th>
                <th>Country</th>
                <th>City</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {(users || []).map(item => (
                <tr key={item.login.uuid}>
                    <td><img src={item.picture.thumbnail} alt="avatar"/></td>
                    <td>{item.name.title}: {item.name.first} {item.name.last}</td>
                    <td>{item.location.country}</td>
                    <td>{item.location.city}</td>
                    <td>{item.email}</td>
                    <td className="d-flex justify-content-between">
                        <Button
                            onClick={() => history.push(`/users/${item?.login.uuid}`)}
                            size="sm"
                            variant="success">
                            <FontAwesomeIcon icon="eye"/>
                        </Button>
                        <Button
                            onClick={() => dispatch(setUserToDelete(item?.login.uuid))}
                            size="sm"
                            variant="danger">
                            <FontAwesomeIcon icon="times"/>
                        </Button>
                    </td>
                </tr>
            ))}
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
            </tbody>
        </Table>
    );
};

export default connect(({userStore: {deleteModalVisible}}) => ({
    deleteModalVisible
}), null)(UserTable);
