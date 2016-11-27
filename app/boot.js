export default boot

boot.$inject = ['$rootScope', '$state', '$localStorage']

function boot ($rootScope, $state, $localStorage) {
  // This information should be imported from package.json file
  const page = {
    title: 'Ai-Edu',
    description: 'SENA final-project',
    author: 'AeroXMotion'
  }

  function verifyAuth () {
    const user = $localStorage.user
    const stateName = $state.current.name

    if (!user) {
      return stateName !== 'login' && $state.go('login')
    }

    switch (stateName) {
      case 'login':
        $state.go('home')
      break

      case 'home':
        $state.go('login')
      break

      case 'users':
        if (user.role !== 'administrador') {
          $state.go('home')
        }
      break

      case 'courses':
      break
    }
  }

  $rootScope.page = page
  $rootScope.$on('$stateChangeStart', verifyAuth)
}
