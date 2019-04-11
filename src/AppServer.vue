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
                            placeholder: "id",
                            // init: {
                            //     value : "2"
                            // }
                        },
                        sort: true,
                        uniqueId: true
                    },
                    {
                        label: "Address",
                        name: "city",
                        filter: {
                            type: "select",
                            placeholder: "Select Address",
                            options: [],
                            mode:"multi",
                            select_all_checkbox : {
                                visibility: true,
                                text: "Select all"
                            },
                            // init: {
                            //     value : [0]
                            // }
                        },
                        sort: true,
                        initial_sort: true
                    },
                    {
                        label: "Firstname",
                        name: "firstname",
                        filter: {
                            type: "simple",
                            placeholder: "Enter firstname"
                        },
                        sort: true,
                        initial_sort: true
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
                    multi_column_sort: true,
                    page:2,
                    // highlight_row_hover_color:"grey",
                    card_title: "Vue Bootsrap 4 advanced table",
                    global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: true,
                        case_sensitive: false, // default false
                        // init: {
                        //     value: "ojo"
                        // }
                    },
                    per_page_options: [5, 10, 20, 30],
                    show_reset_button: true,
                    show_refresh_button: true,
                    server_mode: true,
                    preservePageOnDataChange: true
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
                },
            isfirst: true,
            }
        },
        methods: {
            onChangeQuery(queryParams) {
                this.queryParams = queryParams;
                this.fetchData();
                // if (this.isfirst) {

                //     this.fetchFakeData(10,20,1);
                //     this.isfirst = false;
                // } else {
                //     this.fetchFakeData(10,20,2);

                // }

            },
            fetchFakeData(count,total) {
                let user;
                let users = [];
                for (let i = 1; i <=count; i++) {
                    user = {
                        id : i,
                        name: {
                            first_name: chance.first(),
                            last_name: chance.last(),
                        },
                        age: chance.age(),
                        address: {
                            city: chance.city(),
                            street: chance.address(),
                            postcode: chance.postcode(),
                            country: chance.country({ full: true })
                        },
                        salary: chance.integer({ min: 1500, max: 3000 }),
                        email: chance.email(),
                        website: chance.domain(),
                        mobile: chance.phone()
                    }
                    users.push(user);
                }
                this.rows = users;
                this.total_rows = total;
            },
            fetchData() {
                let self = this;
                axios.get('http://localhost:8090/test/searchcustomer', {
                        params: {
                            "q": this.queryParams,
                            "page": this.queryParams.page
                        }
                    })
                    .then(function(response) {
                        self.rows = response.data.data.data;
                        self.total_rows = response.data.data.total;
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
            // this.fetchData();
            this.columns[1].filter.options = [{
                                    "name" : "Pinneberg",
                                    "value" : "Pinneberg"
                                }];
            // this.fetchFakeData(10,20,1);
        },
    }
</script>

<style>

</style>
