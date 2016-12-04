export default class historyServ {
  static $inject = ['$http', '$localStorage']

  constructor ($http, $localStorage) {
    this._url = '/sena-project/api/history.php'
    this.$http = $http
    this.$localStorage = $localStorage
  }

  save (action) {
    this.$http
      .post(this._url, {
        action: action,
        id_user: this.$localStorage.user.id
      })
      .then(res => {
        console.log('Historial actualizado')
        console.log(res)
      })
  }
}
