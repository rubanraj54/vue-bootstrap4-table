<template>
    <div>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" :id="'multifilter_'+column.name" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
                {{title}}
            </a>
            <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuLink">
                <multi-select-item v-for="(option, key) in options" :key="key" :index="key" :option="option" :selectedOptionIndexes="selected_option_indexes" @on-select-option="addOption" @on-deselect-option="removeOption"></multi-select-item>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";
    import MultiSelectItem from "./MultiSelectItem.vue";

    import {
        EventBus
    } from '../../event-bus.js';

    export default {
        name: "MultiSelect",
        props: {
            column: {
                type: Object,
                default: function() {
                    return {

                    };
                }
            },
            options:{
                type: Array,
                default: function() {
                    return [
                        {
                            "name" : "option one",
                            "value" : "Bindya"
                        },
                        {
                            "name" : "option two",
                            "value" : "option two"
                        },
                        {
                            "name" : "option three",
                            "value" : "option three"
                        },
                    ]
                }
            }
        },
        data: function() {
            return {
                selected_option_indexes: [],
            };
        },
        mounted() {
            $('.dropdown-menu').on('click', function(e) {
                e.stopPropagation();
            });
            // EventBus.$on('reset-query', () => {
                //     $(this.$refs.simple_filter_input).val("");
            // });
        },
        methods: {
            addOption(index) {

                let res = _.findIndex(this.selected_option_indexes, function(option_index) { return option_index == index; });

                if (res == -1) {
                    this.selected_option_indexes.push(index);
                }
            },
            removeOption(index) {
                let res = _.findIndex(this.selected_option_indexes, function(option_index) { return option_index == index; });
                if (res > -1) {
                    this.selected_option_indexes.splice(res,1);
                }
            },
            clearFilter() {
                $(this.$refs.simple_filter_input).val("");
                this.$emit('clear-filter',this.column);
            },
            // TODO - configurable debouncing
            updateFilter: _.debounce(function(event) {
                this.$emit('update-filter', {
                    "event": event,
                    "column": this.column
                });
            }, 60),
        },
        components: {
            MultiSelectItem
        },
        computed: {
                title() {
                    let title = "Select Options";

                    if (this.selected_option_indexes.length === 0) {
                        return title;
                    }

                    // if (this.selected_option_indexes.length > 0 && this.selected_option_indexes.length <= 2) {
                    //     let filtered_options = _.filter(this.options, (option,index) => {return _.includes(this.selected_option_indexes,index)});
                    //     let names = _.map(filtered_options, (option) => {return option.name});
                    //     return _.join(names, ",  ");
                    // } else {
                        return this.selected_option_indexes.length + " selected";
                    // }

                }
        },
        watch: {
            selected_option_indexes(newVal,oldVal) {
                let filtered_options = _.filter(this.options, (option,index) => {return _.includes(newVal,index)});
                let payload = {};
                payload.column = _.cloneDeep(this.column);
                payload.selected_options = [];
                _.forEach(filtered_options,function(option,key) {
                    payload.selected_options.push(option.value);
                });
                this.$emit('update-multi-select-filter',payload);
            }
        },
    };
</script>

<style scoped>
    /* .input-group-append.vbt-simple-filter-clear {
        cursor: pointer;
    } */
    .scrollable-menu {
    height: auto;
    max-height: 200px;
    overflow-x: hidden;
}
</style>
