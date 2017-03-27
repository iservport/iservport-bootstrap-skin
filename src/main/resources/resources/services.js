angular.module('app.services', ['ui.select', 'ngResource', 'chart.js'])
    .value('lang', {})
//	.config(function (datepickerConfig, datepickerPopupConfig) {
//	    datepickerConfig.showWeeks = false;
//	    // datepickerPopupConfig.toggleWeeksText = null;
//	    datepickerPopupConfig.showButtonBar = false;
//
//	})
	//redireciona para o login se encontrar erro ou rejection
	.config(function ($provide, $httpProvider) {
    	$provide.factory('myHttpInterceptor', function($q, $window) {
    		  return {
    		    // optional method
    		    'request': function(config) {
    		      // do something on success
    		      return config;
    		    },

    		    // optional method
    		   'requestError': function(rejection) {

    		      // do something on error
    		      return $q.reject(rejection);
    		    },

    		    // optional method
    		    'response': function (response) {
                    if (typeof response.data === 'string' && response.data.indexOf('login-redirect-token')> -1) {
                        $window.location.href = "/login";
                    }
    		      return response;
    		    },

    		    // optional method
    		   'responseError': function(rejection) {
    		      // do something on error
    			   if(rejection.status==403 || rejection.status==401 ){
    				   $window.location.href = "/login";
    			   }

    			    if(rejection.status==302 ){
                       console.log(rejection)
                       if(rejection.Location.indexOf('/login')>-1){
                         $window.location.href = "/login";
                       }
                     }
    		      return $q.reject(rejection);
    		    }
    		  };
    		});

    		$httpProvider.interceptors.push('myHttpInterceptor');

    })

	//filters
	//================================================= 
	/**
	 * Common language filter.
	 */
	.filter('common', ['common', function (common) {
		return function (key, p) {
			if (typeof common[key] != 'undefined' && common[key] != '') {
				return (typeof p === "undefined") ? common[key] : common[key].replace('@{}@', p);
			}
			return key;
		}
	}])
	/**
	 * Language filter.
	 */
	.filter('i18n', ['lang', function (lang) {
		return function (key, p) {
			if (typeof lang[key] != 'undefined' && lang[key] != '') {
				return (typeof p === "undefined") ? lang[key] : lang[key].replace('@{}@', p);
			}
			return key;
		}
	}])
	.filter('pad', function() {
		return function(num) {
			return (num < 10 ? '0' + num : num); // coloca o zero na frente
		};
	})
	.filter('trustAsHtml', function($sce) {
	  return function(html) {
	    return $sce.trustAsHtml(html);
	  };
	})
	.filter('range', function() {
      return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++) {
          input.push(i);
        }
        return input;
      };
    })
    .filter('ageFilter', function() {
         function calculateAge(birthday) { // birthday is millis
             var ageDifMs = Date.now() - birthday;
             var ageDate = new Date(ageDifMs); // miliseconds from epoch
             return Math.abs(ageDate.getUTCFullYear() - 1970);
         }

         return function(birthdate) {
               return calculateAge(birthdate);
         };
    })
     .filter('RGFilter', function() {
         function Rg(v){
            if(angular.isDefined(v)){
              v=v.replace(/\D/g,"");
             if(v.length == 9) v=v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/,"$1.$2.$3-$4");
            }
            return v;
         }

         return function(rg) {
               return Rg(rg);
         };
    })

.factory("pluginServices", function() {
	   var services = {};
	   services.objectLength =  function(obj){
            if(angular.isUndefined(obj)){
                return 0;
            }else{
                return Object.keys(obj).length;
            }
         }
         services.indexIsDefined = function(obj, val){
            var equals = false;
            angular.forEach(obj, function(value, key) {
                if((typeof key === 'string'? parseInt(key):key)===(typeof val === 'string'? parseInt(val):val)){
                  equals = true ;
                }
            });
            return equals;
        }
        services.objectMax =  function(obj){
           var max = 0;
           if(angular.isDefined(obj)){
                var arrayOfKeys = [0];
                angular.forEach(obj, function(value, key) {
                   arrayOfKeys.push((typeof key === 'string'? parseInt(key):key));
                });
                max = Math.max.apply(null,arrayOfKeys);
            }
            return max;
        };
        services.objectMin =  function(obj){
            var min = services.objectMax(obj);
               if(angular.isDefined(obj)){
                    var arrayOfKeys = [];
                    angular.forEach(obj, function(value, key) {
                       arrayOfKeys.push((typeof key === 'string'? parseInt(key):key));
                    });
                    min = Math.min.apply(null,arrayOfKeys);
                }
                return min;
        };
        services.addAnswer =  function(answer){
            if(angular.isDefined(answer)){
                var id = services.objectMax(answer);
                while(services.indexIsDefined(answer, id)){
                 id  = id + 1;
                }
                answer[id] = {val:""};
            }
        };
        services.removeAnswer =  function(answer, index){
            if(angular.isDefined(answer) && angular.isDefined(answer[index])){
                delete answer[index];
            }
        };
        services.getNextIndex = function(answer, index){
               var next =  index +1;
               while(!services.indexIsDefined(answer, next)){
                    next = next + 1;
               }
               var backup = answer[index];
               answer[index] = answer[next];
               answer[next] = backup;
        };
        services.getPreviousIndex = function(answer, index){
            var prev =  index -1;
            while(!services.indexIsDefined(answer, prev)){
                    prev = prev - 1;
            }
           var backup = answer[index];
           answer[index] = answer[prev];
           answer[prev] = backup;

        };
         services.downAnswer = function(answer, index){
            if(!(services.objectMax(answer)===index)){
                services.getNextIndex(answer, index);
            }
         };
         services.upAnswer= function(answer, index){
          if(!(services.objectMin(answer)===index)){
                services.getPreviousIndex(answer, index);
          }
         };

	   return services;
}).factory("genericServices", function() {
	return {
		getNextAndPreviousLinkByList: function(list) {   
			var page = {next:0, previous:0, hasNext:false, hasPrevious:false};
			
			if(list.number!=0){
				page.previous = list.number-1;
				page.hasPrevious = true;
			}
			if(list.number+1<list.totalPages){				
				page.next = list.number+1;
				if(list.numberOfElements==list.size && list.totalElements > list.size ){
					page.hasNext = true;	
				}				
			}
			return page;
		},
		/**
		 * Transforma um Form num object pronto para ser Transformado em Json
		 * @param form
		 */
		serializeObject : function(form)
		{ //from : http://jsfiddle.net/sxGtM/3/
			var json = {};
			var formData = form.serializeArray();
			$.each(formData, function() {
				if (json[this.name] !== undefined) {
					if (!json[this.name].push) {
						json[this.name] = [json[this.name]];
					}
					json[this.name].push(this.value || '');
				} else {
					json[this.name] = this.value || '';
				}
			});
			return json;
		},
		verifyPassword: function(pass, cpass){
			if(pass==null || pass=='undefined' || cpass==null || cpass=='undefined'){
				return false;
			}
			return pass === cpass;
		}
	}
})
.directive("slimScroll",[function(){
	return{
		restrict:"A"
		,link:function(scope,ele,attrs) {
			return ele.slimScroll({height:attrs.scrollHeight||"100%"})
		}
	}
}])
/**
 * Directiva lista qualificadores 
 */
//TODO colocar atributos variáveis para a lista ex: img,class icons ,etc..
.directive('listQualifier', [ '$http', function($http) {
	return {
		restrict: 'E',				  	    
		scope: {
			ngClickFn: '& onclick'
		},				    
		link:function(scope, element, attrs){
			$http.get(attrs.href)
			.then(function(data, status, headers, config) {
				scope.qualifiers = data;
				
				scope.$parent.categoryId = data[0].id;
				scope.$parent.qualifierValue = data[0].id;
			});		
			scope.setCategoryId=scope.$parent.setCategoryId;
			scope.$parent.$watch('categoryId', function() {
				scope.categoryId = scope.$parent.categoryId;
				scope.qualifierValue = scope.$parent.categoryId;
			}); 
			if (!attrs.countlabel) { 
				attrs.countlabel = 'Item(s)'; 
			}			
			scope.countLabel=attrs.countlabel;
		},	
		templateUrl: '/assets/_template/list-qualifier.html'
	};
}])
.directive('iservportMain', function(){
		return {
			restrict: 'EA',			
			template :'<div ng-include="iservportMainPath"></div>',
			controller: function($scope) {
				$scope.iservportMainPath = "/assets/"+$scope.baseName+"/selection-main.html";
			}

		}

})
.directive('iservportFilter', function(){
		return {
			restrict: 'EA',			
			template :'<div ng-include="iservportFilterPath"></div>',
			controller: function($scope) {
				$scope.iservportFilterPath = "/assets/"+$scope.baseName+"/selection-filter.html";
			}

		}

})
.directive('iservportProperties', function(){
		return {
			restrict: 'EA',			
			template :'<div ng-include="iservportPropertiesPath"></div>',
			controller: function($scope) {				
				$scope.iservportPropertiesPath = "/assets/"+$scope.baseName+"/selection-properties.html";
			}
		}

})
.directive('iservportInfo', function(){
	return {
		restrict: 'EA',			
		template :'<div ng-include="iservportInfoPath"></div>',
		controller: function($scope) {				
			$scope.iservportInfoPath = "/assets/"+$scope.baseName+"/info.html";
		}
	}

})

	/**
	 * Serviço para compartilhar dados da autorização.
	 */
	.service('authorizedData', function($http) {
		var authorizedEntity = {};
		var authorizedUser = {};
	    return {
	        getAuthorizedEntity: function () {
	            return authorizedEntity;
	        },
	        setAuthorizedEntity: function (data) {
	        	authorizedEntity = data;
	        },
	        getAuthorizedUser: function () {
	            return authorizedUser;
	        },
	        setAuthorizedUser: function (data) {
	        	authorizedUser = data;
	        }
	    }
	})
	/**
	 * Diretiva para recuperar entidade autorizada.
	 * @deprecated
	 */
	.directive('authorizedEntity', [ '$http', 'authorizedData', '$log', function($http, authorizedData, $log) {
	return {
		restrict: 'A',			
		link:function(scope, element, attrs) {
			$http.get(attrs.href)
			.then(function(response) {
				scope.authorizedEntity = response.data;
				authorizedData.setAuthorizedEntity(response.data);
			})
            .catch(function(e) { $log.error("FAILED"+e); });
		},
		template :
		'<div id="authorizedEntity">{{authorizedEntity.entityAlias.length>0?authorizedEntity.entityAlias:"..."}}' +
        '&nbsp;<i class="fa fa-share-alt"></i></div>'
	}}])
	/**
	 * Diretiva para recuperar usuário autorizado.
	 * 
	 * Default : userKey 
	 * 
	 */
	.directive('authorizedUser', [ '$http', 'authorizedData', '$log', function($http, authorizedData, $log) {
	return {
		restrict: 'EA',
		link:function(scope, element, attrs) {
			$http.get('/api/entity/user')
			.then(function(response, status, headers, config) {
				authorizedData.setAuthorizedUser(response.data);
				scope.userLabel = response.data.userKey;
				if(typeof attrs.typeName != 'undefined' && attrs.typeName.indexOf('name')>-1 ){
					scope.userLabel = response.data.userName;
				}else if(typeof attrs.typeName != 'undefined' && attrs.typeName.indexOf('display')>-1){
					scope.userLabel = response.data.displayName;
				}
			})
            .catch(function(e) { $log.error("FAILED"+e); });
		},
		template :
		'<div id="authorizedUser">{{userLabel}}' +
        '&nbsp;<i class="fa fa-caret-down"></i></div>'
	}}])
	/**
	 * Directiva para tratar erro de imagens.
	 * from: http://plnkr.co/edit/KGvqfvKA5n979mu6BJT2?p=preview
	 * Usage:<img src="URL" err-src="URL_DEFAULT">
	 * 
	 */
	.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if (attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});

			attrs.$observe('ngSrc', function(value) {
				if (!value && attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}})
	.directive("toggleNavCollapsedMin", ["$rootScope", function($rootScope) {
    return {
            restrict: "A",
            link: function(scope, ele) {
                var app;
                return app = $("#app"), ele.on("click", function(e) {
                    if(app.hasClass("nav-collapsed-min")){
                        app.addClass("nav-collapsed-min-hide")
                    }else{
                        app.removeClass("nav-collapsed-min-hide")
                    }
                    return app.hasClass("nav-collapsed-min") ? app.removeClass("nav-collapsed-min") : (app.addClass("nav-collapsed-min"), $rootScope.$broadcast("nav:reset")), e.preventDefault()
                })
            }
        }
    }])
	.directive("collapseNav", [function() {
    return {
            restrict: "A",
            link: function(scope, ele) {
                var $a, $aRest, $app, $lists, $listsRest, $nav, $window, Timer, prevWidth, updateClass;
                return $window = $(window), $lists = ele.find("ul").parent("li"), $lists.append('<i class="ti-angle-down icon-has-ul-h"></i><i class="ti-angle-double-right icon-has-ul"></i>'), $a = $lists.children("a"), $listsRest = ele.children("li").not($lists), $aRest = $listsRest.children("a"), $app = $("#app"), $nav = $("#nav-container"), $a.on("click", function(event) {
                    var $parent, $this;
                    return $app.hasClass("nav-collapsed-min") || $nav.hasClass("nav-horizontal") && $window.width() >= 768 ? !1 : ($this = $(this), $parent = $this.parent("li"), $lists.not($parent).removeClass("open").find("ul").slideUp(), $parent.toggleClass("open").find("ul").stop().slideToggle(), event.preventDefault())
                }), $aRest.on("click", function() {
                    return $lists.removeClass("open").find("ul").slideUp()
                }), scope.$on("nav:reset", function() {
                    return $lists.removeClass("open").find("ul").slideUp()
                }), Timer = void 0, prevWidth = $window.width(), updateClass = function() {
                    var currentWidth;
                    return currentWidth = $window.width(), 768 > currentWidth && $app.removeClass("nav-collapsed-min"), 768 > prevWidth && currentWidth >= 768 && $nav.hasClass("nav-horizontal") && $lists.removeClass("open").find("ul").slideUp(), prevWidth = currentWidth
                }, $window.resize(function() {
                    var t;
                    return clearTimeout(t), t = setTimeout(updateClass, 300)
                })
            }
        }
    }])
	/**
	 * Directiva lista qualificadores (segunda versão)
	 */
	.directive('qualifierPanel', function($compile) {
		return {
			restrict: 'A',
			terminal: true,
			scope: { qualifiers: '=qualifierPanel', setQualifier: '&', isQualifierActive: '&' },
			link:function(scope, element, attrs){
				element.addClass("panel panel-default");
				scope.countLabel=attrs.countlabel;
				if (!attrs.countlabel) { 
					scope.countLabel = 'Item(s)'; 
				}
				$compile(element.contents())(scope.$new());
			},
			template:
				'<ul class="list-group">' +
				'<a href="" class="list-group-item" data-ng-repeat="qualifierItem in qualifiers" ' + 
				'   data-ng-click="setQualifier({value: qualifierItem.qualifierValue})" >' +
				'<div data-ng-class="{h4: isQualifierActive({value: qualifierItem.qualifierValue}) }">' +
				'<i class="{{qualifierItem.fontIcon}}" data-ng-if="qualifierItem.fontIcon.length>0"></i>' +
				'{{qualifierItem.qualifierName | i18n}}' +
			    '</div>' +
			    '<span style="font-size: 70%; color: #aaa;">{{qualifierItem.countItems}} {{countLabel}}</span>' +
			    '</a></ul>'
		};
	})
	/**
	 * Directiva lista qualificadores (segunda versão)
	 */
	.directive('qualifierBox', function($compile) {
		return {
			restrict: 'A',
			terminal: true,
			scope: { qualifiers: '=qualifierBox', setQualifier: '&', isQualifierActive: '&', qualifierIcon: "@", qualifierValue: '@' },
			link:function(scope, element, attrs){
				scope.icon=attrs.qualifierIcon;
				scope.qualifierValue=attrs.qualifierValue;
				if (!attrs.qualifierIcon) { 
					scope.icon = 'glyphicon glyphicon-cog'; 
				}
				$compile(element.contents())(scope.$new());
			},
			templateUrl: '/assets/services/template/qualifier-box.html'
		};
	})
	/**
	 * Directiva lista qualificadores (segunda versão)
	 */
	.directive('qualifierNav', function($compile) {
		return {
			restrict: 'A',
			terminal: true,
			scope: { qualifiers: '=qualifierNav', setQualifier: '&', isQualifierActive: '&' },
			link:function(scope, element, attrs){
				element.addClass("panel panel-default");
				scope.countLabel=attrs.countlabel;
				if (!attrs.countlabel) { 
					scope.countLabel = 'Item(s)'; 
				}
				$compile(element.contents())(scope.$new());
			},
			template:
				'<ul class="list-group">' +
				'<a href="" class="list-group-item" data-ng-repeat="qualifierItem in qualifiers" ' + 
				'   data-ng-click="setQualifier({value: qualifierItem.qualifierValue})" >' +
				'<div data-ng-class="{h4: isQualifierActive({value: qualifierItem.qualifierValue}) }">' +
				'<i class="{{qualifierItem.fontIcon}}" data-ng-if="qualifierItem.fontIcon.length>0"></i>' +
				'{{qualifierItem.qualifierName}}' +
			    '</div>' +
			    '<span style="font-size: 70%; color: #aaa;">{{qualifierItem.countItems}} {{countLabel}}</span>' +
			    '</a></ul>'
		};
	})
	.directive("userDeletableItem", function(){
         return {
             restrict: 'A',
             scope: { userDeletableItem: '=', deleteFn : '&' , index:'='},
              templateUrl: '/assets/services/template/user-delete.html'
          };
     })
     .directive("identityDeletableItem", function(){
              return {
                  restrict: 'A',
                  scope: { identityDeletableItem: '=', deleteFn : '&' , index:'='},
                   templateUrl: '/assets/services/template/identity-delete.html'
               };
      })
     .directive("entityDetailsCall", ["$http", function($http){
         return {
             restrict: 'A',
             scope: { entityDetailsCall: '@' , deleteFn : '&' , index:'='},
             link: function(scope, element, attrs) {
                 $http.get('/api/entity?entityId='+attrs.entityDetailsCall+'')
                     .then(function(response) { scope.entity = response.data; })
             },
             templateUrl: '/assets/services/template/entity-details-call.html'
         };
     }]).directive("requestItem", function(){
     	    return {
                 restrict: 'A',
                 require: '^resolutionWrapper',
                 scope: { 'requestItem': '=' },
                 transclude: true,
                 link: function(scope, element, attr, ctrl) {
                     element.addClass("panel panel-box left-bottom-shadow");
                     scope.resolutionClasses = ctrl.resolutionClasses;
                     scope.resolutionIcons = ctrl.resolutionIcons;
                 },
                 templateUrl: '/assets/services/template/request-item.html'
     	    };
     	})
        .directive("contentKnowledgeItem", function(){
            return {
              restrict: 'A',
              require: '^resolutionWrapper',
              scope: { 'contentKnowledgeItem': '=' , 'docName' : '='},
              transclude: true,
              link: function(scope, element, attr, ctrl) {
                  element.addClass("panel panel-box left-bottom-shadow");
                  scope.resolutionClasses = ctrl.resolutionClasses;
                  scope.knowledgeClasses = ctrl.knowledgeClasses;
                  scope.resolutionIcons = ctrl.resolutionIcons;
                  scope.late = false;
                  if (scope.contentKnowledgeItem.resolution=='P' || scope.contentKnowledgeItem.resolution=='T') {
                    if ((new Date()) > scope.contentKnowledgeItem.nextCheckDate) {
                        scope.late = true;
                    }
                  }
              },
              templateUrl: '/assets/content/template/content-knowledge-item.html'
            };
        })
        .directive("statsTotalsMenu", ["$http", "$log", function($http, $log){
                return {
                    restrict: 'A',
                    scope: { statsTotalsMenu: '=',  statsBg: '=', menuIcon: '=', menuLabel:'@' },
                    link: function(scope, element, attrs) {
                        $http.get('/app/home/stats/'+attrs.statsTotalsMenu+'/all')
                            .then(function(response) { scope.stats = response.data; })
                            .catch(function(e) { $log.error("FAILED"+e); })
                        $http.get('/app/home/stats/'+attrs.statsTotalsMenu+'/late')
                            .then(function(response) {
                                scope.late = response.data;
                                scope.lateCount = response.data.lenght;
                            })
                            .catch(function(e) { $log.error("FAILED"+e); })
                    },
                    template: '<i data-ng-class="menuIcon" class="menuIcon"></i>'
                               +' <span class="badge" data-ng-if="late.itemCount>0"'
                                      +'data-ng-class="{\'badge-danger\' : late.itemCount>0, \'badge-warning\':(late.itemCount==0 && stats.total>0 )}">'
                                     +'{{late.itemCount>0?late.itemCount:\'\'}}'
                               +' </span>'
                             +'<span>{{menuLabel}}</span>'
                };
            }])
        .directive("resolutionFilter", function(){
                return {
                    restrict: 'A',
                    require: '^resolutionWrapper',
                    transclude: true,
                    scope: { resolutionFilter: '=' },
                     link: function(scope, element, attr, ctrl) {
                        scope.resolutionClasses = ctrl.resolutionClasses;
                        scope.resolutionIcons = ctrl.resolutionIcons;
                    },
                    templateUrl: '/assets/services/template/resolution-filter-item.html'
                };
            })
     .directive("resolutionSearchFilter", function(){
                    return {
                        restrict: 'A',
                        transclude: true,
                        scope: { resolutionSearchFilter: '=' , array : '=', selected : '='
                         ,  search :'=', searchFn : '&', listFn:'&', cleanSearch:'='},
                        templateUrl: '/assets/services/template/search-resolution-filter-item.html'
                    };
                })
    .directive("questionRadioArray", function(){
            return {
                restrict: 'A',
                transclude: true,
                scope: { questionRadioArray: '=' , readOnly : '=', fieldName : '=', parsedContent:'='},
                templateUrl: '/assets/services/template/question-radio-array.html'
            };
        })
	/**
	 * Qualifier service.
	 */
	.factory('qualifierService', function() {
		var qualifierService = {};
		var value = 0;
		var qualifier = {};
		var qualifiers = [];
		var name = "";
		
		/**
		 * Run function
		 */
		qualifierService.run = function(resource, callBack, externalId) {
			var list = resource.query({method:'qualifier'});
			list.$promise.then(function(data) {
			    qualifiers = data;
				if (value === 0 && data.length>0 && externalId==0) {
					value = data[0].qualifierValue;
					name = data[0].qualifierName;
				}
				callBack(value, data, name);
			})
		};

		/**
		 * Run 2 function
		 */
		qualifierService.run2 = function(resource, callBack, externalId) {
			resource.query({method:'qualifier'}).$promise.then(function(data) {
				if (!angular.isDefined(qualifier.qualifierValue) && data.length>0 && externalId==0) {
					qualifier = data[0];
					value = qualifier.qualifierValue;
				}
				callBack(qualifier, data);
			})
		};

		/**
		 * Is active function
		 */
		qualifierService.isActive = function(qualifierValue) {
			return value==qualifierValue;
		}

		qualifierService.qualifiers = qualifiers;

        /**
        *   Retorna o objeto alocado na posição do array(arr)
        *   onde a propriedade(prop) corresponde ao valor passado(val)
        */
	    qualifierService.getValueByIndexOf =  function(arr, prop, val) {
             var l = arr.length;
               k = 0;
             for (k = 0; k < l; k = k + 1) {
               if (arr[k][prop] === val) {
                 return arr[k];
               }
             }
             return null;
        };

	    return qualifierService;
	})
	/**
	 * Utils.
	 */
	.factory('utilService', function() {
	    var utilService = {};
	    utilService.uuid = function() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        };
	    return utilService;
	})
	/**
	 * View controller
	 */
	.controller('ViewController', ['$rootScope', '$scope', '$http', '$resource', 'authorizedData', 'lang', 'pluginServices'
	                               , function($rootScope, $scope, $http, $resource, authorizedData, lang, pluginServices) {

	    $rootScope.currentDate = new Date();

		$rootScope.pluginServices = pluginServices;

		$rootScope.notifications = ['PRINCIPAL','EMAIL','BY_REQUEST'];


        /**
        * Define if ViewController run over Signed page (Avoid signIn mandatory calls).
        *
        * default = true; if not signed use : 'var signed = false ;'  see '/security/login.html'.
        **/
        $scope.signed =(typeof signed === 'undefined' || signed===null)?true:signed;

		$rootScope.logout = function() {
			return $http.post('/logout');
	    }
		
		/**
		 * Tabs
		 */
		$rootScope.sectionTab = 0;

	    $rootScope.getSectionTab = function() {
	        return $rootScope.sectionTab;
	    }

		$rootScope.setSectionTab = function(value) {
			$rootScope.sectionTab = value;
	    }

	    $rootScope.isSectionTabSet = function(value,role) {
	        if (angular.isDefined(role) && $rootScope.isAuthorized(role)) {
	            return $rootScope.sectionTab === value;
	        }
	        return $rootScope.sectionTab === value;
	    }

        /**
         * Read requests.
         */
        if($scope.signed){$http.get('/app/request').then(function(response) {$rootScope.requestAllList = response.data})};


        /**
        * Read count alerts.
        */
        if($scope.signed){$http.get('/app/request?qualifier=0&today=false').then(function(response) {$rootScope.countWarning = response.data.count})};
        if($scope.signed){$http.get('/app/request?qualifier=0&today=true').then(function(response) {$rootScope.countAlert = response.data.count})};



	    $rootScope.openRequestList = function() {
	        $rootScope.openForm('/assets/request/list-request.html');
	    }
	    
		/**
		 * Bottom tabs
		 */
		$rootScope.bottomSectionTab = 0;
		$rootScope.setBottomSectionTab = function(value) {
			$rootScope.bottomSectionTab = value;
	    };
	    $rootScope.isBottomSectionTabSet = function(value) {
	        return $rootScope.bottomSectionTab === value;
	    };

	    $rootScope.identityResource = $resource('/app/identity/' , null
				, {	save: { method: 'PUT' }, create: { method: 'POST' }});
	    $rootScope.userAuthResource = $resource("/api/entity/auth", {userId: "@userId"}, {});
	    
	    /**
		 * Location Resource.
		 */
	    $rootScope.locationResource = $resource("/api/location/:path", { stateId : "@stateId"}, {
			save: { method: 'PUT' }
			, create: { method: 'POST' }
		});
	    
	    $rootScope.roleList = [];
	    
	    $scope.identityTypes = [{enum:"NOT_ADDRESSABLE"}, {enum:"ORGANIZATIONAL_EMAIL"}, {enum:"PERSONAL_EMAIL"} ];

	    $rootScope.genders = ["NOT_SUPPLIED", "MALE", "FEMALE" ];

        /**
         * Read the authorized user.
         */
        if($scope.signed){$http.get('/api/entity/user').then(function(response) {$rootScope.authorizedUser = response.data})};

	    /**
	     * Profile
	     */
	    $rootScope.updatePassword = function() {
	 		$rootScope.identityResource.get({identityId:authorizedData.getAuthorizedUser().identityId}).
			$promise.then(
			function(data) {
				$rootScope.identity = data;
				$rootScope.openForm("/assets/user/form/profile.html");
			});
		};

		/**
		 * Profile
		 * 
		 * PUT /app/identity/
		 */
		$scope.updateProfile = function(){
			$rootScope.identityResource.save({}, $rootScope.identity).$promise.then(
			function(data) {
				$rootScope.identity = data;
			});
			$("#modalBody").modal('hide');	
		};

		$scope.getPersonalProfile = function(id){
            $scope.identityResource.get({identityId:id}).
                $promise.then(
                function(data) {
                    $rootScope.identity = data;
                    $rootScope.openForm("/assets/user/form/profile.html");
                });
        }
		
	    /**
		 * Authorization
		 */
	    $rootScope.getAuthorizedRoles = function(userIdVal) {
	    	if($scope.signed){
                $rootScope.userAuthResource.query({userId:userIdVal}).$promise.then(function(data) {
                    $rootScope.roleList = data;
                    $rootScope.isAdmin=$rootScope.isAuthorized('ADMIN', 'MANAGER');
                });
			};
		}
	    
	    
	    $rootScope.getAuthorizedRoles();
	    
		$rootScope.isAuthorized = function(role, ext){
			var result = false;
			if (!angular.isDefined(ext)) {
			    var ra = role.split('_');
			    if (ra.length>1) {
			        role = ra[0];
			        ext = ra[1];
			    }
			    else {
			        ext = 'READ';
			    }
			}
			if (angular.isDefined($rootScope.roleList)) {
				$rootScope.roleList.forEach(function(entry) {
					if(entry.serviceCode == (role) && entry.serviceExtension.indexOf(ext)>-1){
						result = true;
					}
				});
			}
			return result;
		};
		
		/**
		 * Get states.
		 */
		$rootScope.getStates = function(){
			$rootScope.locationResource.query({path: 'state'}).$promise.then(function(data){
				$rootScope.states = data;
				if(data.length>0){
					$rootScope.stateId = data[0].id;
					$rootScope.getCities($rootScope.stateId);
				}
			})
		};
		
		/**
		 * Get cities.
		 */
		$rootScope.getCities = function(val){
			$rootScope.locationResource.query({path: 'city', stateId:val}).$promise.then(function(data){
				$rootScope.cities = data;
			})
		};
		
		$rootScope.getStates();
		
		$rootScope.openForm = function(url){
			$rootScope.message =[];
			$rootScope.formUrl = url;
			$("#modalBody").modal('show');
		}
		
		$rootScope.getFormUrl = function() {
			return $rootScope.formUrl;
		}

		//DEFINIÇÔES PARA PLUGINS

        $scope.getQuestionTab = function() { return $scope.questionTab; }

        $scope.setQuestionTab = function(value) { $scope.questionTab = value; }

        $scope.isQuestionTabSet = function(value) { return $scope.questionTab === value; }

        $scope.getResponseTab = function() { return $scope.responseTab; }

        $scope.setResponseTab = function(value) { $scope.responseTab = value; }

        $scope.isResponseTabSet = function(value) { return $scope.responseTab === value; }

        $scope.getTopicTab = function() { return $scope.topicTab; }

        $scope.setTopicTab = function(value) { $scope.topicTab = value; }

        $scope.isTopicTabSet = function(value) { return $scope.topicTab === value; }

        $scope.setTopicTab1 = function(value) { $scope.topicTab1 = value; }

        $scope.isTopicTabSet1 = function(value) { return $scope.topicTab1 === value; }

        $scope.setTopicTab2 = function(value) { $scope.topicTab2 = value; }

        $scope.isTopicTabSet2 = function(value) { return $scope.topicTab2 === value; }

        $scope.setTopicTab3 = function(value) { $scope.topicTab3 = value; }

        $scope.isTopicTabSet3 = function(value) { return $scope.topicTab3 === value; }

        $scope.setCurrentCriterion = function(value) {
            $scope.currentCriterion = value;
        }

        $scope.isCurrentCriterionSet = function(value) { return $scope.currentCriterion === value; }
			 
	}])
    .directive("outsideClick", ['$document', '$parse', function($document, $parse) {
        return {
        link: function($scope, $element, $attributes) {
          var scopeExpression = $attributes.outsideClick,
            onDocumentClick = function(event) {
              var parent = event.target;

              while (parent && parent !== $element[0]) {
                parent = parent.parentNode;
              }

              if (!parent) {
                $scope.$apply(scopeExpression);
              }
            }

          $document.on("click", onDocumentClick);

          $element.on('$destroy', function() {
            $document.off("click", onDocumentClick);
          });
        }
        }
    }])
	/**
	 * Credits to http://www.andrewboni.com/2014/09/03/a-countupjs-angularjs-directive/
	 */
	.directive("countUp", function() {
	  return {
	    restrict: "A",
	    require: "ngModel",
	    scope: true,
	    link: function(scope, element, attrs) {
	      var animationLength, numDecimals;
	      numDecimals = 0;
	      animationLength = 4;
	      if ((attrs.numDecimals != null) && attrs.numDecimals >= 0) {
	        numDecimals = attrs.numDecimals;
	      }
	      if ((attrs.animationLength != null) && attrs.animationLength > 0) {
	        animationLength = attrs.animationLength;
	      }
	      return scope.$watch(attrs.ngModel, function(newVal, oldVal) {
	        if (oldVal == null) {
	          oldVal = 0;
	        }
	        if ((newVal != null) && newVal !== oldVal) {
	          return new countUp(attrs.id, oldVal, newVal, numDecimals, animationLength).start();
	        }
	      });
	    }
	  };
	})

	/**
	 * Um exemplo para um date-picker automatico
	 */

	.directive('testDatepicker', function($compile) {
      var controllerName = 'dateEditCtrl';
      return {
          restrict: 'A',
          require: '?ngModel',
          scope: true,
          terminal: true,
          priority: 1,
          compile: function(element) {
            var prepender = angular.element(
                '<div class="form-group">' +
                    '<label for="follow-up-xx" class="col-sm-3 control-label">xx</label>' +
                    '<div class="input-group col-md-9" >');
            var wrapper = angular.element(
                '<div class="input-group">' +
                    '<span class="input-group-btn">' +
                        '<button type="button" class="btn btn-default" ng-click="' + controllerName + '.openPopup($event)"><i class="glyphicon glyphicon-calendar"></i></button>' +
                    '</span>' +
                '</div>');

            function setAttributeIfNotExists(name, value) {
                var oldValue = element.attr(name);
                if (!angular.isDefined(oldValue) || oldValue === false) {
                    element.attr(name, value);
                }
            }

            setAttributeIfNotExists('type', 'text');
            setAttributeIfNotExists('is-open', controllerName + '.popupOpen');
            setAttributeIfNotExists('datepicker-popup', 'shortDate');
            setAttributeIfNotExists('close-text', 'Close');
            setAttributeIfNotExists('clear-text', 'Clear');
            setAttributeIfNotExists('current-text', 'Today');

            element.addClass('form-control');
            element.removeAttr('my-datepicker');
            element.after(wrapper);
            wrapper.prepend(element);

            return function(scope, element) {
              $compile(element)(scope);
            };
          },
          controller: function() {
              this.popupOpen = false;
              this.openPopup = function($event) {
                  $event.preventDefault();
                  $event.stopPropagation();
                  this.popupOpen = true;
              };
          },
          controllerAs: controllerName
      };
    })

	;
	

