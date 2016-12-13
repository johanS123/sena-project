export default class ReportCtrl {
  static $inject = ['$http', '$uibModalInstance']

  constructor ($http, $uibModalInstance) {
    this.data = {}
    this._url = '/sena-project/api/reports.php'
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
          message: 'Informe añadido exitosamente'
        })
      })
  }
}
