<template>
    <div class="container-fluid">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(header, key, index) in data.column_config.headers" :key="index" scope="col">
                        {{header.label}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, key, index) in data.rows" :key="index">
                    <th v-for="(value, key, hindex) in row" scope="row" :key="hindex">
                        {{value}}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
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
                            "pantone_value": "15-4020"
                        },
                        {
                            "id": 2,
                            "name": "fuchsia rose",
                            "year": 2001,
                            "color": "#C74375",
                            "pantone_value": "17-2031"
                        },
                        {
                            "id": 3,
                            "name": "true red",
                            "year": 2002,
                            "color": "#BF1932",
                            "pantone_value": "19-1664"
                        }
                    ],
                    column_config: {
                        headers: [{
                                label: 'id',
                                name: 'id'
                            },
                            {
                                label: 'name',
                                name: 'name'
                            },
                            {
                                label: 'year',
                                name: 'year'
                            },
                            {
                                label: 'color',
                                name: 'color'
                            },
                            {
                                label: 'value',
                                name: 'pantone_value'
                            }
                        ]
                    }
                }
            }
        }
    }
</script>
