<template>
<div class="float-right">
    <template v-if="order == 'asc'">
        <slot name="vbt-sort-asc-icon">

        </slot>
    </template>

    <template v-else-if="order==='desc'">
        <slot name="vbt-sort-desc-icon">

        </slot>
    </template>

    <template v-else>
        <slot name="vbt-no-sort-icon">

        </slot>
    </template>
</div>
</template>

<script>
import findIndex from "lodash/findIndex";


export default {
    name: 'SortIcon',
    props: {
        sort: {
            type: Array,
            default: function () {
                return [];
            }
        },
        column: {
            type: Object,
            default: function () {
                return {};
            }
        },

    },
    data: function () {
        return {

        }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
        order() {
            let index = findIndex(this.sort, {
                'vbt_col_id': this.column.vbt_col_id
            });
            if (index == -1) {
                return null;
            } else {
                return this.sort[index].order;
                // if (this.sort[res].order) {

                // }
                // return this.sort[res].order == "asc" ? "desc" : "asc";
            }
        }
    },
}
</script>
