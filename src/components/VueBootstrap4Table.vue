<template>
<div class="container-fluid">
    <!-- TODO configurable header title position -->
    <div class="card">
        <div class="card-header text-center">Bootsrap 4 advanced table</div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th v-show="checkbox_rows" class="text-center justify-content-center" @click="selectAllCheckbox($event)">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" v-model="select_all_rows" value="" @change="selectAllHandleChange($event)"/>
                                    <label class="custom-control-label"></label>
                                </div>
                            </th>

                            <slot name="columns" :columns="vbt_data.columns">
                                <th v-for="(column, key, index) in vbt_data.columns" :key="index" v-on="isSortableColumn(column) ? { click: () => updateSort(column) } : {}" class="text-center" v-bind:class="{'vbt-sort-cursor':isSortableColumn(column)}">
                                    <slot name="column" :column="column">{{column.label}}</slot>

                                    <template v-if='isSortableColumn(column)'>
                                        <template v-if="!isSort(column)">
                                            <div class="float-right">
                                                <slot name="no-sort-icon">
                                                    &#x1F825;&#x1F827;
                                                </slot>
                                            </div>
                                        </template>

                                        <template v-else>
                                            <template v-if="query.sort.order==='asc'">
                                                <div class="float-right">
                                                    <slot name="sort-asc-icon">
                                                        &#x1F825;
                                                    </slot>
                                                </div>
                                            </template>

                                            <template v-else-if="query.sort.order==='desc'">
                                                <slot name="sort-desc-icon">
                                                    <div class="float-right">&#x1F827;</div>
                                                </slot>
                                            </template>

                                            <template v-else>
                                                <div class="float-right">
                                                    <slot name="no-sort-icon">
                                                        &#x1F825;&#x1F827;
                                                    </slot>
                                                </div>
                                            </template>
                                        </template>
                                    </template>
                                </th>
                            </slot>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-active">
                            <td v-show="checkbox_rows"></td>
                            <td v-for="(column, key, index) in vbt_data.columns" :key="index">
                                <Simple v-if="hasFilter(column)" :column="column" @update-filter="updateFilter" @clear-filter="clearFilter"></Simple>
                            </td>
                        </tr>
                        <!-- data rows stars here -->
                        <tr v-for="(row, key, index) in vbt_data.rows" :key="index" ref="vbt_row" v-bind:style='{"background": (canHighlightHover(row,row_hovered)) ? rowHighlightColor : ""}' @mouseover="rowHovered(row)" @mouseleave="rowHoveredOut(row)" v-on="rows_selectable ? { click: () => selectCheckboxByRow(row) } : {}">
                        <!-- <tr v-for="(row, key, index) in vbt_data.rows" :key="index" ref="vbt_row" v-bind:style='{"background": (row_higlighted) ? rowHighlightColor : ""}' v-on="rowsSelectable ? { click: () => selectCheckbox() } : {}" > -->
                            <CheckBox :checkboxRows="checkbox_rows" :selectedItems="selected_items" :rowsSelectable="rows_selectable" :row="row" @add-selected-item="addSelectedItem" @remove-selected-item="removeSelectedItem"></CheckBox>
                            <td v-for="(column, key, hindex) in vbt_data.columns" :key="hindex" class="text-center">
                                <slot :name="getCellSlotName(column)" :row="row" :column="column" :cell_value="getValueFromRow(row,column.name)">
                                    {{getValueFromRow(row,column.name)}}
                                </slot>
                            </td>
                        </tr>
                        <!-- data rows ends here -->
                        <!-- <Row v-for="(row, key, index) in vbt_data.rows" :key="index" :row="row" :selectedItems="selected_items" :columns="vbt_data.columns" :checkboxRows="checkbox_rows" @add-selected-item="addSelectedItem" @remove-selected-item="removeSelectedItem" :highlight-row-hover="highlight_row_hover" :highlight-row-hover-color="highlight_row_hover_color" :rowsSelectable="rows_selectable"></Row> -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-md-6">
                    <div>
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
                <div class="col-md-6">
                    <div class="text-right justify-content-center">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import _ from "lodash";

import CheckBox from "./CheckBox.vue";
import Simple from "./Filters/Simple.vue";

import {
    EventBus
} from '../event-bus.js';

export default {
    name: "VueBootstrap4Table",
    props: {
        data: {
            type: Object,
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
            vbt_data: {
                rows: [],
                columns: []
            },
            query: {
                sort: {
                    name: null,
                    order: "asc"
                },
                filters: []
            },
            page: 1,
            start: (this.page + 0),
            end: 0,
            per_page: 3,
            original_rows: [],
            pagiantion_limit: 5,
            temp_filtered_results: [],
            pagination: true,
            checkbox_rows: false,
            selected_items: [],
            highlight_row_hover: false,
            highlight_row_hover_color: "#d6d6d6",
            rows_selectable: false,
            select_all_rows: false,
            row_hovered: null
        };
    },
    mounted() {
        this.vbt_data = _.cloneDeep(this.data);
        let self = this;
        // check if user mentioned unique id for a column, if not set unique id for all items
        this.original_rows = _.map(this.vbt_data.rows, function (element, index) {
            let extra = {};
            if (!self.hasUniqueId) {
                extra.vbt_id = index + 1;
            }
            // extra.row_higlighted = false;
            return _.extend({}, element, extra);
        });

        this.initConfig();
        this.filter();
        this.paginateFilter();

        // pagination bootstrap - start
        this.end = (this.page + (this.paginationLimit - 1));
        // pagination bootstrap - end

    },
    components: {
        CheckBox,
        Simple,
    },
    methods: {
        initConfig() {
            if (_.isEmpty(this.config)) {
                return;
            }

            if (this.config.pagination && this.config.pagination == true) {
                this.pagiantion_limit = this.config.num_of_visible_page;
                this.per_page = this.config.per_page;
            } else {
                this.pagination = false;
            }

            if (_.has(this.config, 'checkbox_rows')) {
                this.checkbox_rows = this.config.checkbox_rows;
            }

            if (_.has(this.config, 'highlight_row_hover')) {
                this.highlight_row_hover = this.config.highlight_row_hover;
            }

            if (_.has(this.config, 'highlight_row_hover_color')) {
                this.highlight_row_hover_color = this.config.highlight_row_hover_color;
            }

            if (_.has(this.config, 'rows_selectable')) {
                this.rows_selectable = this.config.rows_selectable;
            }
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

        updateSort(column) {
            if (this.query.sort.name == column.name) {
                this.query.sort.order =
                    this.query.sort.order == "asc" ? "desc" : "asc";
            } else {
                this.query.sort.name = column.name;
                this.query.sort.order = "desc";
            }

            this.refresh();
        },
        addSelectedItem(item) {
            console.log(item);

            this.selected_items.push(item);

            let difference = [];

            if (!_.isEmpty(this.uniqueId)) {
                difference = _.differenceBy(this.temp_filtered_results, this.selected_items, this.uniqueId);
            } else {
                difference = _.differenceWith(this.temp_filtered_results, this.selected_items, _.isEqual);
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
                difference = _.differenceWith(this.temp_filtered_results, this.selected_items, _.isEqual);
            }

            this.selected_items.push(...difference);
        },
        unSelectAllItems() {

            let difference = [];

            if (!_.isEmpty(this.uniqueId)) {
                let result = _.intersectionBy(this.temp_filtered_results, this.selected_items, this.uniqueId);
                difference = _.differenceBy(this.selected_items, result, this.uniqueId);
            } else {
                let result = _.intersectionWith(this.temp_filtered_results, this.selected_items, _.isEqual);
                difference = _.differenceWith(this.selected_items, result, _.isEqual);
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
            // TODO- try multipl column sort

            if (this.query.sort.name == null) {
                this.paginateFilter();
                return;
            }

            this.temp_filtered_results = _.orderBy(
                this.temp_filtered_results, [this.query.sort.name], [this.query.sort.order]
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

        refresh() {
            this.sort();
        },

        paginateFilter() {
            let start = (this.page - 1) * this.per_page;
            let end = start + this.per_page;
            this.vbt_data.rows = this.temp_filtered_results.slice(start, end);
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
        isSort(column) {
            if (this.query.sort.name == null) {
                return false;
            }

            return this.query.sort.name === column.name;
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
        rowHoveredOut(row) {
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
           if (this.totalPages < this.pagiantion_limit) {
               return this.totalPages;
            } else {
                return this.pagiantion_limit;
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

            _.forEach(this.vbt_data.columns, function (column, key) {
                if (_.has(column, 'uniqueId') && column.uniqueId === true) {
                    unique_id = column.name;
                    return false;
                }
            });

            return unique_id;
        },
        hasUniqueId() {
            let has_unique_id = false;

            _.forEach(this.vbt_data.columns, function (column, key) {
                if (_.has(column, 'uniqueId') && column.uniqueId === true) {
                    has_unique_id = true;
                    return false;
                }
            });

            return has_unique_id;
        },

        // pagination info computed properties - start

        currentPageRowsLength() {
            return this.vbt_data.rows.length;
        },

        filteredRowsLength() {
            return this.rowCount;
        },

        originalRowsLength() {
            return this.data.rows.length;
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
        // page: {
        //     handler: function (newVal, oldVal) {
        //         this.paginateFilter();
        //     }
        // },
        per_page: {
            handler: function (newVal, oldVal) {
                this.paginateFilter();
            }
        },
        data: {
            handler: function (newVal, oldVal) {

                this.vbt_data = _.cloneDeep(newVal);
                let self = this;

                // check if user mentioned unique id for a column, if not set unique id for all items
                this.original_rows = _.map(this.vbt_data.rows, function (element, index) {
                    let extra = {};
                    if (!self.hasUniqueId) {
                        extra.vbt_id = index + 1;
                    }
                    // extra.row_higlighted = false;
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
                    difference = _.differenceWith(newVal, this.selected_items, _.isEqual);
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
</style>


// workflow
// get data(payload)
// clone to origin_rows
// do filter
// do sort
// do paginate
