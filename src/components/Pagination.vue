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
                    <li class="page-item" v-if="start > 3" @click.prevent="pageHandler(1)">
                        <a class="page-link" href=""> 1 </a>
                    </li>
                    <li class="page-item disabled" v-if="start > 3">
                        <a class="page-link" href="">…</a>
                    </li>
                    <li class="page-item" v-for="index in range" :key="index" v-bind:class="{ active:  (index == page)}" @click.prevent="pageHandler(index)">
                        <a class="page-link" href="">{{index}}</a>
                    </li>
                    <li class="page-item disabled" v-if="end < totalPages - 2">
                        <a class="page-link" href="">…</a>
                    </li>
                    <li class="page-item" v-if="end < totalPages - 2" @click.prevent="pageHandler(totalPages)">
                        <a class="page-link" href=""> {{totalPages}} </a>
                    </li>
                </template>

                <template v-else>
                    <li class="page-item disabled">
                        <a class="page-link" href="">…</a>
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
                    <input type="number" class="form-control" min="1" step="1" :max="totalPages" placeholder="Go to page" @keyup.enter="gotoPage" v-model.number="go_to_page">
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
    import range from "lodash/range";
    import includes from "lodash/includes";

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
            this.calculatePageRange(true);
        },
        methods: {
            gotoPage() {
                if (this.go_to_page === "" || !this.isPositiveInteger(this.go_to_page)) {
                    return;
                }

                //Handle the new page
                this.pageHandler(this.go_to_page)           
            },
            pageHandler(index) {
                if (index >= 1 && index <= this.totalPages) {
                    this.$emit('update:page', index);
                }
            },
            perPageHandler(option) {
                this.$emit('update:per_page', option);
            },
            calculatePageRange(force = false) {
                //Skip calculating if all pages can be shown
                if (this.totalPages <= this.num_of_visibile_pagination_buttons) {
                    this.start = 1;
                    this.end = this.totalPages;
                    return;
                }

                //Skip recalculating if the previous and next pages are already visible
                if (!force && 
                    (includes(this.range, this.page - 1) || this.page == 1) &&
                    (includes(this.range, this.page + 1) || this.page == this.totalPages) 
                ) { return; }

                //Current page is the start page minus one
                this.start = (this.page == 1) ? 1 : this.page - 1;

                //Reserved entries: firstpage, ellipsis (2x), prev. page, last page, current page
                this.end = this.start + this.num_of_visibile_pagination_buttons - 5;

                //If the user navigates on page one or two, we set start to one (ellipsis pointless)
                //and can potentially shift up end
                if (this.start <= 3) {
                    this.end += 3 - this.start;
                    this.start = 1;
                }

                //If the user navigates on the last two pages or out of bounds, we can shift down start
                //This will also handle end overflow, substract 2 for ellipsis and last page
                if (this.end >= this.totalPages - 2) {
                    this.start -= this.end - (this.totalPages - 2);
                    this.end = this.totalPages;
                }

                //Handle start underflow
                this.start = Math.max(this.start, 1);
            },
            isPositiveInteger(str) {
                return /^\+?(0|[1-9]\d*)$/.test(str);
            }
        },
        components: {
        },
        computed: {
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
                return range(this.start, this.end + 1);
            },
            isEmpty() {
                return this.total == 0;
            }

        },
        watch: {
            page(newVal, oldVal) {
                this.calculatePageRange();
            },
            rowCount(newVal, oldVal) {
                this.calculatePageRange();
            },
            totalPages(newVal, oldVal) {
                this.calculatePageRange();
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
