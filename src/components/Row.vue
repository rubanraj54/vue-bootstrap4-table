<template>
    <tr>
        <td v-for="(column, key, hindex) in columns" :key="hindex" class="text-center">
            <slot name="cell" :row="row" :column="column" :cell_value="getValueFromRow(row,column.name)">
                {{getValueFromRow(row,column.name)}}
            </slot>
        </td>
    </tr>
</template>

<script>
    import _ from 'lodash';

    export default {
        name: 'Row',
        props: {
            row: {
                type: Object,
                default: function() {
                    return {

                    };
                }
            },
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
        mounted() {

        },
        methods: {
            getValueFromRow(row, name) {
                return _.get(row, name);
            }
        }
    }
</script>
