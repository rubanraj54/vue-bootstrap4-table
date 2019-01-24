import { mount } from '@vue/test-utils'
import VueBootstrap4Table from "../../../src/components/VueBootstrap4Table.vue";
import { testdata } from "../utils"
var data = testdata();
describe('Refresh and Reset Buttons ', () => {

    it('hide refresh and reset button if the config is false', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {
                    show_reset_button: false,
                    show_refresh_button: false,
                }
            }
        });
        wrapper.vm.$nextTick(() => {
            refreshButton(wrapper).exists().should.to.be.false;
            resetButton(wrapper).exists().should.to.be.false;
            done();
        });
    });

    it('show refresh and reset button if the config is true', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {
                    show_reset_button: true,
                    show_refresh_button: true,
                }
            }
        });
        wrapper.vm.$nextTick(() => {
            refreshButton(wrapper).exists().should.to.be.true;
            resetButton(wrapper).exists().should.to.be.true;
            done();
        });
    });

    it('Refresh and Reset button slots should change the text in buttons', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {
                    show_reset_button: true,
                    show_refresh_button: true,
                }
            },
            slots: {
                "refresh-button-text": 'my refresh button',
                "reset-button-text": 'my reset button'
            }
        });
        wrapper.vm.$nextTick(() => {
            refreshButton(wrapper).text().should.be.equal("my refresh button");
            resetButton(wrapper).text().should.be.equal("my reset button");
            done();
        });
    });

    it('Check default Refresh and Reset button texts ', (done) => {
        let wrapper = mount(VueBootstrap4Table, {
            propsData: {
                rows: data,
                columns: [{
                    label: "id",
                    name: "id",
                    sort: true
                }, ],
                config: {
                    show_reset_button: true,
                    show_refresh_button: true,
                }
            }
        });
        wrapper.vm.$nextTick(() => {
            refreshButton(wrapper).text().should.be.equal("Refresh");
            resetButton(wrapper).text().should.be.equal("Reset Query");
            done();
        });
    });

})



function resetButton(wrapper) {
    return wrapper.find('.vbt-reset-button');
}

function refreshButton(wrapper) {
    return wrapper.find('.vbt-refresh-button');
}

