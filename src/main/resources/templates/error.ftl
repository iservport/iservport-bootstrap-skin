[#ftl]
<!DOCTYPE html >
<html >

<head>
    <meta content="text/html; iso-8859-1" http-equiv="content-type">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

    [#include "/frame-head.ftl" /]

	<link type="image/x-icon" href="/images/favicon.ico" rel="shortcut icon">
	<link type="image/x-icon" href="/images/favicon.ico" rel="icon">

    <title>${title!''}</title>

    [#if _csrf??]
	<meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    [/#if]

</head>
<body >

	<!--
	 ! Conteúdo principal
	 ! -->
	<div class="main-container" >
	    <div id="content" class="content-container">
            <section class="view-container animate-fade-up">
                <div class="page" >
                    <p>${timestamp?datetime}</p>
                    <p>${status}</p>
                    <p>${error}</p>
                    <p>${exception!''}</p>
                    <p>${message!''}</p>
                    <p>${path!''}</p>
                </div><!-- end of page -->
            </section>
	    </div><!--content-->
	</div><!--main-container-->

    [#if _csrf??]
	<input type="hidden" id="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
    [/#if]

</body>

</html>

