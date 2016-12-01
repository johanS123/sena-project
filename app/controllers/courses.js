export default class CoursesCtrl {
  static $inject = ['$http', '$scope']

  constructor ($http, $scope) {
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
        course.name = ''
        course.date_due = ''
        this.$scope.dashboard.action = {
          successfully: true,
          message: 'Curso creado exitosamente'
        }

        this._refreshData()
      })
  }
}
