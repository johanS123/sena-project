export default class UsersCtrl {
  static $inject = ['$http', '$uibModal', '$scope', 'historyServ']

  constructor ($http, $uibModal, $scope, historyServ) {
    this.currentPage = 1
    this.$uibModal = $uibModal
    this.$http = $http
    this.$scope = $scope
    this.historyServ = historyServ
    this._refreshData()
  }

  _refreshData () {
    this.$http
      .get('/sena-project/api/users.php')
      .then(({ data }) => {
        this.all = data.filter(user => user.id !== this.$scope.dashboard.user.id)
      })
  }

  _openModal (view, title, data = {}, cb) {
    this.$uibModal.open({
      templateUrl: `app/views/modals/${view}.html`,
      controller: 'UserCtrl as user',
      resolve: {
        title: () => title,
        data: data
      }
    }).result.then(action => {
      if (typeof cb === 'function') {
        cb(action.user)
      } else {
        this.historyServ.save(cb)
      }

      this.$scope.dashboard.action = action
      this._refreshData()
    })
  }

  openCreateModal () {
    this._openModal('user', 'Crear usuario', {}, user => {
      this.historyServ.save(`Creó un "${user.role}"`)
    })
  }

  openHistoryModal (userId) {
    this.$uibModal.open({
      templateUrl: 'app/views/modals/history.html',
      controller: 'HistoryCtrl as history',
      resolve: {
        data: { id_user: userId }
      }
    })
  }

  openEditModal (data) {
    this._openModal('user', 'Editar usuario', data, `Actualizó el usuario con id: ${data.id}`)
  }

  openDeleteModal (data) {
    this._openModal('deleteUser', 'Eliminar usuario', data, `Eliminó el usuario con id: ${data.id}`)
  }
}
