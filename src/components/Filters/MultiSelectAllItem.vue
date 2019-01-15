<template>
    <div>
        <a class="dropdown-item" href="" @click.prevent="handleSelect()">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input vbt-checkbox" v-model="option_selected"/>
                <label class="custom-control-label">{{text}}</label>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "MultiSelectAllItem",
        props: {
            isAllOptionsSelected: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: "Any"
            },
        },
        data: function() {
            return {
                option_selected : false
            };
        },
        methods: {
            handleSelect() {
                if (this.option_selected) {
                    this.$emit('on-deselect-all-option');
                } else {
                    this.$emit('on-select-all-option',this.index);
                }
            }
        },
        watch: {
            isAllOptionsSelected(newVal,oldVal) {
                this.option_selected = newVal;
            }
        }
    };
</script>
