<template>
    <div>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" :id="'multifilter_'+column.name" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
                    {{title}}
                </a>
            <div ref="vbt_dropdown_menu" class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuLink">
                <multi-select-all-item v-if="!isSingleMode && showSelectAllCheckbox" :text="selectAllCheckboxText" :is-all-options-selected="isAllOptionsSelected" @on-deselect-all-option="selected_option_indexes=[]" @on-select-all-option="selectAllOptions"></multi-select-all-item>
                <multi-select-item v-for="(option, key) in options" :key="key" :index="key" :option="option" :is-single-mode="isSingleMode" :selectedOptionIndexes="selected_option_indexes" @on-select-option="addOption" @on-deselect-option="removeOption"></multi-select-item>
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
import cloneDeep from "lodash/cloneDeep";

import MultiSelectItem from "./MultiSelectItem.vue";
import MultiSelectAllItem from "./MultiSelectAllItem.vue";

import {
    EventBus
} from '../../event-bus.js';

export default {
    name: "MultiSelect",
    props: {
        column: {
            type: Object,
            default: function () {
                return {

                };
            }
        },
        options: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data: function () {
        return {
            selected_option_indexes: [],
            canEmit: false
        };
    },
    mounted() {
        if (!has(this.column,"filter.closeDropdownOnSelection") || !this.column.filter.closeDropdownOnSelection) {
            this.$refs.vbt_dropdown_menu.addEventListener("click",function(e){
                e.stopPropagation();
            },false);
        }

        EventBus.$on('reset-query', () => {
            this.selected_option_indexes = [];
        });

        let lastIndex = this.optionsCount - 1;

        if (has(this.column,'filter.init.value')) {
            if (this.isSingleMode) {
                let index = this.column.filter.init.value;
                if (index > lastIndex || index < 0) return;
                this.addOption(index)
            } else {
                if (Array.isArray(this.column.filter.init.value)) {
                    this.column.filter.init.value.forEach(index => {
                        if (index > lastIndex || index < 0) return;
                        this.addOption(index)
                    });
                } else {
                    console.log("Initial value for 'multi' mode should be an array");
                }
            }
        }

        this.$nextTick(() => { this.canEmit = true });
    },
    methods: {
        addOption(index) {
            if (this.isSingleMode) {
                this.resetSelectedOptions();
                this.selected_option_indexes.push(index);
            } else {
                let res = findIndex(this.selected_option_indexes, function (option_index) {
                    return option_index == index;
                });
                if (res == -1) {
                    this.selected_option_indexes.push(index);
                }
            }
        },
        selectAllOptions() {
            this.resetSelectedOptions();
            this.selected_option_indexes = range(this.options.length);
        },
        removeOption(index) {
            if (this.isSingleMode) {
                this.resetSelectedOptions();
            } else {
                let res = findIndex(this.selected_option_indexes, function (option_index) {
                    return option_index == index;
                });
                if (res > -1) {
                    this.selected_option_indexes.splice(res, 1);
                }
            }
        },

        resetSelectedOptions() {
            this.selected_option_indexes = [];
        }
    },
    components: {
        MultiSelectItem,
        MultiSelectAllItem
    },
    computed: {
        optionsCount() {
            return this.options.length;
        },
        title() {
            let title = (this.column.filter.placeholder) ? (this.column.filter.placeholder) : "Select options";

            if (this.selected_option_indexes.length === 0) {
                return title;
            }

            if (this.selected_option_indexes.length > 0 && this.selected_option_indexes.length <= 1) {
                return this.options[this.selected_option_indexes[0]].name;
                // let filtered_options = filter(this.options, (option, index) => {
                //     return includes(this.selected_option_indexes, index)
                // });
                // let names = map(filtered_options, (option) => {
                //     return option.name
                // });
                // return join(names, ",  ");
            } else {
                return this.column.filter.selectedText.replace('{number}', this.selected_option_indexes.length);
            }

        },

        mode() {
            let mode = "single";
            if (has(this.column.filter, "mode") && this.column.filter.mode == "multi") {
                mode = "multi";
            }
            return mode;
        },

        isSingleMode() {
            return (this.mode == "single");
        },

        isAllOptionsSelected() {
            return this.options.length === this.selected_option_indexes.length;
        },

        showSelectAllCheckbox() {
            if (!has(this.column.filter,"select_all_checkbox")) {
                return true;
            } else {
                return this.column.filter.select_all_checkbox.visibility;
            }
        },

        selectAllCheckboxText() {
            if (!has(this.column.filter,"select_all_checkbox")) {
                return "Select All";
            } else {
                return (has(this.column.filter.select_all_checkbox,"text")) ? this.column.filter.select_all_checkbox.text : "Select All"
            }
        }
    },
    watch: {
        selected_option_indexes(newVal, oldVal) {

            if (!this.canEmit) return;

            let filtered_options = filter(this.options, (option, index) => {
                return includes(newVal, index)
            });

            let payload = {};
            payload.column = cloneDeep(this.column);
            payload.selected_options = [];

            filtered_options.forEach(option => {
                payload.selected_options.push(option.value);
            });

            this.$emit('update-multi-select-filter', payload);
        }
    },
};
</script>

<style scoped>
.scrollable-menu {
    height: auto;
    max-height: 200px;
    overflow-x: hidden;
}
</style>
