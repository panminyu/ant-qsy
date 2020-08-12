
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

export const setCid = (cid) => {
  localStorage.setItem('Cid', cid)
}

export const getCid = () => {
  return localStorage.getItem('Cid')
}

export const setUsers = (users) => {
  localStorage.setItem('Users', users)
}

export const getUsers = () => {
  return localStorage.getItem('Users')
}

export const setCurrentUser = (currentUser) => {
  localStorage.setItem('CurrentUser', currentUser)
}

export const getCurrentUser = () => {
  return localStorage.getItem('CurrentUser')
}

export const setPower = (users, currentUser, cid) => {
  setUsers(users)
  setCurrentUser(currentUser)
  setCid(cid)
}
