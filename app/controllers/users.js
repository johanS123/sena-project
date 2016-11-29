export default class UsersCtrl {
  static $inject = ['$http', '$uibModal']

  constructor ($http, $uibModal) {
    this.$uibModal = $uibModal
    this.$http = $http
    this._refreshData()
  }

  _refreshData () {
    this.$http
      .get('/sena-project/api/users.php')
      .then(({ data }) => {
        this.all = data
      })
  }

  _openModal (view, title, data = {}) {
    this.$uibModal.open({
      templateUrl: `app/views/modals/${view}.html`,
      controller: 'UserCtrl as user',
      resolve: {
        title: () => title,
        data: data
      }
    }).result.then(action => {
      console.log(action)
      this.action = action
      this._refreshData()
    }, () => {
      this._refreshData()
    })
  }

  openCreateModal () {
    this._openModal('user', 'Crear usuario')
  }

  openEditModal (data) {
    this._openModal('user', 'Editar usuario', data)
  }

  openDeleteModal (data) {
    this._openModal('deleteUser', 'Eliminar usuario', data)
  }
}
