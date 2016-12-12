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
import RequestsCtrl from './controllers/requests'
import RequestCtrl from './controllers/modals/request'
import DocumentCtrl from './controllers/modals/document'
import ReportsCtrl from './controllers/reports'
import ReportCtrl from './controllers/report'
import HistoryCtrl from './controllers/modals/history'
import historyServ from './services/history'

// Configuration
import config from './config'
import boot from './boot'

// Application setup
angular
  .module('ai-edu', [uiRouter, uiBootstrap, ngResource, ngStorage.name])
  .config(config)
  // Filter for pagination (simple workaround)
  .filter('fromIndex', () => (data, index) => {
    if (data) {
      console.log(index)
      return data.slice(index)
    }
  })
  // (end workaround)
  .service('historyServ', historyServ)
  .controller('DashboardCtrl', DashboardCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('UsersCtrl', UsersCtrl)
  .controller('UserCtrl', UserCtrl)
  .controller('CoursesCtrl', CoursesCtrl)
  .controller('AssistsCtrl', AssistsCtrl)
  .controller('DocumentsCtrl', DocumentsCtrl)
  .controller('ObservationsCtrl', ObservationsCtrl)
  .controller('ObservationCtrl', ObservationCtrl)
  .controller('RequestsCtrl', RequestsCtrl)
  .controller('RequestCtrl', RequestCtrl)
  .controller('DocumentCtrl', DocumentCtrl)
  .controller('ReportsCtrl', ReportsCtrl)
  .controller('ReportCtrl', ReportCtrl)
  .controller('HistoryCtrl', HistoryCtrl)
  .run(boot)
