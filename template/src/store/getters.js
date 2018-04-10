const getters = {
  token: state => state.user.token,
  account: state => state.user.account,
  userId: state => state.user.userId,
  username: state => state.user.username,
  roles: state => state.user.roles
}
export default getters
