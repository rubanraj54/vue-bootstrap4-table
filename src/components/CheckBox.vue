<template>
    <td v-show="checkboxRows" class="text-center" v-on="!rowsSelectable ? { click: () => selectCheckbox() } : {}">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input vbt-checkbox" v-model="row_selected" v-on="!rowsSelectable ? { change: ($event) => handleChange($event) } : {}"/>
          <label class="custom-control-label"></label>
        </div>
    </td>
</template>

<script>
    import _ from "lodash";

    export default {
        name: 'CheckBox',
        props: {
            checkboxRows: {
                type: Boolean,
                default: false
            },
            rowsSelectable: {
                type: Boolean,
                default: false
            },
            row: {
                type: Object,
                default: function() {
                    return {

                    };
                }
            },
            selectedItems: {
                type: Array,
                default: function() {
                    return [];
                }
            },
        },
        data: function() {
            return {
                row_selected:false
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
            selectCheckbox() {
                if (this.row_selected) {
                    this.$emit('remove-selected-item', this.row);
                } else {
                    this.$emit('add-selected-item', this.row);
                }
                this.row_selected = !this.row_selected;
            },
            checkInSelecteditems() {
                let difference = _.differenceWith(this.selectedItems, [this.row], _.isEqual);
                if (difference.length != this.selectedItems.length) {
                    this.row_selected = true;
                } else {
                    this.row_selected = false;
                }
            },
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

<style scoped>
.custom-control-label {
  vertical-align: top;
}

</style>
