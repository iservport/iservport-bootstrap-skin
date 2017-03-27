/*
 * JavaScript padrão do iservport-root
 * 
 */

//

				  $(document).ready(function () {
					  
					//usado pra mudar a view da lista de documentos 
				      //begin
				 	$('#list').click(function() {
							$('#view-grade').show();
							$('#gradeBlock').hide();
							$('#listBlock').show();
							$('#view-list').hide();
						});
						
						$('#grade').click(function() {
							$('#view-grade').hide();
							$('#gradeBlock').show();
							$('#listBlock').hide();
							$('#view-list').show();
						});
					//end	
					  
				      // Associa o evento do popover ao clicar no link.
				      $('#a-popover').popover({
				         trigger: 'manual',
				         html: true,
				         title: 'Pesquisa',
				         content: $('#div-popover').html() // Adiciona o conteúdo da div oculta para dentro do popover.
				      }).click(function (e) {
				         e.preventDefault();
				         // Exibe o popover.
				         $(this).popover('show');
				      });
				      
					$('body').on('click', function (e) {
						    $('[data-toggle=popover]').each(function () {
						        // hide any open popovers when the anywhere else in the body is clicked
						        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
						            $(this).popover('hide');
						        }
						    });
						});
						
						$("[data-toggle=popover]").mousedown(function(){
						  // toggle popover when link is clicked
						  $(this).popover('toggle');
						});
						
						/**$("[data-toggle=popover]").draggable({
						  stop:function(){
						    // show popover when drag stops
						    $(this).popover('show');
						  }
					});		**/	 
				  	  $('.btn-toggle').click(function() {
						    $(this).find('.btn').toggleClass('active');  					    
						    $(this).find('.btn').toggleClass('btn-default');
						});
				  	  
				  	/**
					   *js com  Ajax que controla a paginação de conteúdo e pastas
					   * 
					   * */
					  $('body').on('click', '.contentMore', function (){
						   var url = $(this).attr('value');
						   //faz a chamada ajax pro controlador 
						   $.get(url, function(data) {
						   	// substitui a lista de conteudos
						     $('#contentList').html(data);
						     return;
						   });
						 });
						 
						 $('body').on('click', '.folderMore', function (){
						   var url = $(this).attr('value');
						   //faz a chamada ajax pro controlador 
						   $.get(url, function(data) {
						   	// substitui a lista de pastas
						     $('#folderList').html(data);
						     return;
						   });
						 });
						
				   });
				  
				  
				  
