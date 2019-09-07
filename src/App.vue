<template>
    <div id="app" class="container-fluid mb-10">
        <vue-bootstrap4-table :classes="classes"
                              :rows="rows"
                              :columns="columns"
                              :config="config"
                              :custom-filters="customFilters"
                              :actions="actions"
                              @on-select-row="onSelectRows"
                              @refresh-data="onRefreshData"
                              :show-loader="showLoader"
                              @on-download="onDownload">
            <template slot="pagination-info" slot-scope="props">
                        This page total is {{props.currentPageRowsLength}} |
                        Filterd results total is {{props.filteredRowsLength}} |
                        Original data total is {{props.originalRowsLength}}
</template>

<template slot="sort-asc-icon">
    <i class="fas fa-sort-up"></i>
</template>
<template slot="card-header">
    <div class="text-center">
        my title
    </div>
</template>

<template slot="global-search-clear-icon">
    <i class="fas fa-times-circle"></i>
</template>
<template slot="simple-filter-clear-icon">
    <i class="fas fa-times-circle"></i>
</template>
<template slot="paginataion-previous-button">
    Previous
</template>
<!-- <template slot="paginataion-next-button">
    <i class="fas fa-step-forward"></i>
</template> -->

<template slot="vbt-action-buttons">
    <div class="btn-group float-right" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary" @click="test">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
</template>
<template slot="sort-desc-icon">
    <i class="fas fa-sort-down"></i>
</template>
<template slot="no-sort-icon">
    <i class="fas fa-sort"></i>
</template>

<template slot="refresh-button-text">
     <font-awesome-icon icon="user-secret" /> my refresh
</template>

<template slot="action-btn-download-icon">
     <font-awesome-icon icon="user-secret" /> test
</template>

<template slot="reset-button-text">
     ⟳ my reset
</template>
<template slot="empty-results">
    your custom message
</template>
<template slot="lastname-filter" slot-scope="props">
    <input type="text" class="form-control" placeholder="Enter lastname" @keyup.stop="updateLastNamefilter($event)">
</template>
        </vue-bootstrap4-table>
    </div>
</template>

<script>
    import VueBootstrap4Table from './components/VueBootstrap4Table.vue'

    var chance = require('chance').Chance(88);
    export default {
        name: 'App',
        data: function() {
            return {
                rows: [],
                customFilters: [],
                total_rows: 0,
                showLoader: true,
                list: [
                                {
                                    "name" : "Irwin",
                                    "value" : "Irwin"
                                },
                                {
                                    "name" : "Don",
                                    "value" : "Don"
                                },
                                {
                                    "name" : "Bessie",
                                    "value" : "Bessie"
                                },
                            ],
                columns: [{
                        label: "id",
                        name: "id",
                        // visibility: true,
                        filter: {
                            type: "simple",
                            placeholder: "id",
                            // showClearButton: false,
                            // init: {
                            //     value : "78"
                            // }
                        },
                        sort: true,
                        row_classes: "myrowclassone myrowclasstwo",
                        // column_classes: "column-class-one column-class-two"
                        // uniqueId: true
                    },
                    {
                        label: "First Name",
                        name: "name.first_name",
                        filter: {
                            type: "select",
                            placeholder: "Select first name",
                            options: [],
                            mode:"multi",
                            closeDropdownOnSelection: true,
                            select_all_checkbox : {
                                visibility: true,
                                text: "Select all"
                            },
                            init: {
                                value : [244]
                            }
                        },
                        sort: true,
                        initial_sort: false, // "false" by default
                        sortCaseSensitive: false,
                        // slot_name: "my_duplicate_id_column"
                    },
                    {
                        label: "Last Name",
                        name: "name.last_name",
                        filter: {
                            type: "simple",
                            showClearButton: false,
                            slot_name: "lastname-filter",
                            filterOnPressEnter: false,
                            debounceRate: 60,
                            placeholder: "Enter last name",
                            // validator: function(rowValue,filterText) {
                            //     return rowValue.indexOf(filterText) > -1;
                            // },
                            // init: {
                            //     value : "Zhang"
                            // }
                        },
                        sort: true,
                        sortCaseSensitive: false,
                        initial_sort: true, // "false" by default
                        initial_sort_order: "desc", // "false" by default
                    },
                    {
                        label: "Email",
                        name: "email[0].value",
                        filter: {
                            type: "simple",
                            slot_name: "email-filter",
                            debounceRate: 5000,
                            placeholder:"Enter email",
                            validator: function(rowValue,filterText) {
                                return rowValue.indexOf(filterText) > -1;
                            }
                        },
                        sort: true,
                        row_text_alignment: "text-left",
                        column_text_alignment: "text-left",
                        row_classes: "my-row-class1 my-row-class2",
                        column_classes: "my-column-class1 my-column-class2"
                    },
                    {
                        label: "Salary",
                        name: "salary",
                        // filter: {
                        //     type: "simple",
                        //     placeholder: "Enter email"
                        // },
                        sort: true,
                        row_text_alignment: "text-left",
                        column_text_alignment: "text-left"
                    },
                    {
                        label: "City",
                        name: "address.city",
                        sort: true,
                    },
                    {
                        label: "Country",
                        name: "address.country",
                        // filter: {
                        //     type: "simple",
                        //     placeholder: "Enter country"
                        // },
                    },
                ],
                config: {
                    pagination: true,
                    pagination_info: true,
                    num_of_visibile_pagination_buttons: 7,
                    per_page: 10,
                    page:1,
                    checkbox_rows: true,
                    highlight_row_hover: true,
                    rows_selectable: true,
                    multi_column_sort: false,
                    // highlight_row_hover_color:"grey",
                    card_title: "Vue Bootsrap 4 advanced table",
                    global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: true,
                        case_sensitive: false, // default false
                        showClearButton: true,
                        class: "test",
                        // searchOnPressEnter: true,
                        searchDebounceRate: 1000,
                        // init: {
                        //     value: "Christine"
                        // }
                    },
                    per_page_options: [5, 10, 20, 30],
                    show_reset_button: true,
                    show_refresh_button: true,
                    server_mode: false,
                    card_mode: true,
                    selected_rows_info: true,
                    preservePageOnDataChange: true,
                    loaderText: 'Updating...',
                },
                classes: {
                    // tableWrapper: "",
                    table : {
                        "table-striped my-class" : true,
                        "table-bordered my-class-two" : function(rows) {
                            return true
                        }
                    },
                    row : {
                        "my-row my-row2" : true,
                        "function-class" : function(row) {
                            return row.id == 1
                        }
                    },
                    cell : {
                        "my-cell my-cell2" : true,
                        "text-danger" : function(row,column,cellValue) {
                            return column.name == "salary" && row.salary > 2500
                        }
                    },
                    // table : "table-striped table-bordered my-class",
                },
                // actions: []
                actions: [
                    {
                    // btn_text: '<font-awesome-icon icon="user-secret" />',
                    btn_text_slot_name : 'action-btn-download-icon',
                    class: "btn btn-primary",
                    event_name: "on-download",
                    event_payload: {
                        msg: "my custom msg"
                    }
                },
                    {
                    btn_text: '<span> <i class="fas fa-download"></i> Download</span>',
                    class: "btn-info",
                    event_name: "on-download",
                    event_payload: {
                        msg: "my custom msg"
                    }
                },
                ],
                startDate: '2017-09-05',
                endDate: '2017-09-15',
                locale: {
                    direction: 'ltr', //direction of text
                    format: 'DD-MM-YYYY', //fomart of the dates displayed
                    separator: ' - ', //separator between the two ranges
                    applyLabel: 'Apply',
                    cancelLabel: 'Cancel',
                    weekLabel: 'W',
                    customRangeLabel: 'Custom Range'
                    }
            }
        },
        methods: {
            updateEmailfilter(event) {
                let index = this.customFilters.findIndex( customFilter => customFilter.name === 'email' );
                if (index == -1) {
                    this.customFilters.push({
                        name: "email",
                        text: event.target.value,
                        type: "custom"
                    });
                } else {
                    this.customFilters[index].text = event.target.value;
                }
            },
            updateLastNamefilter(event) {
                let index = this.customFilters.findIndex( customFilter => customFilter.name === 'name.last_name' );
                if (index == -1) {
                    this.customFilters.push({
                        name: "name.last_name",
                        text: event.target.value,
                        type: "custom"
                    });
                } else {
                    this.customFilters[index].text = event.target.value;
                }
            },
            fetchData() {
                let user;
                let users = [];
                for (let i = 1; i <=100; i++) {
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
                        email: [{value: chance.email()}],
                        website: chance.domain(),
                        mobile: chance.phone()
                    }
                    users.push(user);
                }
                user = {
                    id : 103,
                    name: {
                        first_name: null,
                        last_name: null,
                    },
                    age: chance.age(),
                    address: {
                        city: chance.city(),
                        street: chance.address(),
                        postcode: chance.postcode(),
                        country: chance.country({ full: true })
                    },
                    salary: chance.integer({ min: 1500, max: 3000 }),
                    email: [{value: chance.email()}],
                    website: chance.domain(),
                    mobile: chance.phone()
                }
                    users.push(user);

                user = {
                    id : 104,
                    name: {
                        first_name: "voll",
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
                    email: [{value: chance.email()}],
                    website: chance.domain(),
                    mobile: chance.phone()
                }
                    users.push(user);

                this.rows = users;
            },
            onSelectRows(payload) {
                console.log(payload);
            },
            onDownload(payload) {
                console.log(payload);
            },
            test(){
                alert(33);
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
                this.fetchData();
                // this.$nextTick(() => {
                //     this.config.page= 4;
		        // });
                // this.rows = dummy;
            }
        },
        components: {
            VueBootstrap4Table,
        },
        mounted() {
            let self = this;
            this.fetchData();
            this.columns[1].filter.options = this.list;
            // let test = [1,2,3,4,5,6,7]

            // test.some((val,index) => {
            //     console.log(val);
            //     if (val == 3) {
            //         return true
            //     }

            // })
        },
    }
</script>

<style>
.vbt-row-selected {
    background-color: rgb(131, 102, 102) !important
}

.my-margin {
    margin: 10px;
}

</style>
