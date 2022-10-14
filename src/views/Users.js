import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    getUsers,
    setFilterUsers,
    onChangeFilterFields,
    resetFilterFields,
} from "../actions/userAction";
import {useDispatch} from "react-redux";
import UsersCard from "../components/UsersCard";
import {useFormik} from "formik";
import UserTable from "../components/UserTable";

function Users(props) {

    const dispatch = useDispatch()
    const thisGetUsers = () => {
        const params = {gender: "female", results: 20}
        dispatch(getUsers({params}))
    }

    useEffect(() => {
        thisGetUsers()
    }, [dispatch])

    const [state, setState] = useState([])
    useEffect(() => {
        if (props.selectedUsers.length > 0) {
            setState(props.selectedUsers)
        } else {
            setState(props.users)
        }
    }, [thisGetUsers])


    /*  if (props.selectedUsers.length === 0 && props.term.length) {
        return (
          <div className="container">
            <div className="row vh-70 d-flex justify-content-center align-items-center">
              <div className="col-md-8">
                <img src="/images/user.jpg" alt="not found" className="img-fluid"/>
              </div>
            </div>
          </div>
        )
      }*/

    const formik = useFormik({
        initialValues: props.filterForm,
        onSubmit: values => {
            dispatch(setFilterUsers(values))
        },
    });

    const handleReset = (values, formProps) => {
        return formik.resetForm
    };


    return (
        <div className="container">
            <div className={props.show === true ? "show" : "hide"}>
                <form onSubmit={formik.handleSubmit} onReset={handleReset} className="form">
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="first">First Name</label>
                            <input
                                id="first"
                                name="first"
                                type="text"
                                onChange={({target}) => dispatch(onChangeFilterFields(target.value, "first"))}
                                value={props.filterForm.first}
                                placeholder="First Name"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="last">Last Name</label>
                            <input
                                id="last"
                                name="last"
                                type="text"
                                onChange={({target}) => dispatch(onChangeFilterFields(target.value, "last"))}
                                value={props.filterForm.last}
                                placeholder="Last Name"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="country">Country</label>
                            <input
                                id="country"
                                name="country"
                                type="text"
                                onChange={({target}) => dispatch(onChangeFilterFields(target.value, "country"))}
                                value={props.filterForm.country}
                                placeholder="Country"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={({target}) => dispatch(onChangeFilterFields(target.value, "email"))}
                                value={props.filterForm.email}
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <h3 className={props.userNotFound ? "user-not-found" : "user-found"}>User not
                            found</h3>
                        <div>
                            <button type="button" onClick={() => dispatch(resetFilterFields())}
                                    className="btn btn-danger mr-3">Clear
                            </button>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>

            </div>
            <div className="row">
                {
                    props.userListType === 'TABLE' ? <UserTable users={state}/>
                        : state.map((item, index) => (
                            <UsersCard
                                index={index}
                                key={item.login.uuid}
                                id={item.login.uuid}
                                title={item.name.title}
                                first={item.name.first}
                                last={item.name.last}
                                country={item.location.country}
                                city={item.location.city}
                                email={item.email}
                                img={item.picture.large}
                            />
                        ))
                }
            </div>
            {/*<div className="d-flex justify-content-between mt-3">*/}
            {/*    <h3 className={props.userNotFound ? "user-not-found" : "user-found"}>User not found</h3>*/}
            {/*    <button className="btn btn-primary" type="submit">Submit</button>*/}
            {/*    <button type="reset" className="btn btn-danger">reset</button>*/}
            {/*</div>*/}
        </div>
    );
}

export default connect(({userStore: {users, selectedUsers, term, userListType, show, filterForm, userNotFound}}) => ({
    users,
    selectedUsers,
    term,
    userListType,
    show,
    filterForm,
    userNotFound
}), null)(Users);
