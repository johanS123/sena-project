export default class DashboardCtrl {
  static $inject = ['$localStorage']

  constructor ($localStorage) {
    this.$localStorage = $localStorage
    this.user = this.$localStorage.user
  }

  logout () {
    delete this.user
    delete this.$localStorage.user
  }
}
