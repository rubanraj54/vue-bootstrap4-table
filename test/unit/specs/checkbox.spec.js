import { mount } from '@vue/test-utils'
import CheckBox from "../../../src/components/CheckBox.vue";
var should = require('chai').should()
var expect = require('chai').expect

describe('Checkbox', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(CheckBox, {
            propsData: {
                rowsSelectable: true,
                rowSelected: false
            }
        });
    })

    it('default checkbox to be deselected', () => {
        wrapper.vm.checkboxSelected.should.be.false;
    });

    it('set true to "rowSelected" prop should change the "checkboxselected" to true', () => {
        wrapper.setProps({rowSelected:true});
        wrapper.vm.checkboxSelected.should.be.true;
    });

    it('emits add-row if rowSelected is false ', () => {
        wrapper.vm.checkboxSelected = false;
        wrapper.vm.selectCheckbox({shiftKey:false});
        let addRowEvent = wrapper.emitted('add-row');
        expect(addRowEvent).not.to.be.undefined;
    });

    it('emits remove-row if rowSelected is true ', () => {
        wrapper.vm.checkboxSelected = true;
        wrapper.vm.selectCheckbox({shiftKey:false});
        let removeRowEvent = wrapper.emitted('remove-row');
        expect(removeRowEvent).not.to.be.undefined;
    });

})
