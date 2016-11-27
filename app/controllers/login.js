export default class LoginCtrl {
  static $inject = ['$http', '$state', '$scope', '$localStorage']

  constructor ($http, $state, $scope, $localStorage) {
    this.data = {}
    this.authError = false
    this.$http = $http
    this.$state = $state
    this.$scope = $scope
    this.$localStorage = $localStorage
  }

  authenticate () {
    this.$http
      .post('/sena-project/api/auth_user.php', this.data)
      .then(res => {
        console.log(res)
        if (res.data.authenticated) {
          this.$scope.dashboard.user =
          this.$localStorage.user = res.data.user
          this.$state.go('home')
        } else {
          this.authError = true
        }
      })
  }
}
