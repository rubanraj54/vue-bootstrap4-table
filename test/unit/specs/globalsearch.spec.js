import { mount } from '@vue/test-utils'
import VueBootstrap4Table from "../../../src/components/VueBootstrap4Table.vue";
var should = require('chai').should()
var expect = require('chai').expect
import { testdata } from "../utils"
var data = testdata();

describe('Global Search', () => {

    it('show global search text box & placeholder should be "Enter search text" if no global search config was provided', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {}
            }
        });
        wrapper.vm.$nextTick(() => {
            globalSearchInputGroup(wrapper).exists().should.be.true;
            globalSearchInput(wrapper, 'placeholder').should.be.equal("Enter search text");
            done();
        });
    });

    it('show global search text box & placeholder should be "Enter search text" if visibility & placeholder property is not given', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {
                    global_search: {
                        case_sensitive: false
                    },
                }
            }
        });
        wrapper.vm.$nextTick(() => {
            globalSearchInputGroup(wrapper).exists().should.be.true;
            globalSearchInput(wrapper, 'placeholder').should.be.equal("Enter search text");
            done();
        });
    });

    it('show global search text box & placeholder should be "Enter custom Search text" if visibility property is true & custom placeholder given', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {
                    global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: true,
                        case_sensitive: false
                    },
                }
            }
        });
        wrapper.vm.$nextTick(() => {
            globalSearchInputGroup(wrapper).exists().should.be.true;
            globalSearchInput(wrapper, 'placeholder').should.be.equal("Enter custom Search text");
            done();
        });
    });

    it('hide global search text box if visibility property is false', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {
                    global_search: {
                        placeholder: "Enter custom Search text",
                        visibility: false,
                        case_sensitive: false
                    },
                }
            }
        });
        wrapper.vm.$nextTick(() => {
            globalSearchInputGroup(wrapper).exists().should.be.false;
            done();
        });
    });


    it('Clicking clear button should remove the text in the global search input textbox', () => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ]
            }
        });
        globalSearchInput(wrapper).setValue('ruban')
        globalSearchInput(wrapper).element.value.should.be.equal("ruban")
        globalSearchInputGroup(wrapper).find('.vbt-global-search-clear').trigger('click')
        globalSearchInput(wrapper).element.value.should.be.equal("")
    })

})

function globalSearchInputGroup(wrapper) {
    return wrapper.find(".vbt-global-search");
}

function globalSearchInput(wrapper,attribute) {
    return (attribute) ? globalSearchInputGroup(wrapper).find('input').attributes(attribute) : globalSearchInputGroup(wrapper).find('input');
}

