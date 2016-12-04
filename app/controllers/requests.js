export default class RequestsCtrl {
  static $inject = ['$http', '$uibModal', '$scope', '$state', 'historyServ']

  constructor ($http, $uibModal, $scope, $state, historyServ) {
    this.$state = $state
    this._url = '/sena-project/api/requests.php'
    this.$http = $http
    this.$uibModal = $uibModal
    this.$scope = $scope
    this.historyServ = historyServ
    this._refreshData()
  }

  _refreshData () {
    this.$http
      .get(this._url, this.$scope.dashboard.user.role !== 'secretariado'
        ? { params: { id_user: this.$scope.dashboard.user.id } }
        : {})
      .then(res => {
        console.log(res)
        this.all = res.data
      })
  }

  seeDocuments (requestId) {
    this.$state.go('documents', { id: requestId })
  }

  openModal () {
    this.$uibModal.open({
      controller: 'RequestCtrl as request',
      templateUrl: 'app/views/modals/request.html'
    }).result.then(action => {
      this.historyServ.save('Realizó una solicitud')
      this.action = action
      this._refreshData()
    })
  }
}
