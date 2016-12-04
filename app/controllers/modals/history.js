export default class HistoryCtrl {
  static $inject = ['$http', '$uibModalInstance', 'data']

  constructor ($http, $uibModalInstance, data) {
    this.userId = data.id_user
    this.$uibModalInstance = $uibModalInstance

    $http
      .get('/sena-project/api/history.php', { params: { id_user: data.id_user } })
      .then(res => {
        console.log(res)
        this.all = res.data
      })
  }

  dismissModal () {
    this.$uibModalInstance.dismiss()
  }
}
