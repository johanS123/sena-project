export default class ObservationsCtrl {
  static $inject = ['$http', '$uibModal', '$scope']

  constructor ($http, $uibModal, $scope) {
    this._url = '/sena-project/api/observations.php'
    this.$http = $http
    this.$scope = $scope
    this.$uibModal = $uibModal
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
      controller: 'ObservationCtrl as observation',
      templateUrl: 'app/views/modals/observation.html'
    }).result.then(action => {
      this.$scope.dashboard.action = action
      this._refreshData()
    })
  }
}
