<template>
    <th>
        <div v-on:click="sort">
            <slot name="column" :column="column">
                {{column.label}}
            </slot>
            <template v-if="!isSort">
                <slot name="no-sort-icon">
                    <font-awesome-icon icon="sort" class="float-right" />
                </slot>
            </template>

            <template v-else>
                <template v-if="config.sort.order==='asc'">
                    <slot name="sort-asc-icon">
                        <font-awesome-icon icon="sort-up" class="float-right" />
                    </slot>
                </template>

                <template v-else-if="config.sort.order==='desc'">
                    <slot name="sort-desc-icon">
                        <font-awesome-icon icon="sort-down" class="float-right" />
                    </slot>
                </template>

                <template v-else>
                    <slot name="no-sort-icon">
                        <font-awesome-icon icon="sort" class="float-right" />
                    </slot>
                </template>
            </template>
        </div>
    </th>
</template>

<script>
import _ from 'lodash';

import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    fas
} from '@fortawesome/free-solid-svg-icons'
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(fas);

export default {
    name: 'Column',
    props: {
        column: {
            type: Object,
            default: function () {
                return {};
            }
        },
        config: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data: function () {
        return {

        }
    },
    methods: {
        sort() {
            this.$emit('update-sort', this.column);
        }

    },
    components: {
        'font-awesome-icon': FontAwesomeIcon
    },
    computed: {
        sortIcon() {
            if (this.config.sort.name == null) {
                return 'sort';
            }

            if (this.config.sort.name === this.column.name) {
                if (this.config.sort.order === "asc") {
                    return "sort-up";
                } else if (this.config.sort.order === "desc") {
                    return "sort-down";
                } else {
                    return "sort";
                }
            } else {
                return "sort";
            }
        },

        isSort() {
            if (this.config.sort.name == null) {
                return false;
            }

            return this.config.sort.name === this.column.name;
        },

    },
}
</script>

// TODO icon color

<style scoped>
th {
    cursor: pointer;
}
</style>
