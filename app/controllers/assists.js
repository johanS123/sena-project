export default class AssistsCtrl {
  static $inject = ['$http', '$stateParams']

  constructor ($http, $stateParams) {
    this._url = '/sena-project/api/assists.php'
    this.$http = $http
    this.courseId = $stateParams.id
    this._refreshData()
  }

  _refreshData () {
    this.$http
      .get(this._url, { params: { id_course: this.courseId } })
      .then(res => {
        console.log(res.data)
        this.all = res.data
      })
  }

  attended (assistId, attended) {
    this.$http
      .post(this._url, {
        id: assistId,
        attended: attended
      })
      .then(res => {
        this._refreshData()
      })
  }

  register (studentId) {
    this.$http
      .post(this._url, {
        id_course: this.courseId,
        id_user: studentId
      })
      .then(res => {
        console.log(res.data)
        this._refreshData()
      })
  }
}