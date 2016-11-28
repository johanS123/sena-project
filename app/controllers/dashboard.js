export default class DashboardCtrl {
  static $inject = ['$localStorage', '$state']

  constructor ($localStorage, $state) {
    this.$state = $state
    this.$localStorage = $localStorage
    this.user = this.$localStorage.user
  }

  logout () {
    delete this.user
    delete this.$localStorage.user
    this.$state.go('login')
  }
}
