/// <reference path="../../../typings/index.d.ts" />
// your app setup here
(function () {
    'use strict';
    var app = angular.module('app', [
        'app.tags',
        'app.templates'
    ]);
    /***
     * set default configuration for email tagging
     */
    app.config(function (tagsInputConfigProvider) {
        tagsInputConfigProvider.setTextAutosizeThreshold(30);
        tagsInputConfigProvider
            .setDefaults('tagsInput', {
            placeholder: 'tag email id',
            minLength: 5,
            type: 'email',
            enableEditingLastTag: true,
            addOnPaste: true,
            displayProperty: 'displayName',
            replaceSpacesWithDashes: false,
            allowLeftoverText: true,
            maxLength: 20
        })
            .setDefaults('autoComplete', {
            debounceDelay: 200,
            loadOnDownArrow: true,
            loadOnEmpty: true
        });
    });
})();
/// <reference path="../../../typings/index.d.ts" />
var app;
(function (app) {
    var tags;
    (function (tags) {
        'use strict';
        /**
         * constructor controller class for directive
         */
        var TagsController = (function () {
            function TagsController() {
            }
            return TagsController;
        }());
        tags.TagsController = TagsController;
        /**
         * Registering directive and controller
         */
        angular
            .module('app.tags', ['ngTagsInput'])
            .directive('tags', ['$http', function ($http) {
                return new TagsDirective($http);
            }])
            .controller("TagsController", TagsController);
        /**
         * Email Tag Directive
         */
        var TagsDirective = (function () {
            /**
             *
             * @param $http
             */
            function TagsDirective($http) {
                this.$http = $http;
                this.controller = 'TagsController';
                this.controllerAs = 'vm';
                this.bindToController = true;
                this.templateUrl = 'app-templates/demo/demo.html';
                this.scope = true;
                /**
                 *
                 * @param email
                 * @returns {boolean}
                 */
                this.validateEmail = function (email) {
                    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    return re.test(email);
                };
                this.restrict = 'E';
                /**
                 *
                 * @param scope
                 */
                this.link = function (scope) {
                    scope.tags = [];
                    scope.errorMsg = '';
                    /**
                     *
                     * @param query
                     * @returns {IHttpPromise<T>}
                     */
                    scope.loadTags = function (query) {
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
                };
            }
            return TagsDirective;
        }());
    })(tags = app.tags || (app.tags = {}));
})(app || (app = {}));
angular.module("app.templates", []).run(["$templateCache", function ($templateCache) { $templateCache.put("app-templates/demo/demo.html", "<!--Tag directive template-->\n<div id=\"demo-css-inject\">\n    <h2>Mail Address Tagging Component</h2>\n    <div class=\"row\">\n        <form class=\"form-horizontal\" role=\"form\">\n            <div class=\"form-group\">\n                <label class=\"control-label col-sm-2\">To:</label>\n                <div class=\"col-sm-10\">\n                    <tags-input ng-model=\"tags\" on-tag-added=\"tagAdded($tag)\" on-tag-removed=\"tagRemoved($tag)\" type=\"email\">\n                        <auto-complete source=\"loadTags($query)\"></auto-complete>\n                    </tags-input>\n                </div>\n            </div>\n        </form>\n        <!--<span data-ng-if=\"errorMsg\" class=\"has-error\">{{errorMsg}}</span>-->\n    </div>\n</div>\n<p class=\"panel-body\"><div class=\"panel\">Tagged Email Details:<br/> {{tags | json}}</div></p>"); }]);
