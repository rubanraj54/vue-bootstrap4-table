<template>
<div class="container-fluid">
    <!-- TODO configurable header title position -->
    <div class="card">
        <div class="card-header text-center">
            {{card_title}}
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th v-show="checkbox_rows" class="text-center justify-content-center" @click="selectAllCheckbox($event)">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input vbt-checkbox" v-model="select_all_rows" value="" @change="selectAllHandleChange($event)"/>
                                    <label class="custom-control-label"></label>
                                </div>
                            </th>

                            <slot name="columns" :columns="vbt_columns">
                                <th v-for="(column, key, index) in vbt_columns" :key="index" v-on="isSortableColumn(column) ? { click: () => updateSortQuery(column) } : {}" class="text-center vbt-column-header" v-bind:class="{'vbt-sort-cursor':isSortableColumn(column)}">
                                    <slot name="column" :column="column">{{column.label}}</slot>

                                    <template v-if='isSortableColumn(column)'>
                                        <SortIcon :sort="query.sort" :column="column"></SortIcon>
                                    </template>
                                </th>
                            </slot>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-active">
                            <td v-show="checkbox_rows"></td>
                            <td v-for="(column, key, index) in vbt_columns" :key="index">
                                <Simple v-if="hasFilter(column)" :column="column" @update-filter="updateFilter" @clear-filter="clearFilter"></Simple>
                            </td>
                        </tr>
                        <!-- data rows stars here -->
                        <tr v-for="(row, key, index) in vbt_rows" :key="index" ref="vbt_row" v-bind:style='{"background": (canHighlightHover(row,row_hovered)) ? rowHighlightColor : ""}' @mouseover="rowHovered(row)" @mouseleave="rowHoveredOut()" v-on="rows_selectable ? { click: () => selectCheckboxByRow(row) } : {}">
                            <CheckBox :checkboxRows="checkbox_rows" :selectedItems="selected_items" :rowsSelectable="rows_selectable" :row="row" @add-selected-item="addSelectedItem" @remove-selected-item="removeSelectedItem"></CheckBox>
                            <td v-for="(column, key, hindex) in vbt_columns" :key="hindex" class="text-center">
                                <slot :name="getCellSlotName(column)" :row="row" :column="column" :cell_value="getValueFromRow(row,column.name)">
                                    {{getValueFromRow(row,column.name)}}
                                </slot>
                            </td>
                        </tr>
                        <!-- data rows ends here -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <!-- pagination starts here -->
                <div class="col-md-6">
                    <div v-if="pagination">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" @click.prevent="pageHandler(page-1)">
                                    <a class="page-link" href="" aria-label="Previous">
                                        <span aria-hidden="true">
                                            <slot name="paginataion-previous-button">
                                                &laquo;
                                            </slot>
                                        </span>
                                    </a>
                                </li>
                                <template v-if="!isEmpty">
                                    <li class="page-item" v-if="showLeftDot" @click.prevent="pageHandler(1)">
                                        <a class="page-link" href=""> 1 </a>
                                    </li>
                                    <li class="page-item disabled" v-if="showLeftDot">
                                        <a class="page-link" href="">...</a>
                                    </li>
                                    <li class="page-item" v-for="index in range" :key="index" v-bind:class="{ active:  (index == page)}" @click.prevent="pageHandler(index)">
                                        <a class="page-link" href="">{{index}}</a>
                                    </li>
                                    <li class="page-item disabled" v-if="showRightDot">
                                        <a class="page-link" href="">...</a>
                                    </li>
                                    <li class="page-item" v-if="showRightDot" @click.prevent="pageHandler(totalPages)">
                                        <a class="page-link" href=""> {{totalPages}} </a>
                                    </li>
                                </template>

                                <template v-else>
                                    <li class="page-item disabled">
                                        <a class="page-link" href="">...</a>
                                    </li>
                                </template>
                                <li class="page-item" @click.prevent="pageHandler(page+1)">
                                    <a class="page-link" href="" aria-label="Next">
                                        <span aria-hidden="true">
                                            <slot name="paginataion-next-button">
                                                &raquo;
                                            </slot>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <!-- pagination ends here -->

                <!-- pagination info start here -->
                <div class="col-md-6">
                    <div class="text-right justify-content-center">
                        <template v-if="pagination_info">
                            <slot name="pagination-info" :currentPageRowsLength="currentPageRowsLength" :filteredRowsLength="filteredRowsLength" :originalRowsLength="originalRowsLength">
                                <template v-if="currentPageRowsLength != 0">
                                    From 1 to {{currentPageRowsLength}} of {{filteredRowsLength}} entries
                                </template>
                                <template v-else>
                                    No results found
                                </template>
                                <template>
                                    ({{originalRowsLength}} total records)
                                </template>
                            </slot>
                        </template>
                        <template v-if="pagination_info && (rows_selectable || checkbox_rows)">
                            <slot name="pagination-selected-rows-separator">
                                |
                            </slot>
                        </template>
                        <template v-if="rows_selectable || checkbox_rows">
                            <slot name="rows-selected-info" :selectedItemsCount="selectedItemsCount">
                                {{selectedItemsCount}} rows selected
                            </slot>
                        </template>
                </div>
                </div>
                <!-- pagination info ends here -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import _ from "lodash";

import CheckBox from "./CheckBox.vue";
import SortIcon from "./SortIcon.vue";
import Simple from "./Filters/Simple.vue";

import {
    EventBus
} from '../event-bus.js';

export default {
    name: "VueBootstrap4Table",
    props: {
        rows: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        config: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data: function () {
        return {
            vbt_rows: [],
            vbt_columns: [],
            query: {
                sort: {
                    name: null,
                    order: "asc"
                },
                sort: [],
                filters: []
            },
            page: 1,
            start: (this.page + 0),
            end: 0,
            per_page: 10,
            original_rows: [],
            num_of_visibile_pagination_buttons: 5,
            temp_filtered_results: [],
            pagination: true,
            pagination_info: true,
            checkbox_rows: false,
            selected_items: [],
            highlight_row_hover: false,
            highlight_row_hover_color: "#d6d6d6",
            rows_selectable: false,
            select_all_rows: false,
            row_hovered: null,
            multi_column_sort:false,
            card_title: "",
        };
    },
    mounted() {
        this.vbt_rows = _.cloneDeep(this.rows);
        this.vbt_columns = _.cloneDeep(this.columns);
        let self = this;
        // check if user mentioned unique id for a column, if not set unique id for all items
        this.original_rows = _.map(this.vbt_rows, function (element, index) {
            let extra = {};
            if (!self.hasUniqueId) {
                extra.vbt_id = index + 1;
            }
            return _.extend({}, element, extra);
        });

        this.vbt_columns = _.map(this.vbt_columns, function (element, index) {
            let extra = {};
            extra.vbt_col_id = index + 1;
            return _.extend({}, element, extra);
        });

        this.initConfig();
        this.initialSort();
        this.filter();
        this.paginateFilter();

        // pagination bootstrap - start
        this.end = (this.page + (this.paginationLimit - 1));
        // pagination bootstrap - end

    },
    components: {
        CheckBox,
        Simple,
        SortIcon,
    },
    methods: {
        initConfig() {

            if (_.isEmpty(this.config)) {
                return;
            }

            this.pagination = (_.has(this.config, 'pagination')) ? this.config.pagination : true;

            this.num_of_visibile_pagination_buttons = (_.has(this.config, 'num_of_visibile_pagination_buttons')) ? this.config.num_of_visibile_pagination_buttons : 5;

            this.per_page = (_.has(this.config, 'per_page')) ? this.config.per_page : 10;

            this.checkbox_rows = (_.has(this.config, 'checkbox_rows')) ? this.config.checkbox_rows : false;

            this.highlight_row_hover = (_.has(this.config, 'highlight_row_hover')) ? this.config.highlight_row_hover : false;

            this.highlight_row_hover_color =  (_.has(this.config, 'highlight_row_hover_color')) ? this.config.highlight_row_hover_color : "#d6d6d6";

            this.rows_selectable = (_.has(this.config, 'rows_selectable')) ? this.config.rows_selectable : false;

            this.multi_column_sort = (_.has(this.config, 'multi_column_sort')) ? (this.config.multi_column_sort) : false;

            this.pagination_info = (_.has(this.config, 'pagination_info')) ? this.config.pagination_info : true;

            this.card_title = (_.has(this.config, 'card_title')) ? this.config.card_title : "";
        },

        initialSort() {
            let initial_sort_columns =  _.filter(this.vbt_columns, function(column) { return _.has(column,'initial_sort') });

            _.forEach(initial_sort_columns,function(initial_sort_column,key) {
                let result = _.findIndex(this.query.sort, { 'vbt_col_id': initial_sort_column.vbt_col_id });

                if(result == -1) {
                    // initial sort order validation starts here
                    let initial_sort_order = "asc";
                    if (_.has(initial_sort_column,"initial_sort_order")) {
                        if (_.includes(["asc","desc"], initial_sort_column.initial_sort_order)) {
                            initial_sort_order = initial_sort_column.initial_sort_order;
                        } else {
                            console.log("invalid initial_sort_order, so setting it to default");
                        }
                    }
                    // initial sort order validation ends here
                    this.query.sort.push({
                        vbt_col_id: initial_sort_column.vbt_col_id,
                        name: initial_sort_column.name,
                        order: initial_sort_order,
                    });

                } else {
                    this.query.sort[result].order = initial_sort_column.initial_sort_order;
                }

                // if multicolum sort sort is false, then consider only first initial sort column
                if (!this.multi_column_sort) {
                    return false;
                }
            }.bind(this));
        },

        hasFilter(column) {
            return _.has(column, "filter.type");
        },

        clearFilter(column) {
            let filter_index = this.getFilterIndex(column);
            if (filter_index !== -1) {
                this.query.filters.splice(filter_index, 1);
            }
        },

        getFilterIndex(column) {
            return _.findIndex(this.query.filters, {
                name: column.name
            });
        },

        updateSortQuery(column) {

            let result = _.findIndex(this.query.sort, { 'vbt_col_id': column.vbt_col_id });

            if(result == -1) {

                if (!this.multi_column_sort) {
                    this.query.sort = [];
                }
                this.query.sort.push({
                    vbt_col_id: column.vbt_col_id,
                    name: column.name,
                    order: "desc",
                });

            } else {
                this.query.sort[result].order = this.query.sort[result].order == "asc" ? "desc" : "asc";
            }

            this.sort();
        },
        addSelectedItem(item) {

            this.selected_items.push(item);

            let difference = [];

            if (!_.isEmpty(this.uniqueId)) {
                difference = _.differenceBy(this.temp_filtered_results, this.selected_items, this.uniqueId);
            } else {
                console.log('Unique id not found');
            }

            if (difference.length == 0) {
                this.select_all_rows = true;
                // EventBus.$emit('select-select-all-items-checkbox', "from main");
            } else {
                this.select_all_rows = false;
                // EventBus.$emit('unselect-select-all-items-checkbox', "from main");
            }
        },
        selectAllItems() {

            let difference = [];

            if (!_.isEmpty(this.uniqueId)) {
                difference = _.differenceBy(this.temp_filtered_results, this.selected_items, this.uniqueId);
            } else {
                console.log('Unique id not found');
            }

            this.selected_items.push(...difference);
        },
        unSelectAllItems() {

            let difference = [];

            if (!_.isEmpty(this.uniqueId)) {
                let result = _.intersectionBy(this.temp_filtered_results, this.selected_items, this.uniqueId);
                difference = _.differenceBy(this.selected_items, result, this.uniqueId);
            } else {
                console.log('Unique id not found');
            }

            this.selected_items = difference;
        },
        removeSelectedItem(item) {
            let self = this;
            _.forEach(this.selected_items, function (selected_item, index) {
                if (_.isEqual(item, selected_item)) {
                    self.selected_items.splice(index, 1);
                    return false;
                }
            });
            // EventBus.$emit('unselect-select-all-items-checkbox');
            this.select_all_rows = false;
        },
        updateFilter(payload) {
            let event = payload.event;
            let column = payload.column;
            let filter_index = _.findIndex(this.query.filters, {
                name: column.name
            });
            if (filter_index == -1) {
                if (event.target.value !== "") {
                    this.query.filters.push({
                        type: column.filter.type,
                        name: column.name,
                        text: event.target.value
                    });
                }
            } else {
                if (event.target.value === "") {
                    this.query.filters.splice(filter_index, 1);
                } else {
                    this.query.filters[filter_index].text = event.target.value;
                }
            }
        },

        sort() {

            let names = [];
            let orders = [];

            _.forEach(this.query.sort,function(value,key) {
                names.push(value.name);
                orders.push(value.order);
            });

            this.temp_filtered_results = _.orderBy(
                this.temp_filtered_results, names, orders
            );

            this.paginateFilter();
        },

        filter() {
            let self = this;

            let res = _.filter(this.original_rows, function (row) {
                let flag = true;
                _.forEach(self.query.filters, function (filter, key) {
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
            this.temp_filtered_results = res;
            this.sort();
            this.page = 1;
        },

        simpleFilter(value, filter_text) {
            if (typeof value !== "string") {
                value = value.toString();
            }

            // TODO - configurable lowercase conversion
            return value.toLowerCase().indexOf(filter_text) > -1;
        },

        paginateFilter() {
            if (this.pagination) {
                let start = (this.page - 1) * this.per_page;
                let end = start + this.per_page;
                this.vbt_rows = this.temp_filtered_results.slice(start, end);
            } else {
                this.vbt_rows = _.cloneDeep(this.temp_filtered_results);
            }
        },

        pageHandler(index) {
            if (index >= 1 && index <= this.totalPages) {
                this.page = index;
                // this.$emit('update:page', index);
            }
        },

        selectAllCheckbox() {
            if (this.select_all_rows) {
                this.unSelectAllItems();
                // this.$emit('unselect-all-items');
            } else {
                this.selectAllItems();
                // this.$emit('select-all-items');
            }
            this.select_all_rows = !this.select_all_rows;
        },
        selectAllHandleChange(event) {
            if (event.target.checked) {
                // this.$emit('select-all-items');
                this.selectAllItems();
            } else {
                this.unSelectAllItems();
                // this.$emit('unselect-all-items');
            }
        },

        isSortableColumn(column) {
            if (!_.has(column,'sort')) {
                return false;
            } else {
                return column.sort;
            }
        },
        // row method starts here
        getValueFromRow(row, name) {
            return _.get(row, name);
        },
        getCellSlotName(column) {
            if (_.has(column,"slot_name")) {
                return column.slot_name;
            }
            return column.name.replace('.','_');
        },
        rowHovered(row) {
            this.row_hovered = _.get(row,this.uniqueId);
        },
        rowHoveredOut() {
            this.row_hovered = null;
        },
        canHighlightHover(row,row_hovered) {
            return _.get(row,this.uniqueId) == row_hovered;
        },
        selectCheckboxByRow(row) {
            let result = _.find(this.selected_items, function(selected_item,key){
                return _.get(selected_item,this.uniqueId) == _.get(row,this.uniqueId);
            }.bind(this));

            if (typeof result === "undefined") {
                this.addSelectedItem(row);
            } else {
                this.removeSelectedItem(row);
            }
        },
        // row method ends here
        resetSort() {
            this.query.sort = [];
            this.filter();
        }
    },
    computed: {
        // pagination computed properties -start
        isEmpty() {
            return this.rowCount == 0;
        },
        showLeftDot() {
            return !(_.includes(this.range, 1));
        },
        showRightDot() {
            return !(this.totalPages - this.end <= 0);
        },
        totalPages() {
            return Math.ceil(this.rowCount / this.per_page);
        },
        range() {
            return _.range(this.start, (this.end + 1));
        },
       paginationLimit() {
           if (this.totalPages < this.num_of_visibile_pagination_buttons) {
               return this.totalPages;
            } else {
                return this.num_of_visibile_pagination_buttons;
            }
        },
        // pagination computed properties -end
        rowCount() {
            return this.temp_filtered_results.length;
        },
        selectedItemsCount() {
            return this.selected_items.length;
        },
        filteredResultsCount() {
            return this.temp_filtered_results.length;
        },
        uniqueId() {
            let unique_id = "";

            if (!this.hasUniqueId) {
                unique_id = "vbt_id";
                return unique_id;
            }

            _.forEach(this.vbt_columns, function (column, key) {
                if (_.has(column, 'uniqueId') && column.uniqueId === true) {
                    unique_id = column.name;
                    return false;
                }
            });

            return unique_id;
        },
        hasUniqueId() {
            let has_unique_id = false;

            _.forEach(this.vbt_columns, function (column, key) {
                if (_.has(column, 'uniqueId') && column.uniqueId === true) {
                    has_unique_id = true;
                    return false;
                }
            });

            return has_unique_id;
        },

        // pagination info computed properties - start

        currentPageRowsLength() {
            return this.vbt_rows.length;
        },

        filteredRowsLength() {
            return this.rowCount;
        },

        originalRowsLength() {
            return this.rows.length;
        },

        // pagination info computed properties - end
        rowHighlightColor() {
            return (this.highlight_row_hover) ? this.highlight_row_hover_color : "";
        }

    },
    watch: {
        "query.filters": {
            handler: function (after, before) {
                this.filter();
            },
            deep: true
        },
        per_page: {
            handler: function (newVal, oldVal) {
                this.paginateFilter();
            }
        },
        pagination: {
            handler: function (newVal, oldVal) {
                this.paginateFilter();
            }
        },
        rows: {
            handler: function (newVal, oldVal) {

                this.vbt_rows = _.cloneDeep(this.rows);
                let self = this;

                // check if user mentioned unique id for a column, if not set unique id for all items
                this.original_rows = _.map(this.vbt_rows, function (element, index) {
                    let extra = {};
                    if (!self.hasUniqueId) {
                        extra.vbt_id = index + 1;
                    }
                    return _.extend({}, element, extra);
                });

                this.filter();
            },
            deep: true
        },
        columns: {
            handler: function (newVal, oldVal) {

                this.vbt_columns = _.cloneDeep(this.columns);
                let self = this;

                this.vbt_columns = _.map(this.vbt_columns, function (element, index) {
                    let extra = {};
                    extra.vbt_col_id = index + 1;
                    return _.extend({}, element, extra);
                });

                this.filter();
            },
            deep: true
        },
        config: {
            handler: function (newVal, oldVal) {
                this.initConfig();
            },
            deep: true
        },
        temp_filtered_results: {
            handler: function (newVal, oldVal) {
                if (this.selected_items.length == 0) {
                    // EventBus.$emit('unselect-select-all-items-checkbox');
                    this.select_all_rows = false;

                    return;
                }

                let difference = [];

                if (!_.isEmpty(this.uniqueId)) {
                    difference = _.differenceBy(newVal, this.selected_items, this.uniqueId);
                } else {
                    console.log("unique id not found");
                }

                if (difference.length == 0) {
                    // EventBus.$emit('select-select-all-items-checkbox');
                    this.select_all_rows = true;
                } else {
                    this.select_all_rows = false;
                    // EventBus.$emit('unselect-select-all-items-checkbox');
                }
            },
            deep: true
        },
        page(newVal, oldVal) {
            if (newVal == this.totalPages) {
                this.start = newVal - (this.paginationLimit - 1);
                this.end = newVal;
            } else if (newVal == 1) {
                this.start = newVal;
                this.end = newVal + (this.paginationLimit - 1);
            } else {
                if (newVal > oldVal) {
                    if (this.end - newVal < 1) {
                        this.start += 1;
                        this.end += 1;
                    }
                } else {
                    if (this.start - newVal >= 0) {
                        this.start -= 1;
                        this.end -= 1;
                    }
                }

            }
            this.paginateFilter();
        },
        rowCount(newVal, oldVal) {
            if (this.page == this.totalPages) {
                this.start = this.page - (this.paginationLimit - 1);
                this.end = this.page;
            } else if (this.page == 1) {
                this.start = this.page;
                this.end = this.page + (this.paginationLimit - 1);
            }
        },
        totalPages(newVal, oldVal) {
            if (this.page == this.totalPages) {
                this.start = this.page - (this.paginationLimit - 1);
                this.end = this.page;
            } else if (this.page == 1) {
                this.start = this.page;
                this.end = this.page + (this.paginationLimit - 1);
            }
        },
        'config.multi_column_sort': {
            handler : function(newVal,oldVal) {
                this.resetSort();
            }
        }
    }
};
</script>

<style scoped>
    ul.pagination {
        margin-bottom: 0;
    }
    .vbt-select-all-checkbox {
        margin-bottom: 20px;
    }
    .vbt-sort-cursor {
        cursor: pointer;
    }
    .custom-control-label {
        vertical-align: top;
    }
    .vbt-column-header {
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;          /* Likely future */
    }
</style>


// workflow
// get data(payload)
// clone to origin_rows
// do filter
// do sort
// do paginate
