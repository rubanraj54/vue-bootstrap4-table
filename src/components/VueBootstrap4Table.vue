<template>
    <div class="container-fluid">
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <Header :columns="data.columns" :config="data.config" v-on:update-sort="updateSort"></Header>
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

    export default {
        name: "VueBootstrap4Table",

        data: function() {
            return {
                data: {
                    page: 1,
                    per_page: 3,
                    total: 12,
                    total_pages: 4,
                    rows: [{
                            id: 1,
                            name: "Rubanraj",
                            year: 2000,
                            color: "#98B2D1",
                            pantone_value: "15-4020",
                            date: {
                                year: 2018
                            }
                        },
                        {
                            id: 2,
                            name: "fuchsia rose",
                            year: 2001,
                            color: "#C74375",
                            pantone_value: "17-2031",
                            date: {
                                year: 2020
                            }
                        },
                        {
                            id: 3,
                            name: "true red",
                            year: 2002,
                            color: "#BF1932",
                            pantone_value: "19-1664",
                            date: {
                                year: 2020
                            }
                        },
                        {
                            id: 4,
                            name: "eddy",
                            year: 1902,
                            color: "#BF122",
                            pantone_value: "19-1622",
                            date: {
                                year: 1993
                            }
                        }
                    ],
                    columns: [{
                            label: "id",
                            name: "id",
                            filter: {
                                type: "simple",
                                placeholder: "id"
                            }
                        },
                        {
                            label: "year",
                            name: "year",
                            filter: {
                                type: "simple",
                                placeholder: "year"
                            }
                        },
                        {
                            label: "name",
                            name: "name",
                            filter: {
                                type: "simple",
                                placeholder: "enter name"
                            }
                        },
                        {
                            label: "color",
                            name: "color",
                            filter: {
                                type: "simple",
                                placeholder: "Color"
                            }
                        },
                        {
                            label: "value",
                            name: "pantone_value",
                            filter: {
                                type: "simple",
                                placeholder: "Pantone value"
                            }
                        },
                        {
                            label: "Year",
                            name: "date.year",
                            filter: {
                                type: "simple",
                                placeholder: "Complex year"
                            }
                        }
                    ],
                    column_config: {},
                    config: {
                        sort: {
                            name: null,
                            order: "asc"
                        },
                        filters: []
                    }
                },
                original_rows: []
            };
        },
        mounted() {
            this.original_rows = _.cloneDeep(this.data.rows);
        },
        components: {
            Header,
            Row,
            Simple,
            "font-awesome-icon": FontAwesomeIcon
        },
        methods: {

            hasFilter(column) {
                return _.has(column, 'filter.type');
            },

            clearFilter(column) {
                let filter_index = this.getFilterIndex(column);
                if (filter_index !== -1) {
                    this.data.config.filters.splice(filter_index, 1);
                }
            },

            getFilterIndex(column) {
                return _.findIndex(this.data.config.filters, {
                    name: column.name
                });

                // return (filter_index == -1) ? null : this.data.config.filters[filter_index];
            },

            updateSort(column) {
                if (this.data.config.sort.name == column.name) {
                    this.data.config.sort.order =
                        this.data.config.sort.order == "asc" ? "desc" : "asc";
                } else {
                    this.data.config.sort.name = column.name;
                    this.data.config.sort.order = "desc";
                }

                this.refresh();
            },
            updateFilter(payload) {
                let event = payload.event;
                let column = payload.column;
                let filter_index = _.findIndex(this.data.config.filters, {
                    name: column.name
                });
                if (filter_index == -1) {
                    if (event.target.value !== "") {
                        this.data.config.filters.push({
                            type: column.filter.type,
                            name: column.name,
                            text: event.target.value
                        });
                    }
                } else {
                    if (event.target.value === "") {
                        this.data.config.filters.splice(filter_index, 1);
                    } else {
                        this.data.config.filters[filter_index].text = event.target.value;
                    }
                }
            },

            sort() {
                // TODO- try multipl column sort

                if (this.data.config.sort.name == null) {
                    return;
                }

                this.data.rows = _.orderBy(
                    this.data.rows, [this.data.config.sort.name], [this.data.config.sort.order]
                );
            },

            filter() {
                let self = this;
                let res = _.filter(this.original_rows, function(row) {
                    let flag = true;
                    _.forEach(self.data.config.filters, function(filter, key) {

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

                this.data.rows = res;
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
            }
        },
        watch: {
            'data.config.filters': {
                handler: function(after, before) {
                    this.filter();
                },
                deep: true,
            }
        }
    };
</script>
