<template>
    <div class="container-fluid">
        <!-- TODO configurable header title position -->
        <div class="card">
            <div class="card-header text-center">Bootsrap 4 advanced table</div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <Header :columns="vbt_data.columns" :query="query" v-on:update-sort="updateSort"></Header>
                        <tbody>
                            <tr class="table-active">
                                <td v-for="(column, key, index) in vbt_data.columns" :key="index">
                                    <Simple v-if="hasFilter(column)" :column="column" @update-filter="updateFilter" @clear-filter="clearFilter"></Simple>
                                </td>
                            </tr>
                            <Row v-for="(row, key, index) in vbt_data.rows" :key="index" :row="row" :columns="vbt_data.columns"></Row>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-md-6">
                        <Pagination :page.sync="page" :per_page="per_page" :total="rowCount" :pagiantion_limit="pagiantion_limit"></Pagination>
                    </div>
                    <div class="col-md-6">
                        <PaginationInfo :current-page-rows-length="vbt_data.rows.length" :filtered-rows-length="rowCount" :original-rows-length="data.rows.length"></PaginationInfo>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";

    import Header from "./Header.vue";
    import Row from "./Row.vue";
    import Simple from "./Filters/Simple.vue";
    import Pagination from "./Pagination.vue";
    import PaginationInfo from "./PaginationInfo.vue";

    export default {
        name: "VueBootstrap4Table",
        props: {
            data: {
                type: Object,
                required: true
            },
            config: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data: function() {
            return {
                vbt_data: {
                    rows: [],
                    columns: []
                },
                query: {
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
            this.vbt_data = _.cloneDeep(this.data);
            this.original_rows = _.cloneDeep(this.vbt_data.rows);
            this.initConfig();
            this.filter();
            this.paginateFilter();
        },
        components: {
            Header,
            Row,
            Simple,
            Pagination,
            PaginationInfo
        },
        methods: {
            initConfig() {
                if (_.isEmpty(this.config)) {
                    return;
                }

                if (this.config.pagination && this.config.pagination == true) {
                    this.pagiantion_limit = this.config.num_of_visible_page;
                    this.per_page = this.config.per_page;
                } else {
                    this.pagination = false;
                }
            },

            hasFilter(column) {
                return _.has(column, "filter.type");
            },

            clearFilter(column) {
                let filter_index = this.getFilterIndex(column);
                if (filter_index !== -1) {
                    this.query.filters.splice(filter_index, 1);
                }
            },

            getFilterIndex(column) {
                return _.findIndex(this.query.filters, {
                    name: column.name
                });

                // return (filter_index == -1) ? null : this.query.filters[filter_index];
            },

            updateSort(column) {
                if (this.query.sort.name == column.name) {
                    this.query.sort.order =
                        this.query.sort.order == "asc" ? "desc" : "asc";
                } else {
                    this.query.sort.name = column.name;
                    this.query.sort.order = "desc";
                }

                this.refresh();
            },
            updateFilter(payload) {
                let event = payload.event;
                let column = payload.column;
                let filter_index = _.findIndex(this.query.filters, {
                    name: column.name
                });
                if (filter_index == -1) {
                    if (event.target.value !== "") {
                        this.query.filters.push({
                            type: column.filter.type,
                            name: column.name,
                            text: event.target.value
                        });
                    }
                } else {
                    if (event.target.value === "") {
                        this.query.filters.splice(filter_index, 1);
                    } else {
                        this.query.filters[filter_index].text = event.target.value;
                    }
                }
            },

            sort() {
                // TODO- try multipl column sort

                if (this.query.sort.name == null) {
                    this.paginateFilter();
                    return;
                }

                this.temp_filtered_results = _.orderBy(
                    this.temp_filtered_results, [this.query.sort.name], [this.query.sort.order]
                );

                this.paginateFilter();
            },

            filter() {
                let self = this;

                let res = _.filter(this.original_rows, function(row) {
                    let flag = true;
                    _.forEach(self.query.filters, function(filter, key) {
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
                this.sort();
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
                let end = start + this.per_page;
                this.vbt_data.rows = this.temp_filtered_results.slice(start, end);
            }
        },
        computed: {
            rowCount() {
                return this.temp_filtered_results.length;
            }
        },
        watch: {
            "query.filters": {
                handler: function(after, before) {
                    this.filter();
                },
                deep: true
            },
            page: {
                handler: function(newVal, oldVal) {
                    this.paginateFilter();
                }
            },
            per_page: {
                handler: function(newVal, oldVal) {
                    this.paginateFilter();
                }
            },
            data: {
                handler: function(newVal, oldVal) {
                    this.vbt_data = _.cloneDeep(newVal);
                    this.original_rows = _.cloneDeep(this.vbt_data.rows);
                    this.filter();
                },
                deep: true
            },
            config: {
                handler: function(newVal, oldVal) {
                    this.initConfig();
                },
                deep: true
            }
        }
    };
</script>


// workflow
// get data(payload)
// clone to origin_rows
// do filter
// do sort
// do paginate
