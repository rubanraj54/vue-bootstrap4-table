<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config" :actions="actions" @on-select-row="onSelectRows" @refresh-data="onRefreshData" @on-change-query="onChangeQuery" @on-download="onDownload" :totalRows="total_rows">
            <template slot="pagination-info" slot-scope="props">
                        This page total is {{props.currentPageRowsLength}} |
                        Filterd results total is {{props.filteredRowsLength}} |
                        Original data total is {{props.originalRowsLength}}
</template>

<template slot="refresh-button-text">
     ⟳ my refresh
</template>

<template slot="reset-button-text">
     ⟳ my reset
</template>
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
                    // {
                    //     label: "First Name",
                    //     name: "name.first_name",
                    //     filter: {
                    //         type: "simple",
                    //         placeholder: "Enter first name"
                    //     },
                    //     sort: true,
                    //     // slot_name: "my_duplicate_id_column"
                    // },
                    // {
                    //     label: "Last Name",
                    //     name: "name.last_name",
                    //     filter: {
                    //         type: "simple",
                    //         placeholder: "Enter last name",
                    //         case_sensitive: true
                    //     },
                    //     sort: true,
                    // },
                    // {
                    //     label: "Email",
                    //     name: "email",
                    //     filter: {
                    //         type: "simple",
                    //         placeholder: "Enter email"
                    //     },
                    //     sort: true,
                    // },
                    // {
                    //     label: "City",
                    //     name: "address.city",
                    //     sort: true,
                    // },
                    // {
                    //     label: "Country",
                    //     name: "address.country",
                    //     filter: {
                    //         type: "simple",
                    //         placeholder: "Enter country"
                    //     },
                    // },
                ],
                config: {
                    pagination: true,
                    pagination_info: true,
                    num_of_visibile_pagination_buttons: 7,
                    per_page: 10,
                    checkbox_rows: true,
                    highlight_row_hover: true,
                    // rows_selectable: true,
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
                        console.log(response);

                        self.rows = response.data.data;
                        self.total_rows = response.data.total;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            onSelectRows(payload) {
                console.log(payload);
            },
            onDownload(payload) {
                alert(payload.msg)
                console.log(payload);
            },
            onRefreshData() {
                let dummy = [{
                    "name": {
                        "first_name": "asdf",
                        "last_name": "afds"
                    },
                    "id": 1,
                    "age": 27,
                    "address": {
                        "city": "Port asdf",
                        "street": "311 Marlen Skyway Suite 457",
                        "postcode": "59419",
                        "country": "Mayotte"
                    },
                    "salary": 2574,
                    "email": "franecki.asfd@gmail.com",
                    "website": "reichert.info",
                    "mobile": "+1-704-796-2565"
                }, {
                    "name": {
                        "first_name": "xcv",
                        "last_name": "asdf"
                    },
                    "id": 2,
                    "age": 23,
                    "address": {
                        "city": "asdf",
                        "street": "asdf Tiara Valleys",
                        "postcode": "df-4010",
                        "country": "sdfa"
                    },
                    "salary": 2126,
                    "email": "rlittle@macejkovic.biz",
                    "website": "wisoky.com",
                    "mobile": "+asf"
                }, {
                    "name": {
                        "first_name": "asdfsdf",
                        "last_name": "asdf"
                    },
                    "id": 3,
                    "age": 30,
                    "address": {
                        "city": "asf",
                        "street": "7729 Ashleigh Radial Apt. 649",
                        "postcode": "54914-6608",
                        "country": "Papua New Guinea"
                    },
                    "salary": 3805,
                    "email": "delasfia.becker@cormier.com",
                    "website": "ksdfuhlman.com",
                    "mobile": "220.872.2938 x35208"
                }];

                this.rows = dummy;
            }
        },
        components: {
            VueBootstrap4Table
        },
        mounted() {
            let self = this;
            this.fetchData();
            // axios.get('http://localhost:8090/test')
            //     .then(function(response) {
            //         self.rows = response.data.data;
            //         self.total_rows = response.data.total;
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //     });
            // axios.get('https://raw.githubusercontent.com/rubanraj54/vue-bootstrap4-table/develop/src/assets/toy_data/users_500.json')
            //     .then(function(response) {
            //         self.rows = response.data;
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //     });
        },
    }
</script>

<style>

</style>
