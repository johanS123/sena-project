export default class RequestCtrl {
  static $inject = ['$http', '$uibModalInstance', '$localStorage']

  constructor ($http, $uibModalInstance, $localStorage) {
    this.data = { id_user: $localStorage.user.id }
    this._url = '/sena-project/api/requests.php'
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
        console.log(res)
        this.$uibModalInstance.close({
          successfully: true,
          message: 'Solicitud creada exitosamente'
        })
      })
  }
}
