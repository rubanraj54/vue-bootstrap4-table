<template>
    <tr ref="vbt_row" v-bind:style='{"background": (row_higlighted) ? rowHighlightColor : ""}'>
        <td v-show="checkboxRows" class="text-center" @click="selectCheckbox">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" v-model="row_selected" @change="handleChange($event)">
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
            },
            highlightRowHover: {
                type: Boolean,
                default: false
            },
            highlightRowHoverColor: {
                type: String,
                default: "#d6d6d6"
            }
        },
        data: function() {
            return {
                row_selected: false,
                row_higlighted:false,
            }
        },
        mounted() {
            this.$refs.vbt_row.addEventListener('mouseover', () => {this.row_higlighted = true;});
            this.$refs.vbt_row.addEventListener('mouseleave', () => {this.row_higlighted = false;});
            this.checkInSelecteditems();
        },
        methods: {
            test() {
                console.log(333);

            },
            handleChange(event) {
                if (event.target.checked) {
                    this.$emit('add-selected-item', this.row);
                } else {
                    this.$emit('remove-selected-item', this.row);
                }
            },
            selectCheckbox() {
                if (this.row_selected) {
                    this.$emit('remove-selected-item', this.row);
                } else {
                    this.$emit('add-selected-item', this.row);
                }
                this.row_selected = !this.row_selected;
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
            },
            rowHover(state) {
                this.row_higlighted = state;
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
        },
        computed: {
            rowHighlightColor() {
                return (this.highlightRowHover) ? this.highlightRowHoverColor : "";
            }
        },
    }
</script>

<style scoped>
/* tr:hover {
    background: #000 !important;
} */
</style>
