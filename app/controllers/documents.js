export default class DocumentsCtrl {
  static $inject = ['$http', '$stateParams', '$uibModal', '$scope']

  constructor ($http, $stateParams, $uibModal, $scope) {
    this._url = '/sena-project/api/documents.php'
    this.$http = $http
    this.$stateParams = $stateParams
    this._refreshData()
    this.$uibModal = $uibModal
    this.$scope = $scope
  }

  _refreshData () {
    this.$http
      .get(this._url, { params: { id_request: this.$stateParams.id } })
      .then(res => {
        console.log(res)
        this.all = res.data
      })
  }

  openModal () {
    this.$uibModal.open({
      controller: 'DocumentCtrl as document',
      templateUrl: 'app/views/modals/document.html'
    }).result.then(action => {
      this._refreshData()
      this.$scope.dashboard.action = action
    })
  }
}
