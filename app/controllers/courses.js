export default class CoursesCtrl {
  static $inject = ['$http', '$scope', 'historyServ']

  constructor ($http, $scope, historyServ) {
    this.historyServ = historyServ
    this._url = '/sena-project/api/courses.php'
    this.$http = $http
    this.$scope = $scope
    this._refreshData()
  }

  _refreshData () {
    this.$http
      .get(this._url)
      .then(res => {
        this.all = res.data
      })
  }

  save (course) {
    this.$http
      .post(this._url, course)
      .then(res => {
        console.log(res)

        this.$scope.dashboard.action = {
          successfully: true,
          message: 'Curso creado exitosamente'
        }

        this.historyServ.save(`Registró el curso "${course.name}"`)

        course.name = ''
        course.start_date = ''

        this._refreshData()
      })
  }
}
