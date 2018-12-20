<template>
    <div id="app">
        <vue-bootstrap4-table :data="result" :config="config"></vue-bootstrap4-table>
    </div>
</template>

<script>

    import VueBootstrap4Table from './components/VueBootstrap4Table.vue'

    export default {
        name: 'App',
        data: function() {
            return {
                result: {
                    rows: [],
                    columns: [{
                            label: "id",
                            name: "id",
                            filter: {
                                type: "simple",
                                placeholder: "id"
                            },
                            sort: true,
                            uniqueId: true
                        },
                        {
                            label: "title",
                            name: "title",
                            filter: {
                                type: "simple",
                                placeholder: "title"
                            },
                            sort: true
                        },
                        {
                            label: "url",
                            name: "url",
                            filter: {
                                type: "simple",
                                placeholder: "Enter url"
                            }
                        }
                    ]
                },
                config: {
                    pagination: true,
                    num_of_visible_page: 7,
                    per_page: 10,
                    checkbox_rows: true,
                    highlight_row_hover:true,
                    highlight_row_hover_color:"#000",
                }
            }
        },
        components: {
            VueBootstrap4Table
        },
        mounted() {
            let self = this;
            axios.get('https://jsonplaceholder.typicode.com/photos')
                .then(function(response) {
                    // handle success
                    self.result.rows = response.data;
                    // console.log(response);
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                });
        },
    }
</script>

<style>

</style>
