angular.module('app.services')

	/**
     * Controlador abas auxiliares
     */
    .controller('SubTabController', ['$scope', function($scope) {
		$scope.setSectionSubTab = function(value) { $scope.sectionSubTab = value; }
	    $scope.isSectionSubTabSet = function(value) { return $scope.sectionSubTab === value; }
    }])
    /**
	 * Directiva lista qualificadores (segunda versão)
	 */
	.directive('alertWrapper', function() {
		return {
			restrict: 'C',
			scope: { alert: '@' },
			replace: true,
			template: '<span class="badge alert-danger" data-ng-show="alert>0 ">{{alert}}</span>'
		}
	})
	
	/**
	 * Menu
	 */
	
	/**
	 * Menu main wrapper
	 * 
	 * Example:
	 * <div class="panel-body" data-menu-main-wrapper data-labels="a, b"></div>
	 */
	.directive('menuMainWrapper', function() {
		  return {
		    restrict: "A", 
		    transclude: true,
		    scope: { labels: '@' },
			link:function(scope, element, attrs){
				scope.labelList = attrs.labels.split(",");
				scope.shift = -1;
				if (!attrs.allowHidden) {
					scope.shift = 0;
				}
			},	
		    template: '<ul class="nav nav-pills nav-justified" >' +
		              '<li data-ng-class="{active:isSectionTab($index) }" ng-repeat="label in labelList track by $index">' +
		              '<a class="list-group-item" data-ng-click="setSectionTab($index)">{{label}}</a>' +
		              '</li>' +
		              '</ul>'
		  }
	})
	/**
	 * Menu line wrapper
	 * 
	 * Example:
	 * <li data-base-ref="x" data-menu-line-wrapper data-icon="y">Name</li>
	 */
	.directive('menuLineWrapper', function() {
		  return {
		    restrict: "A", 
		    transclude: true,
		    replace: true,
		    scope: { baseRef:'@', icon:'@' },
		    template: '<li role="presentation" >' +
		    		  '<a href="/{{baseRef}}/" >' +
		              '<i class="{{icon}}"></i>' +
		              '<span data-ng-transclude></span>' +
		              '</a></li>'
		  }
	})
	/**
	 * Menu side wrapper
	 * 
	 * Example:
	 * <div data-menu-side-wrapper>...</div>
	 */
	.directive('menuSideWrapper', function() {
		  return {
		    restrict: "A", 
		    transclude: true,
		    scope: { },
		    template: '<div class="nav-wrapper">' +
		              '<div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;">' +
		              '<ul id="nav" class="nav" data-slim-scroll data-collapse-nav data-highlight-active ng-transclude' +
		              ' style="overflow: hidden; width: auto; height: 100%;">' +
		              '</div>' +
		              '</div>'
		  }
	})
	/**
	 * Form group wrapper
	 * 
	 * Example:
	 * <div data-control-id="x" data-form-group-wrapper="y">...</div>
	 */
	.directive('formGroupWrapper', function() {
		  return {
		    restrict: "A", 
		    transclude: true,
		    scope: { formGroupWrapper:'@', controlId:'@', size:'@' },
		    template: '<div class="form-group">'+
		              '<label for="{{controlId}}" class="col-sm-3 control-label">{{formGroupWrapper}}</label>' +
		              '<div class="col-sm-{{size || \'9\'}}">' +
		              '<ng-transclude></ng-transclude>' +
		              '</div>' +
		              '</div>'
		  }
	})
	.directive('dateBtnWrapper', function() {
	    return {
		    restrict: "A",
		    replace: true,
	        template: '<span class="input-group-btn">'+
                      '<button type="button" class="btn btn-default"><i class="glyphicon glyphicon-calendar"></i></button>'+
                      '</span>'
	    }
	})
	
	/**
	 * Modal
	 */
	
	/**
	 * Modal header wrapper
	 * 
	 * Example:
	 * <div data-modal-header-wrapper>...</div>
	 */
	.directive('modalHeaderWrapper', function() {
		  return {
		    restrict: "A", 
		    transclude: true,
		    template: '<div class="modal-header">'+
		              '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
		              '<span class="h4 modal-title" id="modalLabel" >' +
		              '<ng-transclude></ng-transclude>' +
		              '</span>' +
		              '</div>'
		  }
	})
    .directive('modalFooterWrapper', function($compile) {
    	return {
			restrict: 'A',
		    replace: true,
			scope: { modalFooterWrapper: '@' },
			link:function(scope, element, attrs){
				scope.saveCaption=attrs.modalFooterWrapper;
				if(angular.isUndefined(scope.hideSave)){
				    scope.hideSave = false;
				}
				if (!attrs.modalFooterWrapper || attrs.modalFooterWrapper=='') { 
					scope.saveCaption = 'Salvar'; 
				}
				scope.closeCaption = 'Fechar'; 
				$compile(element.contents())(scope.$new());
			},
    		template: '<div class="row">' +
				'<div class="col-md-12">' +
				'<div class="pull-right">' +
				'<button type="submit" name="submit" value="0" class="btn btn-primary" data-ng-hide="hideSave">{{saveCaption}}</button>' +
				'<a data-dismiss="modal" class="btn btn-link">{{closeCaption}}</a>' +
				'</div></div></div><!-- submit row -->'
    	};
	})
	.directive('modalHeader', [function(){
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: { title: '=modalHeader' },
		templateUrl: '/assets/services/template/modal-header.html'}
	}])
	.directive('modalForm', [function(){
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: { title: '=modalHeader', submitFn: "&ngSubmit" },
		template: "<div class=\"modal-header mini-box mini-box-sm\">"+
		"<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>"+
		"<span class=\"btn-icon\">"+
		"     <img src=\"/images/folder/folder64.png\" width=\"36\">"+
		"</span>"+
		"<div class=\"box-info\">"+
		"     <h4 class=\"modal-title\" id=\"modalLabel\">{{title}}</h4></div>"+
		"</div>"
		}
	}])

	/**
	 * Panel
	 */
	
	/**
	 * Panel wrapper
	 * 
	 * Example:
	 * <div data-panel-wrapper data-label="x">...</div>
	 */
	.directive('panelWrapper', function() {
		  return {
		    restrict: "A", 
		    transclude: true,
		    scope: { label:'@' },
		    template: '<div class="panel panel-default">'+
		              '<div class="panel-heading" >{{label}}</div>' +
		              '<div class="ng-transclude" >' +
		              '</div>' +
		              '</div>'
		  }
	})
	/**
	 * Panel wrapper with panel body
	 * 
	 * Example:
	 * <div data-panel-wrapper-body data-label="x">...</div>
	 */
	.directive('panelWrapperBody', function() {
		  return {
		    restrict: "A", 
		    transclude: true,
		    scope: { label:'@' },
		    template: '<div class="panel panel-default">'+
		              '<div class="panel-heading" >{{label}}</div>' +
		              '<div class="panel-body ng-transclude" >' +
		              '</div>' +
		              '</div>'
		  }
	})

	/**
	 * Resolution wrapper
	 */
    .directive("resolutionWrapperToFix", function(){
        return {
            restrict: 'A',
            scope: { data: '=resolutionWrapper'},
            link:function(scope, element, attrs){
                element.addClass("panel panel-box left-bottom-shadow");
                var currentResolution = scope.data.resolution;
                if (currentResolution=='P') { element.addClass("bg-yellow") }
                if (currentResolution=='T') { element.addClass("bg-cyan") }
                if (currentResolution=='D') { element.addClass("bg-green") }
                if (currentResolution=='X') { element.addClass("bg-magenta") }
            }
        };
    })
    .directive("resolutionWrapper", function(){
        return {
            restrict: 'A',
            controller:function($scope, $element, $attrs){
                this.resolutionClasses={
                     'I':'bg-gray'
                    ,'P':'bg-yellow'
                    ,'T':'bg-cyan'
                    ,'D':'bg-green'
                    ,'R':'bg-orange'
                    ,'X':'bg-magenta'};
                this.knowledgeClasses={
                     '_0':'bg-gray'
                    ,'_1':'bg-yellow'
                    ,'_2':'bg-cyan'
                    ,'_3':'bg-green'
                    ,'_4':'bg-blue'};
                this.resolutionIcons={
                     'I':'fa fa-question-circle    fa-fw'
                    ,'P':'fa fa-exclamation-circle fa-fw'
                    ,'T':'fa fa-clock-o            fa-fw'
                    ,'D':'fa fa-check-circle-o     fa-fw'
                    ,'R':'fa fa-repeat             fa-fw'
                    ,'X':'fa fa-times-circle-o     fa-fw'};
            }
        };
    })

    .directive("inputMaskNumber", [function(){
        return  {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                elem.inputmask(attrs.inputMaskNumber, { alias: "decimal" });
                elem.on('keyup', function () {
                    scope.$apply(function(){
                        ctrl.$setViewValue(elem.val());
                    });
                });
            }
        };

    }])

	/**
	 * Dates
	 */
	.directive("dateWrapper", function(){
	    return {
            restrict: 'A',
            scope: { dateWrapper: '=', dateType: '=', dateAlert: "=" },
            link:function(scope, element, attrs){
                scope.sameYear = moment().isSame(scope.dateWrapper, 'year');
                scope.dateTypeIcon = "fa fa-arrow-circle-o-down";
                if (scope.dateType=="nextCheck") {scope.dateTypeIcon = "fa fa-arrow-circle-o-right"; }
                if (scope.dateType=="closed")    {scope.dateTypeIcon = "fa fa-arrow-circle-o-up"; }
                if (scope.dateAlert)             {scope.dateTypeIcon = "fa fa-exclamation-triangle text-danger"; }
            },
            templateUrl: '/assets/services/template/date-wrapper.html'
	    };
	})
    .directive("dateLateBadge", ["$http", function($http){
	    return {
            restrict: 'A',
            scope: { dateLateBadge: '='},
            link:function(scope, element, attrs){
                scope.$watch('dateLateBadge', function(dateEvent) {
                    if (angular.isDefined(dateEvent)
                        && angular.isDefined(dateEvent.resolution)
                        && (dateEvent.resolution == 'P' || dateEvent.resolution == 'T')
                        && angular.isDefined(dateEvent.nextCheckDate)) {
                        scope.isLate = moment(dateEvent.nextCheckDate).isBefore(moment());
                    }
                    else {scope.isLate = false;}
                });
            },
            templateUrl: '/assets/services/template/date-late-badge.html'
	    };
	}])
    .directive("userItem", ["$http", "$log", function($http, $log){
        return {
            restrict: 'A',
            scope: { userItem: '=' },
            link: function(scope, element, attrs) {
                if (scope.userItem && scope.userItem.userId) {
                    $http.get('/app/user/stats/'+scope.userItem.userId)
                        .then(function(response) { scope.late = response.data; })
                        .catch(function(e) { $log.error("FAILED"+e); });
                }
            },
            templateUrl: '/assets/user/template/user-item.html'
        };
    }])

.directive("reviewType",[function(){
	return{
		restrict:"A",
        scope: { reviewType: '=' },
        templateUrl: '/assets/services/template/review-type.html'
    };
}])

.directive("toggleOffCanvas",[function(){
	return{
		restrict:"A"
		,link:function(scope,ele){return ele.on("click",function(){return $("#app").toggleClass("on-canvas")})}}}
])

.directive("uiTime",[function(){
	return{
		restrict:"A"
		,link:function(scope,ele){
			var checkTime,startTime;
			return startTime=function(){var h,m,s,t,time,today;return today=new Date,h=today.getHours(),m=today.getMinutes(),s=today.getSeconds(),m=checkTime(m),s=checkTime(s),time=h+":"+m+":"+s,ele.html(time),t=setTimeout(startTime,500)}
			,checkTime=function(i){return 10>i&&(i="0"+i),i},startTime()}}}
])
.directive("uiNotCloseOnClick"
		,[function(){
			return{
				restrict:"A"
				,compile:function(ele){return ele.on("click",function(event){return event.stopPropagation()})}}}
		]
)
.directive("slimScroll"
		,[function(){
			return{
				restrict:"A"
				,link:function(scope,ele,attrs){return ele.slimScroll({height:attrs.scrollHeight||"100%"})}}}
		]
)
;


/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.3
 *
 */
(function(e){e.fn.extend({slimScroll:function(g){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},g);this.each(function(){function u(d){if(r){d=d||window.event;
var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,e,g){k=!1;var f=d,h=b.outerHeight()-c.outerHeight();e&&(f=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),f=Math.min(Math.max(f,0),h),f=0<d?Math.ceil(f):Math.floor(f),c.css({top:f+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
f=l*(b[0].scrollHeight-b.outerHeight());g&&(f=d,d=f/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),h),c.css({top:d+"px"}));b.scrollTop(f);b.trigger("slimscrolling",~~f);v();p()}function C(){window.addEventListener?(this.addEventListener("DOMMouseScroll",u,!1),this.addEventListener("mousewheel",u,!1)):document.attachEvent("onmousewheel",u)}function w(){s=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:s+"px"});var a=s==b.outerHeight()?"none":"block";c.css({display:a})}
function v(){w();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;s>=b.outerHeight()?k=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&h.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&r||x||y||(c.fadeOut("slow"),h.fadeOut("slow"))},1E3))}var r,x,y,A,z,s,l,B,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),c=b.parent().find("."+a.barClass),h=b.parent().find("."+a.railClass);
w();if(e.isPlainObject(g)){if("height"in g&&"auto"==g.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",q);b.css("height",q)}if("scrollTo"in g)n=parseInt(a.scrollTo);else if("scrollBy"in g)n+=parseInt(a.scrollBy);else if("destroy"in g){c.remove();h.remove();b.unwrap();return}m(n,!1,!0)}}else if(!(e.isPlainObject(g)&&"destroy"in g)){a.height="auto"==a.height?b.parent().height():a.height;n=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",
overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var h=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?
"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?{right:a.distance}:{left:a.distance};h.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(h);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);y=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});
b.bind("mouseup.slimscroll",function(a){y=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});h.hover(function(){v()},function(){p()});c.hover(function(){x=!0},function(){x=!1});b.hover(function(){r=!0;v();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(z=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&
(m((z-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),z=b.originalEvent.touches[0].pageY)});w();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),m(0,!0)):"top"!==a.start&&(m(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());C()}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);
;

