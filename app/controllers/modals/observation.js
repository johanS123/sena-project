export default class ObservationCtrl {
  static $inject = ['$http', '$uibModalInstance']

  constructor ($http, $uibModalInstance) {
    this._url = '/sena-project/api/observations.php'
    this.$http = $http
    this.$uibModalInstance = $uibModalInstance
    this.data = {}
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
          message: 'Observación creada exitosamente'
        })
      })
  }
}
