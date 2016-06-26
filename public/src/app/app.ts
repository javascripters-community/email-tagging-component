/// <reference path="../../../typings/index.d.ts" />
// your app setup here
(function () {
    'use strict';
    let app = angular.module('app', [
        'app.tags',
        'app.templates'
    ]);
    /***
     * set default configuration for email tagging
     */
    app.config(function (tagsInputConfigProvider:any) {
        tagsInputConfigProvider.setTextAutosizeThreshold(30);
        tagsInputConfigProvider
            .setDefaults('tagsInput', {
                placeholder: 'tag email id',
                minLength: 5,
                type: 'email',
                enableEditingLastTag: true,
                addOnPaste: true,
                displayProperty: 'displayName',
                replaceSpacesWithDashes:false,
                allowLeftoverText: true,
                maxLength: 20
            })
            .setDefaults('autoComplete', {
                debounceDelay: 200,
                loadOnDownArrow: true,
                loadOnEmpty: true
            })
    });
})();
