﻿(function () {
    'use strict';
    angular.module("umbraco").controller("GodMode.PartialBrowser.Controller",
        function ($routeParams, navigationService, godModeResources, godModeConfig) {

            var vm = this;
            vm.isLoading = true;

            navigationService.syncTree({ tree: $routeParams.tree, path: [-1, $routeParams.method], forceReload: false });

            vm.config = godModeConfig.config;
            vm.search = {};
            vm.sort = {};
            vm.sort.column = "Name";
            vm.sort.reverse = false;
            vm.triStateOptions = godModeResources.getTriStateOptions();
            vm.search.isCached = vm.triStateOptions[0];

            godModeResources.getTemplates().then(function (data) {
                vm.templates = data;

                vm.partials = data.map(function (p) {
                    return p.Partials;
                }).reduce(function (a, b) {
                    return a.concat(b);
                });

                vm.isLoading = false;
            });

            vm.sortBy = function (column) {
                vm.sort.column = column;
                vm.sort.reverse = !vm.sort.reverse;
            };

            vm.filterPartials = function (p) {
                if (vm.search.partial) {
                    if (p.Name.toLowerCase().indexOf(vm.search.partial.toLowerCase()) === -1) {
                        return;
                    }
                }

                if (vm.search.template) {
                    return p.TemplateId === vm.search.template.Id;
                }

                if (vm.search.isCached.value) {
                    return p.IsCached === vm.search.isCached.value;
                }

                return p;
            };
        });
})();