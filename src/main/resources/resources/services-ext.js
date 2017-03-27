// service extension point
// uncomment the following line and add services, etc.
angular.module('app.services')
.factory("extServices", function() {  
	return {
		/**
		 * Make responsive.
		 */
		makeResponsive: function(elem) {
			var target = angular.element(elem);
			angular.forEach(target.find("img"), function(i) {
				var imageElem = angular.element(i);
				if (!imageElem.hasClass("img-responsive")) {
					i = imageElem.addClass("img-responsive");
				}
			});
			var html = "";
			angular.forEach(target, function(e) {
				html += e.outerHTML;
			});
			return html;
		}
		
	};
})

