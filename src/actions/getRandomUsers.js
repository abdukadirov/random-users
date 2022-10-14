import axios from 'axios'


export function getUsers() {
  return function (dispatch) {
    dispatch({type: 'UPDATE_STATE'})
    axios.get('https://randomuser.me/api/?gender=female')
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

}
