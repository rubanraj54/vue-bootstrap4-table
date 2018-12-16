<template>
    <div class="container-fluid">
        <!-- TODO configurable header title position -->
        <div class="card">
            <div class="card-header text-center">
                Bootsrap 4 advanced table
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <Header :columns="data.columns" :config="config" v-on:update-sort="updateSort"></Header>
                        <tbody>
                            <tr class="table-active">
                                <td v-for="(column, key, index) in data.columns" :key="index">
                                    <Simple v-if="hasFilter(column)" :column="column" @update-filter="updateFilter" @clear-filter="clearFilter"></Simple>
                                </td>
                            </tr>
                            <Row v-for="(row, key, index) in data.rows" :key="index" :row="row" :columns="data.columns"></Row>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer">
                <Pagination :page.sync="page" :per_page="per_page" :total="rowCount"></Pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";

    import {
        library
    } from "@fortawesome/fontawesome-svg-core";
    import {
        fas
    } from "@fortawesome/free-solid-svg-icons";
    import {
        FontAwesomeIcon
    } from "@fortawesome/vue-fontawesome";

    library.add(fas);

    import Header from "./Header.vue";
    import Row from "./Row.vue";
    import Simple from "./Filters/Simple.vue";
    import Pagination from "./Pagination.vue";

    export default {
        name: "VueBootstrap4Table",
        props:{
            payload: {
                type: Object,
                required: true
            },
            tableConfig: {
                type: Object,
                default: function() {
                    return {};
                }
            },
        },
        data: function() {
            return {
                data: {

                },
                config: {
                    sort: {
                        name: null,
                        order: "asc"
                    },
                    filters: []
                },
                page: 1,
                per_page: 3,
                original_rows: [],
                pagiantion_limit: 5,
                temp_filtered_results: [],
                pagination: true
            };
        },
        mounted() {
            this.data = _.cloneDeep(this.payload);
            this.original_rows = _.cloneDeep(this.data.rows);
            this.initConfig();
            this.filter();
            this.paginateFilter();
        },
        components: {
            Header,
            Row,
            Simple,
            Pagination,
            "font-awesome-icon": FontAwesomeIcon
        },
        methods: {

            initConfig() {

                if (_.isEmpty(this.tableConfig)) {
                    return;
                }

                if (this.tableConfig.pagination && this.tableConfig.pagination == true) {
                    this.pagiantion_limit = this.tableConfig.num_of_visible_page;
                    this.per_page = this.tableConfig.per_page;
                } else {
                    this.pagination = false;
                }

            },

            hasFilter(column) {
                return _.has(column, 'filter.type');
            },

            clearFilter(column) {
                let filter_index = this.getFilterIndex(column);
                if (filter_index !== -1) {
                    this.config.filters.splice(filter_index, 1);
                }
            },

            getFilterIndex(column) {
                return _.findIndex(this.config.filters, {
                    name: column.name
                });

                // return (filter_index == -1) ? null : this.config.filters[filter_index];
            },

            updateSort(column) {
                if (this.config.sort.name == column.name) {
                    this.config.sort.order =
                        this.config.sort.order == "asc" ? "desc" : "asc";
                } else {
                    this.config.sort.name = column.name;
                    this.config.sort.order = "desc";
                }

                this.refresh();
            },
            updateFilter(payload) {
                let event = payload.event;
                let column = payload.column;
                let filter_index = _.findIndex(this.config.filters, {
                    name: column.name
                });
                if (filter_index == -1) {
                    if (event.target.value !== "") {
                        this.config.filters.push({
                            type: column.filter.type,
                            name: column.name,
                            text: event.target.value
                        });
                    }
                } else {
                    if (event.target.value === "") {
                        this.config.filters.splice(filter_index, 1);
                    } else {
                        this.config.filters[filter_index].text = event.target.value;
                    }
                }
            },

            sort() {
                // TODO- try multipl column sort

                if (this.config.sort.name == null) {
                    return;
                }

                this.data.rows = _.orderBy(
                    this.data.rows, [this.config.sort.name], [this.config.sort.order]
                );
            },

            filter() {
                let self = this;
                let res = _.filter(this.original_rows, function(row) {
                    let flag = true;
                    // console.log(self.config.);

                    _.forEach(self.config.filters, function(filter, key) {
                        // console.log(filter);

                            // console.log(3333);

                        if (filter.text === "") {
                            flag = true;
                            return false;
                        }

                        if (filter.type === "simple") {
                            if (self.simpleFilter(_.get(row, filter.name), filter.text)) {
                                flag = true;
                            } else {
                                flag = false;
                                return false;
                            }

                        }
                    });

                    return flag;
                });

                this.temp_filtered_results = res;
                this.page = 1;
            },

            simpleFilter(value, filter_text) {

                if (typeof value !== "string") {
                    value = value.toString();
                }

                // TODO - configurable lowercase conversion
                return value.toLowerCase().indexOf(filter_text) > -1;
            },

            refresh() {
                this.sort();
            },

            paginateFilter() {
                let start = (this.page - 1) * this.per_page;
                let end = start + (this.per_page);
                this.data.rows = this.temp_filtered_results.slice(start, end);
            }
        },
        computed: {
            rowCount() {
                return this.temp_filtered_results.length;
            }
        },
        watch: {
            'config.filters': {
                handler: function(after, before) {
                    this.filter();
                    this.paginateFilter();
                },
                deep: true,
            },
            'temp_filtered_results': {
                handler: function(newVal, oldVal) {
                    this.paginateFilter();
                },
                deep: true,
            },
            'page': {
                handler: function(newVal, oldVal) {
                    this.paginateFilter();
                }
            },
            'per_page': {
                handler: function(newVal, oldVal) {
                    this.paginateFilter();
                }
            },
            'payload': {
                handler: function(newVal, oldVal) {
                    this.data = _.cloneDeep(newVal);
                    this.original_rows = _.cloneDeep(this.data.rows);
                    this.filter();
                    this.paginateFilter();
                },
                deep: true
            },
            'tableConfig': {
                handler: function(newVal, oldVal) {
                    this.initConfig();
                },
                deep: true
            }
        }
    };
</script>
