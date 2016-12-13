export default class ReportsCtrl {
  static $inject = ['$http', '$uibModal', '$scope', 'historyServ']

  constructor ($http, $uibModal, $scope, historyServ) {
    this.currentPage = 1
    this._url = '/sena-project/api/reports.php'
    this.$scope = $scope
    this.$http = $http
    this.$uibModal = $uibModal
    this.historyServ = historyServ
    this._refreshData()
  }

  _refreshData () {
    this.$http
      .get(this._url)
      .then(res => {
        console.log(res)
        this.all = res.data
      })
  }

  openModal () {
    this.$uibModal.open({
      controller: 'ReportCtrl as report',
      templateUrl: 'app/views/modals/report.html'
    }).result.then(action => {
      this.historyServ.save('Creó un informe')
      this._refreshData()
      this.$scope.dashboard.action = action
    })
  }
}
