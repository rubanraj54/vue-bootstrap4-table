<template>
<div class="text-right justify-content-center">
    <template v-if="currentPageRowsLength != 0">
        From 1 to {{currentPageRowsLength}} of {{filteredRowsLength}} entries
    </template>
    <template v-else>
        No results found
    </template>
    <template>
         ({{originalRowsLength}} total records)
    </template>
</div>
</template>

<script>
export default {
    name: 'PaginationInfo',
    props: {
        currentPageRowsLength: {
            type: Number,
            default: 0
        },
        filteredRowsLength: {
            type: Number,
            default: 0
        },
        originalRowsLength: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
