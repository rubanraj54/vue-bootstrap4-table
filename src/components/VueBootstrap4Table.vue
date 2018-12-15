<template>
    <div class="container-fluid">
        <table class="table">
            <Header :columns="data.columns">
            </Header>
            <tbody>
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
    import Header from "./Header.vue";
    import Row from "./Row.vue";

    export default {
        name: 'VueBootstrap4Table',
        data: function() {
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
                    columns: [{
                            label: 'id',
                            name: 'id'
                        },
                        {
                            label: 'year',
                            name: 'year'
                        },
                        {
                            label: 'name',
                            name: 'name'
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
                    column_config: {

                    }
                }

            }
        },
        components: {
            Header,
            Row
        },
        methods: {

        }
    }
</script>
