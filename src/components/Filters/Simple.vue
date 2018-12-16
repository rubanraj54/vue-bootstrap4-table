<template>
    <div class="input-group">
        <input ref="simple_filter_input" type="text" class="form-control" :placeholder="column.filter.placeholder" @keyup.stop="updateFilter($event)">
        <div class="input-group-append" @click="clearFilter">
            <span class="input-group-text">
                <font-awesome-icon icon="times-circle" />
            </span>
        </div>
    </div>
    <!-- <input type="search" class="form-control" :placeholder="column.filter.placeholder" @keyup.stop="updateFilter($event)"> -->
</template>

<script>
    import _ from "lodash";

    import {
        library
    } from "@fortawesome/fontawesome-svg-core";
    import {
        fas
    } from "@fortawesome/free-solid-svg-icons";
    import {
        FontAwesomeIcon
    } from "@fortawesome/vue-fontawesome";
    library.add(fas);

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
        methods: {
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
            "font-awesome-icon": FontAwesomeIcon
        },
        computed: {}
    };
</script>

<style scoped>
    .input-group-append {
        cursor: pointer;
    }
</style>
