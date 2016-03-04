import App from 'ReposList/app/App';
import { ExternalLogger } from 'utils/LogDecorator';
import 'angular-messages';

let $log = new ExternalLogger();
    $log = $log.getInstance( "BOOTSTRAP" );
    $log.debug( "Configuring 'main' module" );

export default angular.module('main', [App, 'ngMessages'] ).name;




