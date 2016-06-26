/// <reference path="../../../typings/index.d.ts" />
namespace app.tags {
    'use strict';
    /**
     * import all used angular services for interface
     */
    import IQService = angular.IQService;
    import IScope = angular.IScope;
    /**
     * Export interface being used for email tagging directive
     */
    export interface ITagsCtrl {

    }
    export interface ITags {
        displayName:string;
        mail:string;
    }
    export interface ITagsVmScope extends ng.IScope {
        tags: Array<ITags>;
        loadTags: Function;
        tagAdded: Function;
        tagRemoved: Function;
        errorMsg: string;
    }
    /**
     * constructor controller class for directive
     */
    export class TagsController implements ITagsCtrl {
        constructor() {

        }
    }
    /**
     * Registering directive and controller
     */
    angular
        .module('app.tags', ['ngTagsInput'])
        .directive('tags', ['$http', ($http:ng.IHttpService):ng.IDirective => {
            return new TagsDirective($http);
        }])
        .controller("TagsController", TagsController);
    /**
     * Email Tag Directive
     */
    class TagsDirective implements ng.IDirective {
        public restrict:string;
        public controller = 'TagsController';
        public controllerAs = 'vm';
        public bindToController = true;
        public templateUrl = 'app-templates/demo/demo.html';
        public scope = true;

        public link:ng.IDirectiveLinkFn;
        /**
         *
         * @param email
         * @returns {boolean}
         */
        private validateEmail = (email:string) => {
            let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        };

        /**
         *
         * @param $http
         */
        constructor(private $http:ng.IHttpService) {
            this.restrict = 'E';
            /**
             *
             * @param scope
             */
            this.link = (scope:ITagsVmScope) => {
                scope.tags = [];
                scope.errorMsg = '';
                /**
                 *
                 * @param query
                 * @returns {IHttpPromise<T>}
                 */
                scope.loadTags = (query:string):any => {
                    return $http.get('json/tags.json');
                };
               /* scope.tagAdded = (tag:ITags):void => {
                    let isValidEmail = this.validateEmail(tag.mail);
                    if (!isValidEmail) {
                        scope.errorMsg = "Error: Invalid Email Id";
                    }
                };
                scope.tagRemoved = ():void => {
                    scope.errorMsg = '';
                };*/
            }
        }
    }
}
