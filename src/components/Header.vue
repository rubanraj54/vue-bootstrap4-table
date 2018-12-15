<template>
    <thead>
        <slot name="columns" :columns="columns">
            <tr>
                <th v-for="(column, key, index) in columns" :key="index" scope="col">
                    <slot name="column" :column="column">
                        {{column.label}}
                    </slot>
                </th>
            </tr>
        </slot>
    </thead>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: 'Header',
        props: {
            columns: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        },
        data: function() {
            return {

            }
        },
        methods: {

        }
    }
</script>
