export default boot

boot.$inject = ['$rootScope', '$state', '$localStorage']

function boot ($rootScope, $state, $localStorage) {
  // This information should be imported from package.json file
  const page = {
    title: 'Ai-Edu',
    description: 'SENA final-project',
    author: 'AeroXMotion'
  }

  function verifyAuth (e, toState) {
    const user = $localStorage.user
    const stateName = toState.name

    function redirect (state) {
      e.preventDefault()
      $state.go(state)
    }

    if (user) {
      switch (stateName) {
        /*
        case 'login':
          redirect('home')
        break

        case 'courses':
          if (user.role === 'secretariado') {
            redirect('home')
          }
        break

        case 'observations':
          if (user.role === 'secretariado' ||
              user.role === 'administrador') {
            redirect('home')
          }
        break

        case 'requests':
          if (user.role !== 'acudiente' &&
              user.role !== 'secretariado') {
            redirect('home')
          }
        break

        case 'reports':
          if (user.role !== 'acudiente' &&
              user.role !== 'profesor' &&
              user.role !== 'coordinador') {
            redirect('home')
          }
        break*/
      }
    } else if (stateName !== 'login') {
      redirect('login')
    }
  }

  $rootScope.page = page
  $rootScope.$on('$stateChangeStart', verifyAuth)
}
