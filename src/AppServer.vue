<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows"
                              :columns="columns"
                              :config="config"
                              @on-change-query="onChangeQuery"
                              :totalRows="total_rows">
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
                total_rows: 0,
                columns: [{
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
                        label: "Payment Amount",
                        name: "prepayment_amount",
                        filter: {
                            type: "simple",
                            placeholder: "Enter payment amount"
                        },
                        sort: true
                    },
                    {
                        label: "Address",
                        name: "address",
                        filter: {
                            type: "simple",
                            placeholder: "Enter Address"
                        },
                        sort: true
                    },
                ],
                config: {
                    pagination: true,
                    pagination_info: true,
                    num_of_visibile_pagination_buttons: 7,
                    per_page: 10,
                    checkbox_rows: true,
                    highlight_row_hover: true,
                    rows_selectable: true,
                    multi_column_sort: false,
                    // highlight_row_hover_color:"grey",
                    card_title: "Vue Bootsrap 4 advanced table",
                    global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: true,
                        case_sensitive: false // default false
                    },
                    per_page_options: [5, 10, 20, 30],
                    show_reset_button: true,
                    show_refresh_button: true,
                    server_mode: true
                },
                msg: "msg from parent",
                actions: [{
                    btn_text: "Download",
                    event_name: "on-download",
                    event_payload: {
                        msg: "my custom msg"
                    }
                }],
                queryParams: {
                    sort: [],
                    filters: [],
                    global_search: "",
                    per_page: 10,
                    page: 1,
                }
            }
        },
        methods: {
            onChangeQuery(queryParams) {
                this.queryParams = queryParams;
                this.fetchData();
            },
            fetchData() {
                let self = this;
                axios.get('http://localhost:8090/test/search', {
                        params: {
                            "q": this.queryParams,
                            "page": this.queryParams.page
                        }
                    })
                    .then(function(response) {
                        self.rows = response.data.data;
                        self.total_rows = response.data.total;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

        },
        components: {
            VueBootstrap4Table
        },
        mounted() {
            this.fetchData();
        },
    }
</script>

<style>

</style>
