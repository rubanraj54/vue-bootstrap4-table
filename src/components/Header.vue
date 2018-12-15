<template>
    <thead>
        <slot name="columns" :columns="columns">
            <tr>
                <Column v-for="(column, key, index) in columns" :key="index" :column="column" :config="config" @update-sort="(payload) => $emit('update-sort',payload)"></Column>
            </tr>
        </slot>
    </thead>
</template>

<script>
    import _ from 'lodash';

    import { library } from '@fortawesome/fontawesome-svg-core'
    import { fas } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(fas);


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
            config: {
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
            'font-awesome-icon' : FontAwesomeIcon,
            Column
        },
        computed: {

        }
    }
</script>
