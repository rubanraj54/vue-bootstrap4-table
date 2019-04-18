<template>
  <div class="form-group has-clear-right">
    <span v-if="showClearButton" class="form-control-feedback vbt-simple-filter-clear" @click="clearFilter">
        <slot name="vbt-simple-filter-clear-icon">

        </slot>
    </span>
    <input v-if="filterOnPressEnter" type="text" ref="simple_filter_input" class="form-control" :placeholder="column.filter.placeholder" @keyup.enter="updateFilterHandler($event)">
    <input v-else type="text" ref="simple_filter_input" class="form-control" :placeholder="column.filter.placeholder" @keyup.stop="updateFilter($event)">
  </div>
</template>

<script>
    import debounce from "lodash/debounce";
    import has from "lodash/has";


    import {
        EventBus
    } from '../../event-bus.js';

    export default {
        name: "Simple",
        props: {
            column: {
                type: Object,
                default: function() {
                    return {};
                }
            },
        },
        data: function() {
            return {
                filterOnPressEnter: false,
                debounceRate: 60
            };
        },
        mounted() {
            if (has(this.column,'filter.init.value')) {
                this.$refs.simple_filter_input.value = this.column.filter.init.value;
            }

            if (has(this.column,'filter.filterOnPressEnter')) {
                this.filterOnPressEnter = this.column.filter.filterOnPressEnter;
            }

            if (!this.filterOnPressEnter && has(this.column,'filter.debounceRate')) {
                this.debounceRate = this.column.filter.debounceRate;
            }

            EventBus.$on('reset-query', () => {
                if (this.$refs.simple_filter_input) {
                    this.$refs.simple_filter_input.value = "";
                }
            });
        },
        methods: {
            clearFilter() {
                this.$refs.simple_filter_input.value = "";
                this.$emit('clear-filter',this.column);
            },
            // TODO - configurable debouncing
            updateFilterHandler: function (event) {
                this.$emit('update-filter', {
                    "value": event.target.value,
                    "column": this.column
                });
            },
        },
        components: {
        },
        computed: {
            showClearButton() {
                return (this.column.filter.showClearButton == undefined) ? true : this.column.filter.showClearButton;
            },
            updateFilter () {
                return debounce(this.updateFilterHandler, this.debounceRate);
            },
        }
    };
</script>

<style scoped>

    .vbt-simple-filter-clear {
        cursor: pointer;
    }

    /* Styles for wrapping the search box */

    .main {
        width: 50%;
        margin: 50px auto;
    }

    /* Bootstrap 4 text input with clear icon on the right */

    .has-clear-right {
        position: relative;
    }

    .has-clear-right .form-control {
        padding-right: 2.375rem;
    }

    .has-clear-right .form-control-feedback {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: block;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
    }

    .has-clear-right .form-control-feedback:hover {
        color: red;
    }

</style>
