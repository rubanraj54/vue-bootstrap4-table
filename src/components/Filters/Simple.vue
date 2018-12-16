<template>
    <div>
        <input type="text" class="form-control" @keyup.stop="updateFilter($event)">
    </div>
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
            updateFilter: _.debounce(function(event) {
                this.$emit('update-filter',{"event":event,"column":this.column});
            }, 150),
        },
        components: {
            "font-awesome-icon": FontAwesomeIcon
        },
        computed: {}
    };
</script>
