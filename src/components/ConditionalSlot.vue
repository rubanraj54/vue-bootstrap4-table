<template>
    <div :class="root_class">
        
        <template v-for="column in $parent.boxes[position]">
            <div :class="column.class">

                <template v-for="slot in column.contents">
                    <slot :name="slot">

                        <!-- pagination starts here -->
                        <div v-if="$parent.pagination && slot == 'pagination'">

                            <Pagination 
                                :page.sync="$parent.page" 
                                :per_page.sync="$parent.per_page" 
                                :per_page_desc="$parent.per_page_desc" 
                                :per_page_options="$parent.per_page_options" 
                                :total="$parent.rowCount" 
                                :num_of_visibile_pagination_buttons="$parent.num_of_visibile_pagination_buttons">
                                <template slot="vbt-paginataion-previous-button">
                                    <slot name="pagination-previous-button">
                                        &laquo;
                                    </slot>
                                </template>
                                <template slot="vbt-paginataion-next-button">
                                    <slot name="pagination-next-button">
                                        &raquo;
                                    </slot>
                                </template>
                            </Pagination>
                        </div>
                        <!-- pagination ends here -->

                        <!-- pagination info start here -->
                        <template v-if="$parent.pagination_info && slot == 'pagination_info'">
                            <slot 
                                name="pagination_info" 
                                :currentPageRowsLength="$parent.currentPageRowsLength" 
                                :filteredRowsLength="$parent.filteredRowsLength" 
                                :originalRowsLength="$parent.originalRowsLength">
                                <template v-if="$parent.currentPageRowsLength != 0">
                                    From 1 to {{$parent.currentPageRowsLength}} of {{$parent.filteredRowsLength}} entries
                                </template>
                                <template v-else>
                                    No results found
                                </template>
                                <template>
                                    ({{ $parent.originalRowsLength }} total records)
                                </template>
                            </slot>
                        </template>
                        <!-- pagination info ends here -->

                        <!-- selected rows info starts here -->
                        <template v-if="$parent.selected_rows_info && $parent.isSelectable && slot == 'selected_rows_info'">
                            <slot name="selected-rows-info" :selectedItemsCount="$parent.selectedItemsCount">
                                {{ $parent.selectedItemsCount }} rows selected1
                            </slot>
                        </template>
                        <!-- selected rows info ends here -->

                        <!-- action buttons starts here -->
                        <div class="btn-group float-right" role="group" aria-label="Basic example" v-if="slot == 'vbt-action-buttons'">
                            <button v-for="(action, key, index) in $parent.actions"
                                    :key="index" type="button" class="btn"
                                    :class="$parent.getActionButtonClass(action)"
                                    @click="$parent.emitActionEvent(action)">
                                    <slot :name="action.btn_text_slot_name">
                                        <span v-html="action.btn_text"></span>
                                    </slot>
                            </button>
                        </div>
                        <!-- action buttons button ends here -->

                        <!-- global search text starts here -->
                        <div v-if="$parent.global_search.visibility && slot == 'global_search'" class="global-search-wrapper">
                            <div class="input-group vbt-global-search">
                              <div class="form-group has-clear-right" :class="$parent.global_search.class">
                                <span v-if="$parent.global_search.showClearButton" class="form-control-feedback vbt-global-search-clear" @click="clearGlobalSearch">
                                    <slot name="global-search-clear-icon">
                                        &#x24E7;
                                    </slot>
                                </span>
                                <input v-if="$parent.global_search.searchOnPressEnter" ref="global_search" type="text" class="form-control" :placeholder="$parent.global_search.placeholder" @keyup.enter="updateGlobalSearchHandler($event.target.value)">
                                <input v-else ref="global_search" type="text" class="form-control" :placeholder="$parent.global_search.placeholder" @keyup.stop="updateGlobalSearch($event.target.value)">
                            </div>
                            </div>
                        </div>
                        <!-- global search text ends here -->


                        <!-- refresh & reset button starts here -->
                        <div class="btn-group refresh-reset-buttons-wrapper" role="group" aria-label="Table Actions buttons" v-if="slot == 'refresh_reset_buttons'">
                            <button v-if="$parent.show_refresh_button" type="button" class="btn btn-secondary vbt-refresh-button" @click="$emit('refresh-data')">
                                <slot name="refresh-button-text">
                                    Refresh
                                </slot>
                            </button>
                            <button type="button" v-if="$parent.show_reset_button" class="btn btn-secondary vbt-reset-button" @click="resetQuery">
                                <slot name="reset-button-text">
                                    Reset Query
                                </slot>
                            </button>
                        </div>
                        <!-- refresh & reset button ends here -->
                    </slot>
                </template>
            </div>
        </template>
        
    </div>
</template>

<script>
import debounce from "lodash/debounce";
import Pagination from "./Pagination.vue";

export default{
    name: 'ConditionalSlot',
    props: {
        position: {
            type: String
        }
    },
    components: {
        Pagination
    },
    computed:{
        root_class(){
            if(this.position == 'bottom' && this.$parent.card_mode){
                return 'row align-items-center'
            } else if(this.position == 'bottom' && !this.$parent.card_mode){
                return 'row vbt-pagination-row no-gutters'
            } else if(this.position == 'top'){
                return 'row vbt-header-row no-gutters'
            }
        },
        updateGlobalSearch() {
            return debounce(this.updateGlobalSearchHandler, this.$parent.global_search.searchDebounceRate);
        },
    },
    mounted(){
        if (this.$parent.global_search.visibility) {
            this.$nextTick(() => {
                this.initGlobalSearch()
            });
        };
    },
    methods: {
        initGlobalSearch() {
            if(this.$refs.global_search){
                this.$refs.global_search.value = this.$parent.global_search.init.value;
                this.$parent.query.global_search = this.$parent.global_search.init.value;
            }
        },
        clearGlobalSearch() {
            if(this.$refs.global_search){
                this.$parent.query.global_search = "";
                this.$refs.global_search.value = "";
            }
        },
        updateGlobalSearchHandler: function(value) {
            this.$parent.query.global_search = value;
        },
        resetQuery(){
            this.$parent.global_search.visibility && (this.$refs.global_search.value = "");
            this.$parent.resetQuery()
        }
    }
}
</script>

<style>
    /* Bootstrap 4 text input with clear icon on the right */

    .has-clear-right {
        position: relative;
    }

    .has-clear-right .form-control {
        padding-right: 2.375rem;
    }

    .has-clear-right .form-control-feedback {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: block;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        font-weight: normal;
    }

    .has-clear-right .form-control-feedback:hover {
        color: red;
    }

    .global-search-wrapper{
        width: 230px;
        float: left;
        margin-right: 10px;
    }
    .refresh-reset-buttons-wrapper{
        float: left;
        margin-right: 10px;
    }
</style>