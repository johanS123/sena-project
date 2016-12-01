// Libraries
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'
import ngResource from 'angular-resource'
import ngStorage from 'ngstorage'

// Controllers
import DashboardCtrl from './controllers/dashboard'
import LoginCtrl from './controllers/login'
import UserCtrl from './controllers/modals/user'
import UsersCtrl from './controllers/users'
import CoursesCtrl from './controllers/courses'
import AssistsCtrl from './controllers/assists'
import DocumentsCtrl from './controllers/documents'
import ObservationsCtrl from './controllers/observations'
import ObservationCtrl from './controllers/modals/observation'

// Configuration
import config from './config'
import boot from './boot'

// Application setup
angular
  .module('ai-edu', [uiRouter, uiBootstrap, ngResource, ngStorage.name])
  .config(config)
  .controller('DashboardCtrl', DashboardCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('UsersCtrl', UsersCtrl)
  .controller('UserCtrl', UserCtrl)
  .controller('CoursesCtrl', CoursesCtrl)
  .controller('AssistsCtrl', AssistsCtrl)
  .controller('DocumentsCtrl', DocumentsCtrl)
  .controller('ObservationsCtrl', ObservationsCtrl)
  .controller('ObservationCtrl', ObservationCtrl)
  .run(boot)
