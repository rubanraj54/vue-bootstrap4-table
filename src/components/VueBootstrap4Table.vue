<template>
<div class="container-fluid">
    <!-- TODO configurable header title position -->
    <div :class="{card:card_mode}">
        <div class="card-header text-center" v-if="card_mode">
            {{card_title}}
        </div>
        <div :class="{'card-body':card_mode}">
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr v-if="showToolsRow">
                            <th :colspan="headerColSpan">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class=row>
                                            <!-- global search text starts here -->
                                            <div class="col-md-6 input-group vbt-global-search" v-if="global_search.visibility">
                                                <input ref="global_search" type="text" class="form-control" :placeholder="global_search.placeholder" @keyup.stop="updateGlobalSearch($event)" value="">
                                                <div class="input-group-append vbt-global-search-clear" @click="clearGlobalSearch">
                                                    <span class="input-group-text">
                                                        <slot name="clear-global-search-icon">
                                                            &#x24E7;
                                                        </slot>
                                                    </span>
                                                </div>
                                            </div>
                                            <!-- global search text ends here -->

                                            <!-- refresh & reset button starts here -->
                                            <div class="col-md-6">
                                                <div class="btn-group" role="group" aria-label="Table Actions buttons">
                                                    <button v-if="show_refresh_button" type="button" class="btn btn-secondary vbt-refresh-button" @click="$emit('refresh-data')">
                                                        <slot name="refresh-button-text">
                                                            Refresh
                                                        </slot>
                                                    </button>
                                                    <button type="button" v-if="show_reset_button" class="btn btn-secondary vbt-reset-button" @click="resetQuery">
                                                        <slot name="reset-button-text">
                                                            Reset Query
                                                        </slot>
                                                    </button>
                                                </div>
                                            </div>
                                            <!-- refresh & reset button ends here -->
                                        </div>
                                    </div>

                                    <!-- action buttons starts here -->
                                    <div class="col-md-8">
                                        <div class="btn-group float-right" role="group" aria-label="Basic example">
                                            <button v-for="(action, key, index) in actions" :key="index" type="button" class="btn btn-secondary" @click="$emit(action.event_name,action.event_payload)">
                                                {{action.btn_text}}
                                            </button>
                                        </div>
                                    </div>
                                    <!-- action buttons button ends here -->

                                </div>
                                <!-- <a href="" v-if="allRowsSelected">sadfsdf</a> -->
                            </th>
                        </tr>

                        <tr>
                            <select-all-rows-check-box v-if="checkbox_rows"
                                                        :all-rows-selected="allRowsSelected"
                                                        :current-page-selection-count="currentPageSelectionCount"
                                                        @select-all-row-checkbox="selectAllCheckbox"/>

                            <slot name="columns" :columns="vbt_columns">
                                <th v-for="(column, key, index) in vbt_columns" :key="index" v-on="isSortableColumn(column) ? { click: () => updateSortQuery(column) } : {}" class="vbt-column-header" :class="columnClasses(column)">
                                    <slot :name="'column_' + getCellSlotName(column)" :column="column">
                                        {{column.label}}
                                    </slot>

                                    <template v-if='isSortableColumn(column)'>
                                        <SortIcon :sort="query.sort" :column="column">
                                                <template slot="vbt-sort-asc-icon">
                                                    <slot name="sort-asc-icon">
                                                            &#x1F825;
                                                    </slot>
                                                </template>
                                                <template slot="vbt-sort-desc-icon">
                                                    <slot name="sort-desc-icon">
                                                            &#x1F827;
                                                    </slot>
                                                </template>
                                                <template slot="vbt-no-sort-icon">
                                                    <slot name="no-sort-icon">
                                                            &#x1F825;&#x1F827;
                                                    </slot>
                                                </template>
                                        </SortIcon>
                                    </template>
                                </th>
                            </slot>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- filter row starts here -->
                        <tr class="table-active" v-if="showFilterRow">
                            <td v-show="checkbox_rows"></td>
                            <td v-for="(column, key, index) in vbt_columns" :key="index" align="center">
                                <template v-if="hasFilter(column)">
                                    <Simple v-if="column.filter.type == 'simple'" :column="column" @update-filter="updateFilter" @clear-filter="clearFilter"></Simple>
                                    <MultiSelect v-if="column.filter.type == 'select'" :options="column.filter.options" :column="column" @update-multi-select-filter="updateMultiSelectFilter" @clear-filter="clearFilter"></MultiSelect>
                                </template>
                            </td>
                        </tr>
                        <!-- filter row ends here -->

                        <!-- data rows stars here -->
                        <row v-for="(row, index) in vbt_rows" :key="index"
                                                              :row="row"
                                                              :columns="vbt_columns"
                                                              :row-index="index"
                                                              :checkbox-rows="checkbox_rows"
                                                              :rows-selectable="rows_selectable"
                                                              :selected-items="selected_items"
                                                              :highlight-row-hover="highlight_row_hover"
                                                              :highlight-row-hover-color="rowHighlightColor"
                                                              @add-row="handleAddRow"
                                                              @remove-row="handleRemoveRow">
                            <template v-for="(column) in columns" :slot="'vbt-'+getCellSlotName(column)">
                                <slot :name="getCellSlotName(column)" :row="row" :column="column" :cell_value="getValueFromRow(row,column.name)">
                                     {{getValueFromRow(row,column.name)}}
                                </slot>
                            </template>
                        </row>
                        <!-- data rows ends here -->

                        <!-- Pagination row starts here -->
                        <tr v-if="showPaginationRow" class="footer-pagination-row">
                            <td :colspan="headerColSpan">
                                <div class="row">
                                    <!-- pagination starts here -->
                                    <div class="col-md-8">
                                        <div v-if="pagination">
                                            <Pagination :page.sync="page" :per_page.sync="per_page" :per_page_options="per_page_options" :total="rowCount" :num_of_visibile_pagination_buttons="num_of_visibile_pagination_buttons">
                                                <template slot="vbt-paginataion-previous-button">
                                                    <slot name="paginataion-previous-button">
                                                        &laquo;
                                                    </slot>
                                                </template>
                                                <template slot="vbt-paginataion-next-button">
                                                    <slot name="paginataion-next-button">
                                                        &raquo;
                                                    </slot>
                                                </template>
                                            </Pagination>
                                        </div>
                                    </div>
                                    <!-- pagination ends here -->

                                    <!-- pagination info start here -->
                                    <div class="col-md-4">
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
                                            <template v-if="selected_rows_info && pagination_info && (checkbox_rows || rows_selectable)">
                                                <slot name="pagination-selected-rows-separator">
                                                    |
                                                </slot>
                                            </template>
                                            <template v-if="selected_rows_info && (checkbox_rows || rows_selectable)">
                                                <slot name="selected-rows-info" :selectedItemsCount="selectedItemsCount">
                                                    {{selectedItemsCount}} rows selected
                                                </slot>
                                            </template>
                                        </div>
                                    </div>
                                    <!-- pagination info ends here -->
                                </div>
                            </td>
                        </tr>
                        <!-- Pagination ends starts here -->

                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer" v-if="card_mode">
            <div class="row">
                <!-- pagination starts here -->
                <div class="col-md-6">
                    <div v-if="pagination">
                        <Pagination :page.sync="page" :per_page.sync="per_page" :per_page_options="per_page_options" :total="rowCount" :num_of_visibile_pagination_buttons="num_of_visibile_pagination_buttons">
                            <template slot="vbt-paginataion-previous-button">
                                <slot name="paginataion-previous-button">
                                    &laquo;
                                </slot>
                            </template>
                            <template slot="vbt-paginataion-next-button">
                                <slot name="paginataion-next-button">
                                    &raquo;
                                </slot>
                            </template>
                        </Pagination>
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
                        <template v-if="pagination_info && selected_rows_info">
                            <slot name="pagination-selected-rows-separator">
                                |
                            </slot>
                        </template>
                        <template v-if="selected_rows_info">
                            <slot name="selected-rows-info" :selectedItemsCount="selectedItemsCount">
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
import findIndex from "lodash/findIndex";
import range from "lodash/range";
import filter from "lodash/filter";
import includes from "lodash/includes";
import map from "lodash/map";
import join from "lodash/join";
import has from "lodash/has";
import extend from "lodash/extend";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import differenceWith from "lodash/differenceWith";
import differenceBy from "lodash/differenceBy";
import intersectionWith from "lodash/intersectionWith";
import intersectionBy from "lodash/intersectionBy";
import orderBy from "lodash/orderBy";
import get from "lodash/get";
import omit from "lodash/omit";
import clone from "lodash/clone";

import Row from "./Row.vue";
import CheckBox from "./CheckBox.vue";
import SelectAllRowsCheckBox from "./SelectAllRowsCheckBox.vue";
import SortIcon from "./SortIcon.vue";
import Pagination from "./Pagination.vue";
import Simple from "./Filters/Simple.vue";
import MultiSelect from "./Filters/MultiSelect.vue";

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
        totalRows: {
            type: Number,
            default: 0
        },
        config: {
            type: Object,
            default: function () {
                return {};
            }
        },
        actions: {
            type: Array,
            default: function () {
                return [];
            }
        },
    },
    data: function () {
        return {
            vbt_rows: [],
            vbt_columns: [],
            query: {
                sort: [],
                filters: [],
                global_search: ""
            },
            page: 1,
            per_page: 10,
            original_rows: [],
            num_of_visibile_pagination_buttons: 5,
            temp_filtered_results: [],
            pagination: true,
            pagination_info: true,
            checkbox_rows: false,
            selected_items: [],
            highlight_row_hover: true,
            highlight_row_hover_color: "#d6d6d6",
            rows_selectable: false,
            allRowsSelected: false,
            multi_column_sort:false,
            card_title: "",
            global_search: {
                placeholder: "Enter search text",
                visibility: true,
                case_sensitive: false
            },
            per_page_options : [5,10,15],
            show_refresh_button: true,
            show_reset_button: true,
            server_mode: false,
            total_rows: 0,
            card_mode: true,
            selected_rows_info: false,
            lastSelectedItemIndex: null
        };
    },
    mounted() {
        this.vbt_rows = cloneDeep(this.rows);
        this.vbt_columns = cloneDeep(this.columns);
        let self = this;
        // check if user mentioned unique id for a column, if not set unique id for all items
        this.original_rows = map(this.vbt_rows, function (element, index) {
            let extra = {};
            if (!self.hasUniqueId) {
                extra.vbt_id = index + 1;
            }
            return extend({}, element, extra);
        });

        this.vbt_columns = map(this.vbt_columns, function (element, index) {
            let extra = {};
            extra.vbt_col_id = index + 1;
            return extend({}, element, extra);
        });

        this.initConfig();
        this.initialSort();
        this.filter();
        this.paginateFilter();
        this.handleShiftKey();

    },
    components: {
        Row,
        CheckBox,
        SelectAllRowsCheckBox,
        Simple,
        MultiSelect,
        SortIcon,
        Pagination,
    },
    methods: {
        initConfig() {

            if (isEmpty(this.config)) {
                return;
            }

            this.pagination = (has(this.config, 'pagination')) ? this.config.pagination : true;

            this.num_of_visibile_pagination_buttons = (has(this.config, 'num_of_visibile_pagination_buttons')) ? this.config.num_of_visibile_pagination_buttons : 5;

            this.per_page_options = (has(this.config, 'per_page_options')) ? this.config.per_page_options : [5,10,15];

            this.per_page = (has(this.config, 'per_page')) ? this.config.per_page : 10;

            this.checkbox_rows = (has(this.config, 'checkbox_rows')) ? this.config.checkbox_rows : false;

            this.highlight_row_hover = (has(this.config, 'highlight_row_hover')) ? this.config.highlight_row_hover : true;

            this.highlight_row_hover_color =  (has(this.config, 'highlight_row_hover_color')) ? this.config.highlight_row_hover_color : "#d6d6d6";

            this.rows_selectable = (has(this.config, 'rows_selectable')) ? this.config.rows_selectable : false;

            this.multi_column_sort = (has(this.config, 'multi_column_sort')) ? (this.config.multi_column_sort) : false;

            this.pagination_info = (has(this.config, 'pagination_info')) ? this.config.pagination_info : true;

            this.card_title = (has(this.config, 'card_title')) ? this.config.card_title : "";

            if (has(this.config, 'global_search')) {
                this.global_search.placeholder = (has(this.config.global_search, 'placeholder')) ? this.config.global_search.placeholder : "Enter search text";
                this.global_search.visibility = (has(this.config.global_search, 'visibility')) ? this.config.global_search.visibility : true;
                this.global_search.case_sensitive = (has(this.config.global_search, 'case_sensitive')) ? this.config.global_search.case_sensitive : false;
            }

            this.show_refresh_button = (has(this.config, 'show_refresh_button')) ? (this.config.show_refresh_button) : true;

            this.show_reset_button = (has(this.config, 'show_reset_button')) ? (this.config.show_reset_button) : true;

            this.server_mode = (has(this.config, 'server_mode')) ? (this.config.server_mode) : false;

            this.card_mode = (has(this.config, 'card_mode')) ? (this.config.card_mode) : true;

            this.selected_rows_info = (has(this.config, 'card_mode')) ? (this.config.selected_rows_info) : false;

        },

        initialSort() {
            // TODO optimze this with removing this filter
            let initial_sort_columns =  filter(this.vbt_columns, function(column) { return has(column,'initial_sort') && column.initial_sort == true });

            initial_sort_columns.some(initial_sort_column => {
                let result = findIndex(this.query.sort, { 'vbt_col_id': initial_sort_column.vbt_col_id });

                if(result == -1) {
                    // initial sort order validation starts here
                    let initial_sort_order = "asc";
                    if (has(initial_sort_column,"initial_sort_order")) {
                        if (includes(["asc","desc"], initial_sort_column.initial_sort_order)) {
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
                    return true;
                }
            });
        },

        hasFilter(column) {
            return has(column, "filter.type");
        },

        clearFilter(column) {
            let filter_index = this.getFilterIndex(column);
            if (filter_index !== -1) {
                this.query.filters.splice(filter_index, 1);
            }
        },

        getFilterIndex(column) {
            return findIndex(this.query.filters, {
                name: column.name
            });
        },

        updateSortQuery(column) {

            let result = findIndex(this.query.sort, { 'vbt_col_id': column.vbt_col_id });

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
            if (!this.server_mode) {
                this.sort();
            }
        },
        isShiftSelection(shiftKey,rowIndex){
            return (shiftKey == true) && (this.lastSelectedItemIndex != null) && (this.lastSelectedItemIndex != rowIndex);
        },
        handleAddRow(payload) {
            let row = this.vbt_rows[payload.rowIndex];
            if (this.isShiftSelection(payload.shiftKey,payload.rowIndex)) {
                let rows = this.getShiftSelectionRows(payload.rowIndex);
                rows.forEach((_row) => {this.addSelectedItem(_row)});
            } else {
                this.addSelectedItem(row);
            }

            this.$emit('on-select-row', {"selected_items":cloneDeep(this.selected_items) ,"selected_item":row});

            let difference = [];

            if (this.server_mode && !this.hasUniqueId) {
                difference = differenceWith(this.vbt_rows, this.selected_items, isEqual);
            } else {
                difference = differenceBy(this.vbt_rows, this.selected_items, this.uniqueId);
            }

            if (difference.length == 0) {
                this.allRowsSelected = true;
                // EventBus.$emit('select-select-all-items-checkbox', "from main");
            } else {
                this.allRowsSelected = false;
                // EventBus.$emit('unselect-select-all-items-checkbox', "from main");
            }

            this.lastSelectedItemIndex = payload.rowIndex;
        },
        handleRemoveRow(payload) {
            let row = this.vbt_rows[payload.rowIndex];
            if (this.isShiftSelection(payload.shiftKey,payload.rowIndex)) {
                let rows = this.getShiftSelectionRows(payload.rowIndex);
                rows.forEach((_row) => {this.removeSelectedItem(_row)});
            } else {
                this.removeSelectedItem(row);
            }
            this.$emit('on-unselect-row', {"selected_items":cloneDeep(this.selected_items),"unselected_item":row});
            // EventBus.$emit('unselect-select-all-items-checkbox');
            this.allRowsSelected = false;
            this.lastSelectedItemIndex = payload.rowIndex;
        },
        addSelectedItem(item) {

            let index = -1;
            if (this.server_mode && !this.hasUniqueId) {
                index = findIndex(this.selected_items, (selected_item) => {return isEqual(selected_item, item)});
            } else {
                index = findIndex(this.selected_items, (selected_item) => {return selected_item[this.uniqueId] == item[this.uniqueId]});
            }

            if (index == -1) {
                this.selected_items.push(item);
            }
        },
        selectAllItems() {

            let difference = [];

            if (this.server_mode && !this.hasUniqueId) {
                difference = differenceWith(this.vbt_rows, this.selected_items, isEqual);
            } else {
                difference = differenceBy(this.vbt_rows, this.selected_items, this.uniqueId);
            }

            this.selected_items.push(...difference);

            this.$emit('on-all-select-rows', {"selected_items":cloneDeep(this.selected_items) });

        },
        unSelectAllItems() {

            let difference = [];

            if (this.server_mode && !this.hasUniqueId) {
                let result = intersectionWith(this.vbt_rows, this.selected_items, isEqual);
                difference = differenceWith(this.selected_items, result, isEqual);
            } else {
                let result = intersectionBy(this.vbt_rows, this.selected_items, this.uniqueId);
                difference = differenceBy(this.selected_items, result, this.uniqueId);
            }

            this.selected_items = difference;

            this.$emit('on-all-unselect-rows', {"selected_items":cloneDeep(this.selected_items)});

        },
        removeSelectedItem(item) {
            // TODO try with findbyId function
            this.selected_items.some((selected_item,index) => {
                if (isEqual(item, selected_item)) {
                    this.selected_items.splice(index, 1);
                    return true;
                }
            });
        },
        getShiftSelectionRows(rowIndex) {
            let start = 0;
            let end = 0;
            if (this.lastSelectedItemIndex < rowIndex) {
                start = this.lastSelectedItemIndex;
                end = rowIndex + 1;
            } else if (this.lastSelectedItemIndex > rowIndex) {
                start = rowIndex;
                end = this.lastSelectedItemIndex + 1;
            }
            return this.vbt_rows.slice(start,end);
        },
        updateFilter(payload) {
            let event = payload.event;
            let column = payload.column;
            let filter_index = findIndex(this.query.filters, {
                name: column.name
            });
            if (filter_index == -1) {
                if (event.target.value !== "") {
                    this.query.filters.push({
                        type: column.filter.type,
                        name: column.name,
                        text: event.target.value,
                        config: column.filter
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
        updateMultiSelectFilter(payload) {
            let selected_options = payload.selected_options;
            let column = payload.column;


            let filter_index = findIndex(this.query.filters, {
                name: column.name
            });

            if (filter_index == -1) {
                if (selected_options.length === 0) {
                    return;
                }
                this.query.filters.push({
                    type: column.filter.type,
                    name: column.name,
                    selected_options: selected_options,
                    config: column.filter
                });
            } else {
                if (selected_options.length === 0) {
                    this.query.filters.splice(filter_index, 1);
                } else {
                    this.query.filters[filter_index].selected_options = selected_options;
                }
            }
        },

        sort() {

            let names = [];
            let orders = [];

            this.query.sort.forEach((value,key) => {
                names.push(value.name);
                orders.push(value.order);
            });

            this.temp_filtered_results = orderBy(
                this.temp_filtered_results, names, orders
            );

            this.paginateFilter();
        },

        filter() {
            let res = filter(this.original_rows, (row) => {
                let flag = true;
                this.query.filters.some((filter, key) => {
                    if (filter.type === "simple") {
                        if (filter.text === "") {
                            flag = true;
                            return true;
                        }
                        if (this.simpleFilter(get(row, filter.name), filter.text,filter.config)) {
                            flag = true;
                        } else {
                            flag = false;
                            return true;
                        }
                    } else if (filter.type === "select") {
                        if (this.multiSelectFilter(get(row, filter.name), filter.selected_options,filter.config)) {
                            flag = true;
                        } else {
                            flag = false;
                            return true;
                        }
                    }
                });
                return flag;
            });

            this.temp_filtered_results = res;

            // Do global search only if global search text is not empty and
            // filtered results is also not empty
            if (this.query.global_search !== "" && this.rowCount != 0 ) {
                this.temp_filtered_results = this.globalSearch(this.temp_filtered_results);
            }

            this.sort();
            this.page = 1;
        },

        globalSearch(temp_filtered_results) {
            let global_search_results = filter(temp_filtered_results, (row) =>{

                let flag = false;

                this.vbt_columns.some((vbt_column, key) => {
                    let value = get(row, vbt_column.name);
                    let global_search_text = this.query.global_search;

                    if (value == null || typeof value === "undefined") {
                        value =  "";
                    }

                    if (typeof value !== "string") {
                        value = value.toString();
                    }

                    if (typeof global_search_text !== "string") {
                        global_search_text = global_search_text.toString();
                    }

                    if (!this.global_search.case_sensitive) {
                        value = value.toLowerCase();
                        global_search_text = global_search_text.toLowerCase();
                    }

                    if (value.indexOf(global_search_text) > -1) {
                        flag = true;
                        return;
                    }

                });

                return flag;
            });

            return global_search_results;
        },

        simpleFilter(value, filter_text,config) {

            if (typeof value !== "string") {
                value = value.toString();
            }

            if (typeof filter_text !== "string") {
                value = filter_text.toString();
            }

            let is_case_sensitive = (has(config,'case_sensitive')) ? config.case_sensitive : false;

            if (!is_case_sensitive) {
                value = value.toLowerCase();
                filter_text = filter_text.toLowerCase();
            }

            return value.indexOf(filter_text) > -1;
        },
        multiSelectFilter(value, selected_options,config) {

            if (typeof value !== "string") {
                value = value.toString().toLowerCase();
            } else {
                value = value.toLowerCase();
            }

            selected_options = map(selected_options, (option) => {
                                    return (typeof option !== "string") ? option.toString().toLowerCase() : option.toLowerCase();
                                });
            return includes(selected_options, value);
            // let is_case_sensitive = (has(config,'case_sensitive')) ? config.case_sensitive : false;

            // if (!is_case_sensitive) {
            //     value = value.toLowerCase();
            //     filter_text = filter_text.toLowerCase();
            // }

            // return value.indexOf(filter_text) > -1;
        },

        paginateFilter() {

            if (this.pagination) {
                let start = (this.page - 1) * this.per_page;
                let end = start + this.per_page;
                if (!this.server_mode) {
                    this.vbt_rows = this.temp_filtered_results.slice(start, end);
                } else {
                    this.emitQueryParams();
                    // this.$emit('on-change-query',cloneDeep(this.query));
                }
            } else {
                if (!this.server_mode) {
                    this.vbt_rows = cloneDeep(this.temp_filtered_results);
                } else {
                    this.emitQueryParams();
                    // this.$emit('on-change-query',cloneDeep(this.query));
                }
            }
        },

        selectAllCheckbox() {
            if (this.allRowsSelected || this.currentPageSelectionCount > 0) {
                this.unSelectAllItems();
                this.allRowsSelected = false;
            } else {
                this.selectAllItems();
                this.allRowsSelected = true;
            }
        },

        isSortableColumn(column) {
            if (!has(column,'sort')) {
                return false;
            } else {
                return column.sort;
            }
        },
        // row method starts here
        getValueFromRow(row, name) {
            return get(row, name);
        },
        getCellSlotName(column) {
            if (has(column,"slot_name")) {
                return column.slot_name;
            }
            return column.name.replace('.','_');
        },
        // row method ends here
        resetSort() {
            this.query.sort = [];
            this.filter();
        },

        updateGlobalSearch: debounce(function(event) {
            this.query.global_search = event.target.value;
        }, 60),

        clearGlobalSearch() {
            this.query.global_search = "";
            this.$refs.global_search.value = "";
        },

        resetQuery() {

            this.query = {
                sort: [],
                filters: [],
                global_search: ""
            }

            this.$refs.global_search.value = "";
            EventBus.$emit('reset-query');

        },

        emitQueryParams() {
            if (this.server_mode) {
                let queryParams = cloneDeep(this.query);
                let sort = map(queryParams.sort, o => omit(o, 'vbt_col_id'));
                let filters = map(queryParams.filters, o => omit(o, 'config'));
                let global_search = queryParams.global_search;
                let per_page = clone(this.per_page);
                let page = clone(this.page);

                let payload = {
                    sort : sort,
                    filters : filters,
                    global_search : global_search,
                    per_page : per_page,
                    page: page
                }

                this.$emit('on-change-query',payload);
            }
        },
        columnClasses(column) {
            let classes = "";

            let default_text_alignment = "text-center";

            //decide text alignment class - starts here
            let alignments = ["text-justify","text-right","text-left","text-center"];
            if (has(column, "column_text_alignment") && includes(alignments, column.column_text_alignment)) {
                classes = classes + " " + column.column_text_alignment;
            } else {
                classes = classes + " " + default_text_alignment;
            }
            //decide text alignment class - ends here

            // adding user defined classes to rows - starts here
            if (has(column, "column_classes")) {
                classes = classes + " " + column.column_classes;
            }
            // adding user defined classes to rows - ends here

            // adding classes for sortable column - starts here
            if (this.isSortableColumn(column)) {
                classes = classes + " vbt-sort-cursor";
            }
            // adding classes for sortable column - ends here

            return classes;
        },

        handleShiftKey() {
            ["keyup","keydown"].forEach((event) => {
                window.addEventListener(event, (e) => {
                    document.onselectstart = function() {
                        return !(e.key == "Shift" && e.shiftKey == true);
                    }
                });
            });
        }
    },
    computed: {
        rowCount() {
            if (!this.server_mode) {
                return this.temp_filtered_results.length;
            } else {
                return this.totalRows;
            }
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
            this.vbt_columns.some((column, key) => {
                if (has(column, 'uniqueId') && column.uniqueId === true) {
                    unique_id = column.name;
                    return true;
                }
            });

            return unique_id;
        },
        hasUniqueId() {
            let has_unique_id = false;

            this.vbt_columns.some((column, key) => {
                if (has(column, 'uniqueId') && column.uniqueId === true) {
                    has_unique_id = true;
                    return true;
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
            return (this.server_mode)? this.rowCount : this.rows.length;
        },

        // pagination info computed properties - end
        rowHighlightColor() {
            return (this.highlight_row_hover) ? this.highlight_row_hover_color : "";
        },

        headerColSpan() {
            let count = (this.checkbox_rows) ? 1 : 0;

            count += this.vbt_columns.length;

            return count;
        },

        showToolsRow() {
            return (this.global_search.visibility == true || this.show_refresh_button == true || this.show_reset_button == true || this.actions.length > 0);
        },

        showFilterRow() {
            let show_row = false;

            this.columns.some((column,key) => {
                if (has(column, "filter")) {
                    show_row = true;
                    return true;
                }
            })
            return show_row;
        },

        showPaginationRow() {
            let show_pagination_row = false;

            if (this.card_mode == false && (this.pagination == true || this.pagination_info == true || this.selected_rows_info == true)) {
                show_pagination_row = true;
            }

            return show_pagination_row;
        },

        currentPageSelectionCount() {
            let result = [];
            if (this.server_mode && !this.hasUniqueId) {
                result = intersectionWith(this.vbt_rows, this.selected_items, isEqual);
            } else {
                result = intersectionBy(this.vbt_rows, this.selected_items, this.uniqueId);
            }
            return result.length;
        }

    },
    watch: {
        "query.filters": {
            handler: function (after, before) {
                if (!this.server_mode) {
                    this.filter();
                }
            },
            deep: true
        },
        "query.global_search": {
            handler: function (newVal, oldVal) {
                if (!this.server_mode) {
                    this.filter();
                }
            }
        },
        "query": {
            handler: function (newVal, oldVal) {
                if (this.server_mode) {
                    this.emitQueryParams();
                }
            },
            deep: true
        },
        per_page: {
            handler: function (newVal, oldVal) {
                if (!this.server_mode) {
                    this.page = 1;
                    this.paginateFilter();
                }
            }
        },
        pagination: {
            handler: function (newVal, oldVal) {
                if (!this.server_mode) {
                    this.paginateFilter();
                }
            }
        },
        rows: {
            handler: function (newVal, oldVal) {

                this.vbt_rows = cloneDeep(this.rows);

                if (!this.server_mode) {
                    // check if user mentioned unique id for a column, if not set unique id for all items
                    let self = this;
                    this.original_rows = map(this.vbt_rows, function (element, index) {
                        let extra = {};
                        if (!self.hasUniqueId) {
                            extra.vbt_id = index + 1;
                        }
                        return extend({}, element, extra);
                    });
                    this.filter();
                }

            },
            deep: true
        },
        columns: {
            handler: function (newVal, oldVal) {

                this.vbt_columns = cloneDeep(this.columns);

                this.vbt_columns = map(this.vbt_columns, function (element, index) {
                    let extra = {};
                    extra.vbt_col_id = index + 1;
                    return extend({}, element, extra);
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

        vbt_rows: {
            handler: function (newVal, oldVal) {
                // resetting the shift mode
                this.lastSelectedItemIndex = null;

                if (this.selected_items.length == 0) {
                    // EventBus.$emit('unselect-select-all-items-checkbox');
                    this.allRowsSelected = false;
                    return;
                }

                let difference = [];

                if (this.server_mode && !this.hasUniqueId) {
                    difference = differenceWith(newVal, this.selected_items, isEqual);
                } else {
                    difference = differenceBy(newVal, this.selected_items, this.uniqueId);
                }

                if (difference.length == 0) {
                    // EventBus.$emit('select-select-all-items-checkbox');
                    this.allRowsSelected = true;
                } else {
                    this.allRowsSelected = false;
                    // EventBus.$emit('unselect-select-all-items-checkbox');
                }

            },
            deep: true
        },

        page(newVal, oldVal) {
            this.paginateFilter();
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
    .input-group-append.vbt-global-search-clear {
        cursor: pointer;
    }
</style>


// workflow - server
// get data(payload)
// clone to origin_rows
// do filter
// do global search
// do sort
// do paginate
