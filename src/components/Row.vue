<template>
    <tr>
        <td v-show="checkboxRows" class="text-center">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="row_selected" @change="handleChange($event)">
            </div>
        </td>
        <td v-for="(column, key, hindex) in columns" :key="hindex" class="text-center">
            <slot name="cell" :row="row" :column="column" :cell_value="getValueFromRow(row,column.name)">
                {{getValueFromRow(row,column.name)}}
            </slot>
        </td>
    </tr>
</template>

<script>
    import _ from 'lodash';
    import {
        EventBus
    } from '../event-bus.js';

    export default {
        name: 'Row',
        props: {
            row: {
                type: Object,
                default: function() {
                    return {

                    };
                }
            },
            columns: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            selectedItems: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            checkboxRows: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                row_selected: false
            }
        },
        mounted() {
            this.checkInSelecteditems();
        },
        methods: {
            handleChange(event) {
                if (event.target.checked) {
                    this.$emit('add-selected-item', this.row);
                } else {
                    this.$emit('remove-selected-item', this.row);
                }
            },
            getValueFromRow(row, name) {
                return _.get(row, name);
            },
            // compare the selected items list with curretn row item and update checkbox accordingly
            checkInSelecteditems() {
                let difference = _.differenceWith(this.selectedItems, [this.row], _.isEqual);
                if (difference.length != this.selectedItems.length) {
                    this.row_selected = true;
                } else {
                    this.row_selected = false;
                }
            }
        },
        watch: {
            row: {
                handler: function(newVal, oldVal) {
                    let difference = _.differenceWith(this.selectedItems, [newVal], _.isEqual);
                    if (difference.length != this.selectedItems.length) {
                        this.row_selected = true;
                    } else {
                        this.row_selected = false;
                    }
                },
                deep: true
            },
            selectedItems: {
                handler: function(newVal, oldVal) {
                    let difference = _.differenceWith(newVal, [this.row], _.isEqual);
                    if (difference.length != this.selectedItems.length) {
                        this.row_selected = true;
                    } else {
                        this.row_selected = false;
                    }
                },
                deep: true
            }
        }
    }
</script>
