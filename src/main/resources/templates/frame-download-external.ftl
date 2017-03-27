[#ftl]
<!DOCTYPE html >
<html id="ng-app" xmlns:ng="http://angularjs.org" data-ng-app="${baseName}" data-ng-cloak>

<head>
    <meta content="text/html; iso-8859-1" http-equiv="content-type">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
    <!-- Styles -->
	<!-- Bootstrap style -->
	<link rel='stylesheet' href='/webjars/bootstrap/css/bootstrap.min.css'>
	<!-- Slim Style -->
	<link rel='stylesheet' href='/css/slim-main-1.3.css'>
	<link rel='stylesheet' href='/css/slim-ui-1.3.css'>
	<!-- Loading bar -->
	<link rel='stylesheet' href='/webjars/angular-loading-bar/loading-bar.min.css'>
	<!-- Morris style -->
	<link rel="stylesheet" href="/webjars/morrisjs/morris.css">
	<!-- font-awesome -->
	<link rel='stylesheet' href="/webjars/font-awesome/css/font-awesome.css">
	<!-- font-ionicons -->
	<link rel='stylesheet' href="/webjars/ionicons/css/ionicons.min.css">
	<!-- font-foundation -->
	<link rel='stylesheet' href="/webjars/foundation-icon-fonts/foundation-icons.css">
	<!--[if lte IE 7]>
		<script src="/webjars/json3/json3.min.js"></script>
	<![endif]-->
    <!-- Redactor -->
    <link rel="stylesheet" href="/redactor/redactor.css" />
	<!-- iservport css extension -->
	<link rel='stylesheet' href='/css/iservport.css'>
	
    <!-- Javascript -->
    <!-- JQuery -->
	<script type="text/javascript" src="/webjars/jquery/jquery.min.js"></script>
	<!-- Bootstrap package -->
	<script type="text/javascript" src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<!-- Knob -->
	<script type="text/javascript" src="/webjars/jquery-knob/jquery.knob.min.js"></script>
	<!-- Morris -->
	<script src="/webjars/raphaeljs/raphael-min.js"></script>
	<script src="/webjars/morrisjs/morris.min.js"></script>
    <!-- CK Editor -->
    <!-- script type="text/javascript" src="/webjars/ckeditor/ckeditor.js"> </script-->
    <!-- Js padrão
    <script type="text/javascript" src='/js/defaut.js'></script>-->
    <!-- L20N -->
    <script type="text/javascript" src='/js/l20n.min.js'></script>
    <link rel="localization"  href="/locales/manifest.json">
    <!-- i18n para menu -->
    <script type="text/javascript" src='/ng/_i18n/menu-pt-BR.js'></script>
    <script type="text/javascript">var externalId = ${(externalId!0)?c};var externalPrincipal = '${externalPrincipal!""}';</script>

	<link type="image/x-icon" href="/images/favicon.ico" rel="shortcut icon">
	<link type="image/x-icon" href="/images/favicon.ico" rel="icon">

    <title>${title!''}</title>

</head>
<body id="app" 
	data-ng-controller="${baseName?capitalize}Controller as ${baseName}Ctrl"
	class="app ng-animate layout-boxed">
	<!-- 
	 ! Menu
	 ! -->
	[#if externalBrand??]
	<div class="header clearfix ng-scope">
	<nav>
		<ul class="nav nav-pills pull-right">
			<li role="presentation" class="active"><a href="/home">Login</a></li>
			<li role="presentation"><a href="/signup">Criar conta</a></li>
		</ul>
	</nav>
	<h3 class="text-muted">${externalBrand}</h3>
	</div>
	[/#if]
	
	<!-- 
	 ! Conteúdo principal
	 ! -->
	<div class="main-container" data-ng-init="getAttemptDownload([#if externalData??]${externalData.id}[/#if])">
	
		[#-- TODO remove
			[#if externalContent??]${externalContent}[/#if]
		#--]
			[#if externalData??  && !identityData??]
			<div class="alert alert-info" role="alert" data-ng-hide="externalValue.maxAttemped">
				Olá ${externalData.principal} clique no link pra baixar
				<a href="" data-ng-click="updateAttemptDownload(${externalData.id})">Baixar</a>
			</div>	
			<div class="alert alert-danger alert-dismissible" role="alert" data-ng-show="externalValue.maxAttemped">
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			  <strong>Atenção!</strong> Você atingiu o número máximo de dowloads para este arquivo.
			</div>
			[/#if]
			[#if identityData??]
			<div class="alert alert-success" role="alert" >
				Olá ${identityData.principal} verifique seu email para baixar o arquivo solicitado
			</div>	
			[/#if]
	
	</div><!--main-container-->
	
	<!--
	 ! Modal mostrado quando o modelo exibe modalBody.
	 !-->
	<div class="modal fade" id="modalBody" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
	   	<div class="modal-content">
	    	<div data-ng-include="getFormUrl()" ></div>
		</div>
		</div><!-- modal-dialog -->
	</div><!-- modal-fade -->	
	
	<!-- AngularJs package -->
	<script type="text/javascript" src="/webjars/angularjs/angular.min.js"></script>
	<script type="text/javascript" src="/webjars/angularjs/angular-sanitize.min.js"></script>
	<script type="text/javascript" src="/webjars/angularjs/angular-resource.js"></script>
	<script type="text/javascript" src="/webjars/angularjs/angular-route.min.js"></script>
	<script type="text/javascript" src="/webjars/angularjs/angular-cookies.min.js"></script>
	<script type="text/javascript" src="/webjars/angularjs/angular-animate.min.js"></script>
	<script type="text/javascript" src="/webjars/angularjs/i18n/angular-locale_${locale!'pt-br'}.js"></script>
	<script type="text/javascript" src="/webjars/angular-loading-bar/loading-bar.min.js"></script>
	<script type="text/javascript" src="/webjars/angular-ui-bootstrap/ui-bootstrap-tpls.js"></script>
	<script type="text/javascript" src="/webjars/angular-ui-utils/ui-utils.min.js"></script>
    <!-- Redactor -->
    <script src="/redactor/redactor.min.js"></script>
	<script type="text/javascript" src="/ng/angular-redactor.js"> </script>
	<!-- i18n para linguagem--> 
    <script type="text/javascript" src='/ng/_i18n/i18n-${locale!'pt-br'}.js'></script>
    <script type="text/javascript" src='/ng/_i18n/i18n-${baseName}-${locale!'pt-br'}.js'></script>
    <!-- Services to apps-->
	<script type="text/javascript" src="/ng/services.js"></script>
	<script type="text/javascript" src="/ng/${baseName}/ng-${baseName}-module.js"></script>
	[#if customControllerBody??]
	<script type="text/javascript" >
		var app = angular.module(${baseName});
		app.controller('CustomController', ['$scope', '$http','$resource', 'genericServices', 'securityServices', 'commomLang', 'controllerLang'
                                       , function($scope, $http, $resource, genericServices, securityServices, commomLang, contentLocale) {
			${customControllerBody}
        }
	</script>
	[/#if]

</body>

</html>
