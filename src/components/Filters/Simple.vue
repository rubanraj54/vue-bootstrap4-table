<template>
    <div class="input-group">
        <input ref="simple_filter_input" type="text" class="form-control" :placeholder="column.filter.placeholder" @keyup.stop="updateFilter($event)">
        <div class="input-group-append vbt-simple-filter-clear" @click="clearFilter">
            <span class="input-group-text">
                <slot name="clear-simple-filter-icon">
                    &#x24E7;
                </slot>
            </span>
        </div>
    </div>
</template>

<script>
    import debounce from "lodash/debounce";


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
            return {};
        },
        mounted() {
            EventBus.$on('reset-query', () => {
                this.$refs.simple_filter_input.value = "";
            });
        },
        methods: {
            clearFilter() {
                this.$refs.simple_filter_input.value = "";
                this.$emit('clear-filter',this.column);
            },
            // TODO - configurable debouncing
            updateFilter: debounce(function(event) {
                this.$emit('update-filter', {
                    "event": event,
                    "column": this.column
                });
            }, 60),
        },
        components: {
        },
        computed: {}
    };
</script>

<style scoped>
    .input-group-append.vbt-simple-filter-clear {
        cursor: pointer;
    }
</style>
