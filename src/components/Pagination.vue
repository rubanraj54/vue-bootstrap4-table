<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="{'disabled' : disablePreviousButton}" class="page-item" @click.prevent="pageHandler(page-1)">
                    <a class="page-link" href="" aria-label="Previous">
                        <span aria-hidden="true">
                            <slot name="vbt-paginataion-previous-button">

                            </slot>
                        </span>
                    </a>
                </li>
                <template v-if="!isEmpty">
                    <li class="page-item" v-if="showLeftDot" @click.prevent="pageHandler(1)">
                        <a class="page-link" href=""> 1 </a>
                    </li>
                    <li class="page-item disabled" v-if="showLeftDot">
                        <a class="page-link" href="">...</a>
                    </li>
                    <li class="page-item" v-for="index in range" :key="index" v-bind:class="{ active:  (index == page)}" @click.prevent="pageHandler(index)">
                        <a class="page-link" href="">{{index}}</a>
                    </li>
                    <li class="page-item disabled" v-if="showRightDot">
                        <a class="page-link" href="">...</a>
                    </li>
                    <li class="page-item" v-if="showRightDot" @click.prevent="pageHandler(totalPages)">
                        <a class="page-link" href=""> {{totalPages}} </a>
                    </li>
                </template>

                <template v-else>
                    <li class="page-item disabled">
                        <a class="page-link" href="">...</a>
                    </li>
                </template>
                <li :class="{'disabled' : disableNextButton}" class="page-item" @click.prevent="pageHandler(page+1)">
                    <a class="page-link" href="" aria-label="Next">
                        <span aria-hidden="true">
                            <slot name="vbt-paginataion-next-button">

                            </slot>
                        </span>
                    </a>
                </li>
                <!-- Number of rows per page starts here -->
                <div class="dropdown show vbt-per-page-dropdown">
                    <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{per_page}}
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a v-for="(option, key, index) in per_page_options" :key="index" class="dropdown-item" href="" @click.prevent="perPageHandler(option)" v-bind:class="{ active:  (option == per_page)}">
                            {{option}}
                        </a>
                    </div>
                </div>
                <!-- Number of rows per page ends here -->

                <div class="input-group col-sm-2">
                    <input type="number" class="form-control" :min="start" :max="totalPages" placeholder="Go to page" @keyup.enter="gotoPage" v-model.number="go_to_page">
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
    import _ from 'lodash';

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
            num_of_visibile_pagination_buttons: {
                type: [String, Number],
                default: 7
            },
            per_page_options: {
                type: Array,
                default: function() {
                    return [5,10,15]
                }
            }
        },
        data: function() {
            return {
                start: (this.page + 0),
                end: 0,
                go_to_page: ""
            }
        },
        mounted() {
            this.end = (this.page + (this.paginationLimit - 1));
        },
        methods: {
            gotoPage() {
                if (this.go_to_page === "") {
                    return;
                }
                let go_to_page = this.go_to_page;
                if (go_to_page >= 1 && go_to_page <= this.totalPages) {
                    this.pageHandler(go_to_page)
                    if (!_.includes(this.range,go_to_page)) {
                        if (this.totalPages - go_to_page < this.num_of_visibile_pagination_buttons) {
                            this.end = this.totalPages;
                            this.start = this.end - (this.num_of_visibile_pagination_buttons-1);;
                        } else {
                            this.start = go_to_page;
                            this.end = go_to_page + (this.num_of_visibile_pagination_buttons-1);
                        }
                    }

                } else {
                    console.log("invalid page number");
                }
            },
            pageHandler(index) {
                if (index >= 1 && index <= this.totalPages) {
                    this.$emit('update:page', index);
                }
            },
            perPageHandler(option) {
                this.$emit('update:per_page', option);
            },
        },
        components: {
        },
        computed: {
            showLeftDot() {
                return !(_.includes(this.range, 1));
            },
            showRightDot() {
                return !(this.totalPages - this.end <= 0);
            },
            totalPages() {
                return Math.ceil(this.total / this.per_page);
            },
            disablePreviousButton() {
                return this.page == this.start;
            },
            disableNextButton() {
                return this.page == this.end;
            },
            range() {
                return _.range(this.start, (this.end + 1));
            },
            paginationLimit() {
                if (this.totalPages < this.num_of_visibile_pagination_buttons) {
                    return this.totalPages;
                } else {
                    return this.num_of_visibile_pagination_buttons;
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
            rowCount(newVal, oldVal) {
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
            },
        }
    }
</script>

<style scoped>
    ul.pagination {
        margin-bottom: 0;
    }
    .vbt-per-page-dropdown {
        margin-left: 8px;
    }
</style>
