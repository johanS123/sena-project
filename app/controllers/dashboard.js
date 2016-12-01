export default class DashboardCtrl {
  static $inject = ['$localStorage', '$state', '$uibModal']

  constructor ($localStorage, $state, $uibModal) {
    this.$state = $state
    this.$localStorage = $localStorage
    this.$uibModal = $uibModal
    this.user = this.$localStorage.user
  }

  openProfileModal () {
    this.$uibModal.open({
      controller: 'UserCtrl as user',
      templateUrl: 'app/views/modals/user.html',
      resolve: {
        title: () => 'Modificar perfil',
        data: this.user
      }
    }).result.then(action => {
      this.action = action
    })
  }

  dismissAlert () {
    delete this.action
  }

  logout () {
    delete this.user
    delete this.$localStorage.user
    this.$state.go('login')
  }
}
