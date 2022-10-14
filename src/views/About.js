import React from 'react';
import {useParams} from 'react-router-dom'
import {connect, useDispatch} from "react-redux";
import Button from "react-bootstrap/Button";
import {
    editUser,
    handleSaveUser,
    resetFilteredFields,
    resetFilterFields,
    setUserEditFields
} from "../actions/userAction";

function About(props) {
    const {id} = useParams()
    const dispatch = useDispatch()

    const {first = "", last = "", country = "", email = ""} = props.item


    return (
        <div className="container">
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(handleSaveUser())
                }} className="form">
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="first">First Name</label>
                            <input
                                onChange={({target: {value}}) => dispatch(setUserEditFields({key: "first", value}))}
                                id="first"
                                name="first"
                                type="text"
                                value={first}
                                placeholder="First Name"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="last">Last Name</label>
                            <input
                                onChange={({target: {value}}) => dispatch(setUserEditFields({key: "last", value}))}
                                id="last"
                                name="last"
                                type="text"
                                value={last}
                                placeholder="Last Name"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="country">Country</label>
                            <input
                                onChange={({target: {value}}) => dispatch(setUserEditFields({key: "country", value}))}
                                id="country"
                                name="country"
                                type="text"
                                value={country}
                                placeholder="Country"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={({target: {value}}) => dispatch(setUserEditFields({key: "email", value}))}
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <h3 className={props.userNotFound ? "user-not-found" : "user-found"}>user not
                            found</h3>
                        <div>
                            <button
                                type="button"
                                className="btn btn-danger mr-3"
                                onClick={() => dispatch(resetFilteredFields())}
                            >
                                Clear
                            </button>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>

            </div>
            <div className="row">{
                props.users.map(item => (item.login.uuid === id ?
                        <div key={item.login.uuid} className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <img src={item.picture.large} alt={item.name.first}/>
                                </div>
                                <div className="card-body">
                                    <p>{item.name.title}: {item.name.first} {item.name.last}</p>
                                    <p>Age: {item.dob.age}</p>
                                    <p>Nation: {item.nat}</p>
                                    <p>Country: {item.location.country}</p>
                                    <p>City: {item.location.city}</p>
                                    <p>State: {item.location.state}</p>
                                    <p>Street: {item.location.street.name}</p>
                                    <p>Street number: {item.location.street.number}</p>
                                    <p>Phone number: {item.phone}</p>
                                    <span>Email: {item.email}</span>
                                    <div><Button variant="warning" onClick={() => dispatch(editUser(item))}
                                                 className="mt-3">Edit</Button></div>
                                </div>
                            </div>
                        </div> : ""
                ))
            }</div>
        </div>
    );
}

export default connect(({userStore: {users, item}}) => ({users, item}), null)(About);
