<template>
    <tr :data-id="rowId" ref="vbt_row" v-bind:style='{"background": (rowHiglighted) ? highlightRowHoverColor : ""}' :class='rowClasses' v-on="rowsSelectable ? { click: ($event) => handleRowSelect($event) } : {}">
        <CheckBox v-if="checkboxRows"
                  :rowsSelectable="rowsSelectable"
                  :row-selected="rowSelected"
                  @add-row="addRow"
                  @remove-row="removeRow"/>
        <template v-for="(column, key, hindex) in columns">
            <td v-if="canShowColumn(column)" :key="hindex" :class="cellClasses(column)">
                <slot :name="'vbt-'+getCellSlotName(column)">
                </slot>
            </td>
        </template>
    </tr>
</template>

<script>
    import has from "lodash/has";
    import get from "lodash/get";
    import differenceWith from "lodash/differenceWith";
    import isEqual from "lodash/isEqual";
    import includes from "lodash/includes";

    import CheckBox from "./CheckBox.vue";

    import {
        EventBus
    } from '../event-bus.js';

    export default {
        name: 'Row',
        props: {
            row: {
                type: Object,
                required:true
            },
            propRowClasses: {
                type: Object | String,
                required:false
            },
            propCellClasses: {
                type: Object | String,
                required:false
            },
            columns: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            uniqueId: {
                type: Number | String,
                required: true
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
            },
            rowsSelectable: {
                type: Boolean,
                default: false
            },
            rowIndex: {
                type: Number,
                required: true
            },

        },
        data: function() {
            return {
                rowSelected: false,
                rowHiglighted:false,
            }
        },
        mounted() {
            if (this.highlightRowHover) {
                this.$refs.vbt_row.addEventListener('mouseover', () => {this.rowHiglighted = true;});
                this.$refs.vbt_row.addEventListener('mouseleave', () => {this.rowHiglighted = false;});
            }
            this.checkInSelecteditems(this.selectedItems,this.row);
        },
        methods: {

            addRow(shiftKey) {
                this.$emit('add-row', {'shiftKey':shiftKey,"rowIndex":this.rowIndex});
            },
            removeRow(shiftKey) {
                this.$emit('remove-row', {'shiftKey':shiftKey,"rowIndex":this.rowIndex});
            },
            handleRowSelect(event) {
                if (this.rowSelected) {
                    this.removeRow(event.shiftKey);
                } else {
                    this.addRow(event.shiftKey);
                }
                this.rowSelected = !this.rowSelected;
            },
            // compare the selected items list with curretn row item and update checkbox accordingly
            checkInSelecteditems(selectedItems,row) {
                if (!this.checkboxRows && !this.rowsSelectable) {
                    return;
                }

                // TODO replace with find index
                let difference = differenceWith(selectedItems, [row], isEqual);
                if (difference.length != selectedItems.length) {
                    this.rowSelected = true;
                } else {
                    this.rowSelected = false;
                }
            },
            rowHover(state) {
                this.rowHiglighted = state;
            },
            getValueFromRow(row, name) {
                return get(row, name);
            },
            cellClasses(column) {
                let classes = "";

                let default_text_alignment = "text-center";

                //decide text alignment class - starts here
                let alignments = ["text-justify","text-right","text-left","text-center"];
                if (has(column, "row_text_alignment") && includes(alignments, column.row_text_alignment)) {
                    classes = classes + " " + column.row_text_alignment;
                } else {
                    classes = classes + " " + default_text_alignment;
                }
                //decide text alignment class - ends here

                // adding user defined classes from column config to rows - starts here
                if (has(column, "row_classes")) {
                    classes = classes + " " + column.row_classes;
                }
                // adding user defined classes from column config to rows - ends here


                if (typeof this.propCellClasses == "string") {
                    return this.propCellClasses;
                } else if (typeof this.propCellClasses == "object") {
                    Object.entries(this.propCellClasses).forEach(([key, value]) => {
                        if (typeof value == "boolean" && value) {
                            classes += (" " + key);
                        } else if (typeof value == "function") {
                            let truth = value(this.row,column,this.getValueFromRow(this.row,column.name));
                            if (typeof truth == "boolean" && truth) {
                                classes += " ";
                                classes += key;
                            }
                        }
                    });
                }

                return classes;
            },
            getCellSlotName(column) {
                if (has(column,"slot_name")) {
                    return column.slot_name;
                }
                return column.name.replace(/\./g,'_');
            },
            canShowColumn(column) {
                return (column.visibility == undefined || column.visibility) ? true : false;
            }
        },
        computed: {
            rowClasses() {
                let classes = this.userRowClasses;

                if (this.rowSelected) {
                    classes += " ";
                    classes += "vbt-row-selected";
                }

                return classes;

            },
            userRowClasses() {
                let classes = "";
                if (typeof this.propRowClasses == "string") {
                    return this.propRowClasses;
                } else if (typeof this.propRowClasses == "object") {
                    Object.entries(this.propRowClasses).forEach(([key, value]) => {
                        if (typeof value == "boolean" && value) {
                            classes += key;
                        } else if (typeof value == "function") {
                            let truth = value(this.row);
                            if (typeof truth == "boolean" && truth) {
                                classes += " ";
                                classes += key;
                            }
                        }
                    });
                }

                return classes;
            },
            rowId() {
                return this.getValueFromRow(this.row,this.uniqueId);
            }
        },
        watch: {
            row: {
                handler: function(newVal, oldVal) {
                    this.checkInSelecteditems(this.selectedItems,newVal);
                },
                deep: true
            },
            selectedItems: {
                handler: function(newVal, oldVal) {
                    this.checkInSelecteditems(newVal,this.row);
                },
                deep: true
            }
        },
        components: {
            CheckBox
        }
    }
</script>
