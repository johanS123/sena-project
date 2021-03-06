export default class UserCtrl {
  static $inject = ['$http', '$uibModalInstance', 'data', 'title', '$localStorage']

  constructor ($http, $uibModalInstance, data, title, $localStorage) {
    this.title = title
    this.authenticated = $localStorage.user
    delete data.password // Delete encrypted password
    this.data = data
    this._url = '/sena-project/api/users.php'
    this.$http = $http
    this.$uibModalInstance = $uibModalInstance
  }

  dismissModal () {
    this.$uibModalInstance.dismiss()
  }

  save () {
    this.$http
      .post(this._url, this.data)
      .then(res => {
        this.$uibModalInstance.close({
          successfully: true,
          message: 'Usuario guardado exitosamente',
          user: this.data
        })
      })
  }

  delete () {
    this.$http
      .delete(this._url, { data: { id: this.data.id } })
      .then(res => {
        this.$uibModalInstance.close({
          successfully: true,
          message: 'Usuario eliminado correctamente'
        })
      })
  }
}
