import {
    mount
} from '@vue/test-utils'
import VueBootstrap4Table from "../../../src/components/VueBootstrap4Table.vue";
import has from "lodash/has";
describe('Global Search', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: [
                    {
                        "name": {
                            "first_name": "Vladimir",
                            "last_name": "Nitzsche"
                        },
                        "id": 1,
                        "age": 27,
                        "address": {
                            "city": "Port Pinkton",
                            "street": "311 Marlen Skyway Suite 457",
                            "postcode": "59419",
                            "country": "Mayotte"
                        },
                        "salary": 2574,
                        "email": "franecki.anastasia@gmail.com",
                        "website": "reichert.info",
                        "mobile": "+1-704-796-2565"
                    }
                ],
                columns: [
                    {
                        label: "id",
                        name: "id",
                        // filter: {
                        //     type: "simple",
                        //     placeholder: "id"
                        // },
                        sort: true,
                        // row_classes: "myrowclassone myrowclasstwo",
                        // column_classes: "column-class-one column-class-two"
                        // uniqueId: true
                    },
                ],
                config: {
                    global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: false,
                        case_sensitive: false // default false
                    },
                }
            }
        });
    })

    it('show global search text box if no global search config was provided', (done) => {
        let config = wrapper.vm.config;
        wrapper.vm.$nextTick(() => {
            if (!config.global_search) {
                expect(wrapper.find(".vbt-global-search").exists()).toBe(true);
            }
            done();
        });
    });
    it('show/hide global search text box if visibility is true/false', (done) => {
        let config = wrapper.vm.config;
        wrapper.vm.$nextTick(() => {
            if (has(config, 'global_search')) {
                if (!has(config, 'global_search.visibility')) {
                    expect(wrapper.find(".vbt-global-search").exists()).toBe(true);
                } else if (config.global_search.visibility == true) {
                    expect(wrapper.find(".vbt-global-search").exists()).toBe(true);
                } else {
                    expect(wrapper.find(".vbt-global-search").exists()).toBe(false);
                }
            }
            done();
        });
    });

})
