<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <template v-if="!isEmpty">
                    <li class="page-item" v-if="showLeftDot" @click="pageHandler(1)">
                        <a class="page-link" href="#"> 1 </a>
                    </li>
                    <li class="page-item disabled" v-if="showLeftDot">
                        <a class="page-link" href="#">...</a>
                    </li>
                    <li class="page-item" v-for="index in range" :key="index" v-bind:class="{ active:  (index == page)}" @click="pageHandler(index)">
                        <a class="page-link" href="#">{{index}}</a>
                    </li>
                    <li class="page-item disabled" v-if="showRightDot">
                        <a class="page-link" href="#">...</a>
                    </li>
                    <li class="page-item" v-if="showRightDot" @click="pageHandler(totalPages)">
                        <a class="page-link" href="#"> {{totalPages}} </a>
                    </li>
                </template>
                <template v-else>
                    <li class="page-item disabled">
                        <a class="page-link" href="#">...</a>
                    </li>
                </template>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
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
        name: 'Pagination',
        props: {
            page: {
                type: [String, Number],
                required: true
            },
            per_page: {
                type: [String, Number],
                required: true
            },
            total: {
                type: [String, Number],
                required: true
            },
            pagiantion_limit: {
                type: [String, Number],
                default: 5
            }
        },
        data: function() {
            return {
                start: (this.page + 0),
                end: 0
            }
        },
        mounted() {
            this.end = (this.page + (this.paginationLimit - 1));
        },
        methods: {
            pageHandler(index) {
                this.$emit('update:page', index);
            }

        },
        components: {
            'font-awesome-icon': FontAwesomeIcon
        },
        computed: {
            totalPages() {
                return Math.ceil(this.total / this.per_page);
            },
            range() {
                return _.range(this.start, (this.end + 1));
            },
            showRightDot() {
                // return this.
                return !(this.totalPages - this.end <= 0);
            },
            showLeftDot() {
                return !(_.includes(this.range, 1));
            },
            paginationLimit() {
                if (this.totalPages < this.pagiantion_limit) {
                    return this.totalPages;
                } else {
                    return this.pagiantion_limit;
                }
            },
            isEmpty() {
                return this.total == 0;
            }

        },
        watch: {
            page(newVal, oldVal) {
                if (newVal == this.totalPages) {
                    this.start = newVal - (this.paginationLimit - 1);
                    this.end = newVal;
                } else if (newVal == 1) {
                    this.start = newVal;
                    this.end = newVal + (this.paginationLimit - 1);
                } else {
                    if (newVal > oldVal) {
                        if (this.end - newVal < 1) {
                            this.start += 1;
                            this.end += 1;
                        }
                    } else {
                        if (this.start - newVal >= 0) {
                            this.start -= 1;
                            this.end -= 1;
                        }
                    }

                }
            },
            total(newVal, oldVal) {
                if (this.page == this.totalPages) {
                    this.start = this.page - (this.paginationLimit - 1);
                    this.end = this.page;
                } else if (this.page == 1) {
                    this.start = this.page;
                    this.end = this.page + (this.paginationLimit - 1);
                }
            },
            totalPages(newVal, oldVal) {
                if (this.page == this.totalPages) {
                    this.start = this.page - (this.paginationLimit - 1);
                    this.end = this.page;
                } else if (this.page == 1) {
                    this.start = this.page;
                    this.end = this.page + (this.paginationLimit - 1);
                }
            }
        }
    }
</script>

<style scoped>
    ul.pagination {
        margin-bottom: 0;
    }
</style>
