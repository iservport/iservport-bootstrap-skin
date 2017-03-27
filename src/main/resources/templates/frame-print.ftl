[#ftl]
<!DOCTYPE html >
<html id="ng-app" xmlns:ng="http://angularjs.org"
    data-ng-app="${baseName!'print'}"
    [#if baseName?? ]
        data-ng-controller="${baseName?capitalize}Controller as ${baseName}Ctrl"
    [#else]
        data-ng-controller="PrintController as printCtrl"
    [/#if]
    moznomarginboxes
    data-ng-cloak>

<head>
    <meta content="text/html; iso-8859-1" http-equiv="content-type">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
    [#include "/frame-head.ftl" /]

    <link type="image/x-icon" href="/images/favicon.ico" rel="shortcut icon">
    <link type="image/x-icon" href="/images/favicon.ico" rel="icon">
    <link rel='stylesheet' href="/css/iservport-print.css">

    <script type="text/javascript">var externalId = ${(externalId!0)?c};</script>

    <title>${title!''}</title>



</head>
<body id="app" class="app ng-animate">

	<!-- 
	 ! Conteúdo principal
	 ! -->
	<div class="main-container">
	
		[#if printContent??][#include "${printContent}.html"/][/#if]

	</div><!--main-container-->

	[#include "/_js.html" /]
    [#include "/_custom.html" /]
	
</body>

</html>
