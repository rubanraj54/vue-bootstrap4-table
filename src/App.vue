<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from './components/VueBootstrap4Table.vue'

    export default {
        name: 'App',
        data: function() {
            return {
                rows: [],
                columns: [
                    {
                        label: "id",
                        name: "id",
                        filter: {
                            type: "simple",
                            placeholder: "id"
                        },
                        sort: true,
                        uniqueId: true
                    },
                    {
                        label: "id",
                        name: "id",
                        filter: {
                            type: "simple",
                            placeholder: "id"
                        },
                        sort: true,
                        slot_name: "my_duplicate_id_column"
                    },
                    {
                        label: "title",
                        name: "title",
                        filter: {
                            type: "simple",
                            placeholder: "enter title"
                        },
                        sort: true,
                    },
                    // {
                    //     label: "user",
                    //     name: "user",
                    //     filter: {
                    //         type: "simple",
                    //         placeholder: "title"
                    //     },
                    //     sort: true,
                    //     initial_sort: true,
                    //     initial_sort_order: "asc" // default "asc"
                    // },
                    // {
                    //     label: "age",
                    //     name: "age",
                    //     filter: {
                    //         type: "simple",
                    //         placeholder: "Enter url"
                    //     },
                    //     sort: true,
                    //     initial_sort: true,
                    //     initial_sort_order: "desc" // default "asc"
                    // },
                    // {
                    //     label: "id",
                    //     name: "test.id",
                    //     filter: {
                    //         type: "simple",
                    //         placeholder: "unique id"
                    //     },
                    //     sort: true,
                    //     uniqueId: true
                    // },
                ],
                config: {
                    pagination: true,
                    pagination_info: true,
                    num_of_visibile_pagination_buttons: 7,
                    per_page: 10,
                    checkbox_rows: true,
                    highlight_row_hover: true,
                    rows_selectable: true,
                    multi_column_sort: true,
                    // highlight_row_hover_color:"grey",
                    card_title: "Vue Bootsrap 4 advanced table"
                }
            }
        },
        components: {
            VueBootstrap4Table
        },
        mounted() {
            let self = this;
            axios.get('https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/70775393694aa5e47633e957588df67453c12c02/src/assets/toy_data/users.json')
                .then(function(response) {
                    self.rows = response.data;
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
        },
    }
</script>

<style>

</style>
