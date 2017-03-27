<#-- 
 # Ajax autosave.
 #
 # @author Eldevan Nery Jr				 
 #-->
<#if (autosave?exists && autosave?is_number)  ||  ajax?exists >  
	<script type="text/javascript">		
	
	<#if autosave?exists >					
	
		function autoSave() {
			$('#label-success').fadeIn(2000);
			$('#label-success').css("background-color","green");
			$('#label-success').text('${savingMessage}');
			$.ajax({
				type : "POST",
				dataType : 'html',
				url : '${flowExecutionUrl}',
				data : $("#ajaxForm").serialize()
						+ '&_eventId=autoSave&ajaxSource=true',
				success : function() {	
					$('#label-success').css("background-color","green");
					$('#label-success').css("color","white");
					$('#label-success').text('${saveSuccessMessage}');
					$('#label-success').fadeOut(2000);
				},
				error:function() {	
					$('#label-success').css("background-color","#FF1111");
					$('#label-success').css("color","yellow");
					$('#label-success').text('${saveFailureMessage}');
					$('#label-success').fadeOut(2000);
				}
			});
			
		};
		
	</#if>
	
	$(window).load( function(){
 		<#if autosave?exists >				
 			self.setInterval(function(){autoSave()},${autosave?c});
		</#if>
		<#if ajax?exists >	
			<#include "${basePath!\"\"}${ajax}"/>
		</#if>
	};
	
	</script>
</#if>
