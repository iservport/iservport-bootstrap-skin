angular.module('${baseName}', ['ui.bootstrap', 'app.services', 'ngResource', 'ngSanitize', 'angular-loading-bar', 'angular-redactor'])
/**
 * Recursos de conteúdo
 */
.factory('${baseName}', ['$resource', function($resource) {
	var service = {};
	var actions = { save: { method: 'PUT'}, create: {method: 'POST' }, remove:{method:'DELETE'}};
	service.qualifierResource = $resource("/app/${baseName}/qualifier");
	service.resource = $resource("/app/${baseName}/:method", null, actions);
	service.contentKnowledgeResource = $resource("/app/content/knowledge/:method", null, actions);

	return service;
}])