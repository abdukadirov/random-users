import axios from "axios";
import * as ActionTypes from "../actionTypes/userActionTypes"

export function objToQuery(object) {
  return new URLSearchParams(object).toString()
}

export function getUsers({params}) {
  const query = objToQuery(params)
  return (dispatch) => {
    dispatch({type: ActionTypes.LOADING});
    axios.get(`https://randomuser.me/api/?${query}`)
      .then((response) => {
        if (response && response.status === 200) {
          dispatch({type: ActionTypes.GET_USERS, data: response.data.results})
          dispatch({type: ActionTypes.LOADING})
        }
      })
      .catch((error) => {
        alert(error.error)
        dispatch({type: ActionTypes.LOADING})
      })
  }

}

export function showSearchList() {
  return (dispatch) => {
    dispatch({type: ActionTypes.SHOW})
  }
}

export function changeList(data) {
  return (dispatch) => {
    dispatch({type: ActionTypes.USER_LIST_TYPE, data})
  }
}

export function setRandom() {
  return (dispatch) => {
    dispatch({type: ActionTypes.RANDOM})
  }
}

export function onChangeFilterFields(value, key) {
  return (dispatch) => {
    dispatch({type: ActionTypes.CHANGE_FILTER_FIELDS, data: {key, value}})
  }
}

export function setFilterUsers() {
  return (dispatch, getState) => {
    const {userStore: {filterForm, users}} = getState();
    const selectedUsers = users.filter((item) =>
      (filterForm.first.trim() && item.name.first.toLowerCase().trim().indexOf(filterForm.first.toLowerCase().trim()) > -1) ||
      (filterForm.last.trim() && item.name.last.toLowerCase().trim().indexOf(filterForm.last.toLowerCase().trim()) > -1) ||
      (filterForm.country.trim() && item.location.country.toLowerCase().trim().indexOf(filterForm.country.toLowerCase().trim()) > -1) ||
      (filterForm.email.trim() && item.email.trim() === filterForm.email.trim()))
    dispatch({type: ActionTypes.FILTER_USERS, data: selectedUsers})
    if (selectedUsers.length > 0) {
      dispatch({type: ActionTypes.SHOW})
      dispatch({type: ActionTypes.USER_NOT_FOUND, data: false})
    } else {
      dispatch({type: ActionTypes.USER_NOT_FOUND, data: true})
    }
  }
}

export function resetFilterFields() {
  return (dispatch) => {
    dispatch({type: ActionTypes.RESET_FILTER_FIELDS})
  }
}

export function resetFilteredFields() {
  return (dispatch) => {
    dispatch({type: ActionTypes.RESET_FILTERED_FIELDS})
  }
}

export function setUserToDelete(data) {
  return (dispatch) => {
    dispatch({type: ActionTypes.DELETING_USER, data})
  }
}

export function deleteUser() {
  return (dispatch) => {
    dispatch({type: ActionTypes.DELETE_USER})
    dispatch(toggleDeleteModalVisible())
  }
}

export function toggleDeleteModalVisible() {
  return (dispatch) => {
    dispatch({type: ActionTypes.DELETE_MODAL_VISIBLE})
  }
}

export function editUser(data) {
  return (dispatch) => {
    dispatch({type: ActionTypes.EDIT_USER, data})
  }
}

export function setUserItem(data) {
  return (dispatch) => {
    dispatch({type: ActionTypes.SET_USER_ITEM, data})
  }
}

export function setUserEditFields(data) {
  return(dispatch) => {
    dispatch({type: ActionTypes.SET_USER_EDIT_FIELDS, data})
  }
}

export function handleSaveUser() {
  return(dispatch) => {
    dispatch({type: ActionTypes.SAVE_USER_FIELDS})
  }
}