<template>
    <thead>
        <tr>
            <th v-show="checkboxRows" class="text-center justify-content-center">
                <div class="form-check vbt-select-all-checkbox">
                    <input class="form-check-input" type="checkbox" v-model="select_all_rows" value="" @change="handleChange($event)">
                </div>
            </th>

            <slot name="columns" :columns="columns">
                <Column v-for="(column, key, index) in columns" :key="index" :column="column" :query="query" @update-sort="(payload) => $emit('update-sort',payload)"></Column>
            </slot>
        </tr>
    </thead>
</template>

<script>
    import _ from 'lodash';
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
</style>
