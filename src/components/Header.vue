<template>
    <thead>
        <slot name="columns" :columns="columns">
            <tr>
                <Column v-for="(column, key, index) in columns" :key="index" :column="column" :query="query" @update-sort="(payload) => $emit('update-sort',payload)"></Column>
            </tr>
        </slot>
    </thead>
</template>

<script>
    import _ from 'lodash';

    import Column from "./Column.vue";

    export default {
        name: 'Header',
        props: {
            columns: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            query: {
                type:Object,
                default:function () {
                    return {};
                }
            }
        },
        data: function() {
            return {

            }
        },
        methods: {

        },
        components: {
            Column
        },
        computed: {

        }
    }
</script>
