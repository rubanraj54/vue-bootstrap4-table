<template>
<div class="container-fluid">
    <table class="table table-striped">
        <Header :columns="data.columns" :config=data.config v-on:update-sort="updateSort">
        </Header>
        <tbody>
            <tr class="table-active">
                <td v-for="(column, key, index) in data.columns" :key="index">
                    <input type="text" class="form-control" @keyup.stop="test($event,column)">
                    </td>
            </tr>
            <Row v-for="(row, key, index) in data.rows" :key="index" :row="row" :columns="data.columns">
                <!-- <template slot="row" slot-scope="{row, column,value}">
                                    <template v-if="column.name == 'id'">
                                        <div>

                                      {{row.id + row.name}}
                                        </div>
</template>

<template v-else>
     {{value}}
</template>
                    </template> -->
            </Row>
        </tbody>
    </table>
</div>
</template>

<script>
import _ from 'lodash';

import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    fas
} from '@fortawesome/free-solid-svg-icons'
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(fas);

import Header from "./Header.vue";
import Row from "./Row.vue";

export default {
    name: 'VueBootstrap4Table',

    data: function () {
        return {
            data: {
                "page": 1,
                "per_page": 3,
                "total": 12,
                "total_pages": 4,
                "rows": [{
                        "id": 1,
                        "name": "cerulean",
                        "year": 2000,
                        "color": "#98B2D1",
                        "pantone_value": "15-4020",
                        "date": {
                            "year": 2018
                        }
                    },
                    {
                        "id": 2,
                        "name": "fuchsia rose",
                        "year": 2001,
                        "color": "#C74375",
                        "pantone_value": "17-2031",
                        "date": {
                            "year": 2020
                        }
                    },
                    {
                        "id": 3,
                        "name": "true red",
                        "year": 2002,
                        "color": "#BF1932",
                        "pantone_value": "19-1664",
                        "date": {
                            "year": 2020
                        }
                    }
                ],
                "columns": [{
                        label: 'id',
                        name: 'id'
                    },
                    {
                        label: 'year',
                        name: 'year'
                    },
                    {
                        label: 'name',
                        name: 'name',
                        filter: {
                            type: "simple"
                        }
                    },
                    {
                        label: 'color',
                        name: 'color'
                    },
                    {
                        label: 'value',
                        name: 'pantone_value'
                    },
                    {
                        label: 'Year',
                        name: 'date.year'
                    }
                ],
                "column_config": {

                },
                "config": {
                    "sort": {
                        "name": null,
                        "order": 'asc'
                    },
                    "filter": [

                    ]
                }
            }

        }
    },
    components: {
        Header,
        Row,
        'font-awesome-icon': FontAwesomeIcon
    },
    methods: {
        updateSort(column) {

            if (this.data.config.sort.name == column.name) {
                this.data.config.sort.order = (this.data.config.sort.order == 'asc') ? "desc" : "asc";
            } else {
                this.data.config.sort.name = column.name;
                this.data.config.sort.order = "desc";
            }

            this.refresh();

        },

        test: _.debounce(function (event, column) {
            let filter_index = _.findIndex(this.data.config.filter, {
                "name": column.name
            });
            if (filter_index == -1) {
                this.data.config.filter.push({
                    "type": column.filter.type,
                    "name": column.name,
                    "text": event.target.value
                });
            } else {
                this.data.config.filter[filter_index].text = event.target.value;
            }
            this.filter();
        }, 300),

        sort() {

            // TODO- try multipl column sort

            if (this.data.config.sort.name == null) {
                return;
            }

            this.data.rows = _.orderBy(this.data.rows, [this.data.config.sort.name], [this.data.config.sort.order]);

        },

        filter() {
            let self = this;
            let res = _.filter(this.data.rows, function (row) {
                return row.name.indexOf(self.data.config.filter[0].text) > -1;
            });
            console.log(res);

        },

        refresh() {
            this.sort();
        }

    }
}
</script>
