<template>
<div class="float-right">
    <template v-if="order == 'asc'">
        <slot name="sort-asc-icon">
            &#x1F825;
        </slot>
    </template>

    <template v-else-if="order==='desc'">
        <slot name="sort-desc-icon">
            &#x1F827;
        </slot>
    </template>

    <template v-else>
        <slot name="no-sort-icon">
            &#x1F825;&#x1F827;
        </slot>
    </template>
</div>
</template>

<script>
import _ from "lodash";

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
            let index = _.findIndex(this.sort, {
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
