export default class DocumentsCtrl {
  static $inject = ['$http', '$stateParams', '$uibModal', '$scope', 'historyServ']

  constructor ($http, $stateParams, $uibModal, $scope, historyServ) {
    this.historyServ = historyServ
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
      this.historyServ.save('Subió un documento')
      this._refreshData()
      this.$scope.dashboard.action = action
    })
  }
}
