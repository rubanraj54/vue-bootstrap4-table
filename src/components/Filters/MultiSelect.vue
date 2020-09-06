<template>
    <div>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" :id="'multifilter_'+column.name" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
                    {{title}}
                </a>
            <div ref="vbt_dropdown_menu" class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuLink">
                <div v-if="showSearchFilterInput" class="vtb-search-filter-input">
                    <input type="text" :placeholder="showSearchFilterInputPlaceholder" class="form-control form-control-sm" v-model="search_filter_term">
                </div>

                <multi-select-all-item 
                    v-if="!isSingleMode && showSelectAllCheckbox" 
                    :text="selectAllCheckboxText" 
                    :is-all-options-selected="isAllOptionsSelected" 
                    @on-deselect-all-option="selected_options=[]" 
                    @on-select-all-option="selectAllOptions"
                ></multi-select-all-item>

                <multi-select-item 
                    v-for="(option, key) in filteredOptions" 
                    :key="option.value" 
                    :index="key" 
                    :option="option" 
                    :is-single-mode="isSingleMode" 
                    :selectedOptions="selected_options" 
                    @on-select-option="addOption(option)" 
                    @on-deselect-option="removeOption(option)"
                ></multi-select-item>
            </div>
        </div>
    </div>
</template>

<script>
import findIndex from "lodash/findIndex";
import range from "lodash/range";
import filter from "lodash/filter";
import find from "lodash/find";
import includes from "lodash/includes";
import some from "lodash/some";
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
            selected_options: [],
            canEmit: false,
            search_filter_term: ''
        };
    },
    mounted() {
        if (!has(this.column,"filter.closeDropdownOnSelection") || !this.column.filter.closeDropdownOnSelection) {
            this.$refs.vbt_dropdown_menu.addEventListener("click",function(e){
                e.stopPropagation();
            },false);
        }

//    this.$root.$on('bv::dropdown::shown', bvEvent => {
//      console.log('Dropdown is about to be shown', bvEvent)
//    })

        EventBus.$on('reset-query', () => {
            this.selected_options = [];
        });

        let lastIndex = this.optionsCount - 1;

        if (has(this.column,'filter.init.value')) {
            // gets array of "value"s
            if (this.isSingleMode) {
                if(typeof this.column.filter.init.value != 'string'){
                    console.log('Got array instead of string in init value of '+this.column.label)
                    return false
                }
                let selected_option = find(this.options, option => {
                    return option.value == this.column.filter.init.value
                })

                if(selected_option){
                    this.addOption(selected_option)
                }
            } else {
                if (Array.isArray(this.column.filter.init.value)) {
                    this.column.filter.init.value.forEach(value => {
                        let selected_option = find(this.options, option => {
                            return option.value == value
                        })

                        if(selected_option){
                            this.addOption(selected_option)
                        }
                    });
                } else {
                    console.log("Initial value for 'multi' mode should be an array");
                }
            }
        }

        this.$nextTick(() => { this.canEmit = true });
    },
    methods: {
        addOption(option) {
            if (this.isSingleMode) {
                this.resetSelectedOptions();
                this.selected_options.push(option);
            } else {
                let res = findIndex(this.selected_options, function (listed_option) {
                    return listed_option.value == option.value;
                });

                if (res == -1) {
                    this.selected_options.push(option);
                }
            }
        },
        selectAllOptions() {
            this.resetSelectedOptions();
            this.selected_options = this.options;
        },
        removeOption(option) {
            if (this.isSingleMode) {
                this.resetSelectedOptions();
            } else {
                let res = findIndex(this.selected_options, function (listed_option) {
                    return listed_option.value == option.value;
                });
                if (res > -1) {
                    this.selected_options.splice(res, 1);
                }
            }
        },

        resetSelectedOptions() {
            this.selected_options = [];
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
        filteredOptions(){
            if(!this.search_filter_term){
                return this.options
            }

            return filter(this.options, option => {
                return option.name.toLowerCase().indexOf(this.search_filter_term.toLowerCase()) > -1;
                
/*                if(option.name.toLowerCase().indexOf(this.search_filter_term.toLowerCase()) > -1){
                    option.visibility = true
                } else {
                    option.visibility = false
                }*/
            });
        },
        title() {
            let title = (this.column.filter.placeholder) ? (this.column.filter.placeholder) : "Select options";

            if (this.selected_options.length === 0) {
                return title;
            }

            if (this.selected_options.length > 0 && this.selected_options.length <= 1) {
                return this.selected_options[0].name;
                // let filtered_options = filter(this.options, (option, index) => {
                //     return includes(this.selected_option_indexes, index)
                // });
                // let names = map(filtered_options, (option) => {
                //     return option.name
                // });
                // return join(names, ",  ");
            } else {
                if(!this.column.filter.selectedText){
                    return 'Selected: '+this.selected_options.length;    
                }
                return this.column.filter.selectedText.replace('{number}', this.selected_options.length);
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
            return this.options.length === this.selected_options.length;
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
        },
        showSearchFilterInput(){
            if (!has(this.column.filter,"search_filter_input")) {
                return false;
            } else {
                return this.column.filter.search_filter_input.visibility || true;
            }
        },
        showSearchFilterInputPlaceholder() {
            if (!has(this.column.filter,"search_filter_input")) {
                return "Filter list";
            } else {
                return (has(this.column.filter.search_filter_input,"text")) ? this.column.filter.search_filter_input.text : "Filter list"
            }
        },
    },
    watch: {
        selected_options(newVal, oldVal) {

            if (!this.canEmit) return;

            let filtered_options = filter(this.options, (option, index) => {
                return some(newVal, option)
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
.vtb-search-filter-input{
    padding: 0px 10px 5px 10px;
}
</style>
