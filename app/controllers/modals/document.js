import angular from 'angular'

export default class DocumentCtrl {
  static $inject = ['$http', '$uibModalInstance', '$stateParams']

  constructor ($http, $uibModalInstance, $stateParams) {
    this.data = {}
    this.formData = new FormData()
    this.formData.append('id_request', $stateParams.id)
    this.$uibModalInstance = $uibModalInstance
    this.$http = $http
    this._url = '/sena-project/api/documents.php'
  }

  dismissModal () {
    this.$uibModalInstance.dismiss()
  }

  uploadFiles (files) {
    this.formData.append('document', files[0])
  }

  save () {
    this.formData.append('type', this.data.type)
    this.formData.append('name', this.data.name)
    this.$http
      .post(this._url, this.formData, {
        withCredentials: true,
        headers: { 'Content-Type': undefined },
        transformRequest: angular.identity
      })
      .then(res => {
        console.log(res)
        this.$uibModalInstance.close({
          successfully: true,
          message: 'Documento subido correctamente'
        })
      })
  }
}
