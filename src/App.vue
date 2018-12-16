<template>
    <div id="app">
        <vue-bootstrap4-table :payload="result" :table-config="config"></vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from './components/VueBootstrap4Table.vue'

    export default {
        name: 'App',
        data: function() {
            return {
                result: {
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
                    ]
                },
                config : {
                    pagination: true,
                    num_of_visible_page: 5,
                    per_page: 2
                }
            }
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>

<style>

</style>
