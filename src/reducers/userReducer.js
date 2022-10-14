import * as actionTypes from "../actionTypes/userActionTypes"
import {act} from "@testing-library/react";

function userReducer(state = {
  users: [],
  loading: false,
  show: false,
  userNotFound: false,
  selectedUsers: [],
  userListType: 'GRID',
  filterForm: {
    first: "",
    last: "",
    country: "",
    email: ""
  },
  deleteModalVisible: false,
  deletingUser: null,
  item: {},

}, {type, data}) {
  switch (type) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: [...state.users, ...data]
      }
    case actionTypes.LOADING:
      return {
        ...state,
        loading: !state.loading
      }

    case actionTypes.FILTER_USERS:
      return {
        ...state,
        selectedUsers: data
      }

    case actionTypes.USER_LIST_TYPE:
      return {
        ...state,
        userListType: data
      }

    case actionTypes.CHANGE_FILTER_FIELDS:
      return {
        ...state,
        filterForm: {
          ...state.filterForm,
          [data.key]: data.value
        }
      }

    case actionTypes.RANDOM:
      let users = [...state.users]
      let result = []
      users.length && users.forEach((item) => {
        const rnd = Math.floor(Math.random() * users.length)
        result.push(users[rnd])
        users = users.filter((item, index) => rnd !== index)
      })
      return {
        ...state,
        users: result
      }

    case actionTypes.SHOW:
      return {
        ...state,
        show: !state.show
      }

    case actionTypes.USER_NOT_FOUND:
      return {
        ...state,
        userNotFound: data
      }

    case actionTypes.RESET_FILTER_FIELDS:
      return  {
        ...state,
        filterForm: {
          first: "",
          last: "",
          country: "",
          email: ""
        },
        selectedUsers: []
      }

    case actionTypes.RESET_FILTERED_FIELDS:
      return {
        ...state,
        item: {}
      }

    case actionTypes.DELETING_USER:
      return {
        ...state,
        deleteModalVisible: true,
        deletingUser: data
      }

    case actionTypes.DELETE_USER:
      let filterUser = state.users.filter((item)=> item.login.uuid !== state.deletingUser)
      return {
        ...state,
        users: filterUser
      }

    case actionTypes.DELETE_MODAL_VISIBLE:
      return {
        ...state,
        deleteModalVisible: !state.deleteModalVisible
      }

    case actionTypes.EDIT_USER:
      return {
        ...state,
        item: {
          first: data.name.first,
          last: data.name.last,
          country: data.location.country,
          email: data.email,
          id: data.login.uuid
        }
      }

    case actionTypes.SET_USER_ITEM:
      return {
        ...state,
        item: data
      }

    case actionTypes.SET_USER_EDIT_FIELDS:
    const {key, value} = data
      return {
        ...state,
        item: {
          ...state.item,
          [key]: value
        }
      }

    case actionTypes.SAVE_USER_FIELDS:
       const res = state.users.map((user) => {
         if (user.login.uuid === state.item.id) {
           user.name.first = state.item.first
           user.name.last = state.item.last
           user.location.country = state.item.country
           user.email = state.email
         }
         return user
       })
      return {
        ...state,
        users: res,
        item: {}
      }
    default :
      return state
  }

}

export default userReducer;

