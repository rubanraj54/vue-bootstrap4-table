<template>
    <div>
        <a class="dropdown-item" href="" @click.prevent="handleSelect()">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input vbt-checkbox" v-model="option_selected"/>
                <label class="custom-control-label">{{option.name}}</label>
            </div>

        </a>
    </div>
</template>

<script>
    import _ from "lodash";

    import {
        EventBus
    } from '../../event-bus.js';

    export default {
        name: "MultiSelectItem",
        props: {
            column: {
                type: Object,
                default: function() {
                    return {};
                }
            },
            option:{
                type: Object,
                default: function() {
                    return {
                            "name" : "option one",
                            "value" : "option one"
                        }
                }
            },
            index: {
                type: Number | String,
                default: 0
            },
            selectedOptionIndexes: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        },
        data: function() {
            return {
                option_selected : false
            };
        },
        mounted() {
            // EventBus.$on('reset-query', () => {
            //     $(this.$refs.simple_filter_input).val("");
            // });
        },
        methods: {
            handleSelect() {
                // this.option_selected = !this.option_selected;
                if (this.option_selected) {
                    this.$emit('on-deselect-option',this.index);
                } else {
                    this.$emit('on-select-option',this.index);
                }
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

        },
        computed: {

        },
        watch: {
            selectedOptionIndexes: {
                handler: function(newVal, oldVal) {
                    let new_selected_option_indices = _.cloneDeep(newVal);
                    this.option_selected = _.includes(new_selected_option_indices,this.index);

                },
                deep: true
            }
        }
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
