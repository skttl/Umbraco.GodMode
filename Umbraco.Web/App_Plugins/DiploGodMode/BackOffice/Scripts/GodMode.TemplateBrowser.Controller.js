﻿(function () {
    'use strict';
    angular.module("umbraco").controller("GodMode.TemplateBrowser.Controller",
        function ($routeParams, navigationService, godModeResources, godModeConfig) {

            var vm = this;
            vm.isLoading = true;

            navigationService.syncTree({ tree: $routeParams.tree, path: [-1, $routeParams.method], forceReload: false });

            vm.config = godModeConfig.config;
            vm.search = {};

            godModeResources.getTemplates().then(function (data) {
                vm.templates = data;
                vm.partials = data.map(function (p) { return p.Partials; }).reduce(function (a, b) { return a.concat(b); });
                vm.masters = data.filter(function (t) { return t.IsMaster; });
                vm.isLoading = false;
            });

            vm.filterTemplates = function (temp) {
                if (vm.search.partial) {
                    if (!temp.Partials.some(function (elem) {
                        return elem.Name === vm.search.partial.Name;
                    })) return;
                }

                if (vm.search.master) {
                    if (!temp.Parents.some(function (elem) {
                        return elem.Alias === vm.search.master.Alias;
                    })) return;
                }

                if (vm.search.template) {
                    if (temp.Name.toLowerCase().indexOf(vm.search.template.toLowerCase()) === -1 &&
                        temp.Alias.toLowerCase().indexOf(vm.search.template.toLowerCase()) === -1 &&
                        temp.Udi.toLowerCase().indexOf(vm.search.template.toLowerCase()) === -1) {
                        return;
                    }
                }

                return temp;
            };
        });
})();