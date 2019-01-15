<template>
    <thead>
        <tr>
            <th v-show="checkboxRows" class="text-center justify-content-center" @click="selectCheckbox">
                <div class="form-check vbt-select-all-checkbox">
                    <input class="form-check-input" type="checkbox" v-model="select_all_rows" value="" @change="handleChange($event)">
                </div>
            </th>

            <slot name="columns" :columns="columns">
                <th v-for="(column, key, index) in columns" :key="index" v-on="isSortableColumn(column) ? { click: () => $emit('update-sort',column) } : {}" class="text-center" v-bind:class="{'vbt-sort-cursor':isSortableColumn(column)}">
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
</template>

<script>
    import has from "lodash/has";

    import {
        EventBus
    } from '../event-bus.js';
    import Column from "./Column.vue";

    export default {
        name: 'Header',
        props: {
            columns: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            query: {
                type: Object,
                default: function() {
                    return {};
                }
            },
            checkboxRows: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                select_all_rows: false
            }
        },
        mounted() {
            EventBus.$on('unselect-select-all-items-checkbox', (msg) => {
                this.select_all_rows = false;
            });
            EventBus.$on('select-select-all-items-checkbox', (msg) => {
                this.select_all_rows = true;
            });
        },
        methods: {
            handleChange(event) {
                if (event.target.checked) {
                    this.$emit('select-all-items');
                } else {
                    this.$emit('unselect-all-items');
                }
            },
            selectCheckbox() {
                if (this.select_all_rows) {
                    this.$emit('unselect-all-items');
                } else {
                    this.$emit('select-all-items');
                }
                this.select_all_rows = !this.select_all_rows;
            },
            isSort(column) {
                if (this.query.sort.name == null) {
                    return false;
                }

                return this.query.sort.name === column.name;
            },

            isSortableColumn(column) {
                if (!has(column,'sort')) {
                    return false;
                } else {
                    return column.sort;
                }
            }

        },
        components: {
            Column
        },
        computed: {

        }
    }
</script>

<style scoped>
    .vbt-select-all-checkbox {
        margin-bottom: 20px;
    }
    .vbt-sort-cursor {
        cursor: pointer;
    }
</style>
