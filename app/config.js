export default config

config.$inject = ['$stateProvider']

function config ($stateProvider) {
  const homeState = {
    name: 'home',
    url: '/',
    templateUrl: 'app/views/home.html'
  }

  const loginState = {
    name: 'login',
    url: '/login',
    controller: 'LoginCtrl as login',
    templateUrl: 'app/views/login.html'
  }

  const usersState = {
    name: 'users',
    url: '/users',
    controller: 'UsersCtrl as users',
    templateUrl: 'app/views/users.html'
  }

  const coursesState = {
    name: 'courses',
    url: '/courses',
    controller: 'CoursesCtrl as courses',
    templateUrl: 'app/views/courses.html'
  }

  const assistsState = {
    name: 'assists',
    url: '/courses/:id/assists',
    controller: 'AssistsCtrl as assists',
    templateUrl: 'app/views/assists.html'
  }

  const observationsState = {
    name: 'observations',
    url: '/observations',
    controller: 'ObservationsCtrl as observations',
    templateUrl: 'app/views/observations.html'
  }

  const documentsState = {
    name: 'documents',
    url: '/documents',
    controller: 'DocumentsCtrl as documents',
    templateUrl: 'app/views/documents.html'
  }

  $stateProvider.state(homeState)
  $stateProvider.state(loginState)
  $stateProvider.state(usersState)
  $stateProvider.state(coursesState)
  $stateProvider.state(assistsState)
  $stateProvider.state(observationsState)
  $stateProvider.state(documentsState)
}
