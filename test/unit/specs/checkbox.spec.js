import {
    mount
} from '@vue/test-utils'
import CheckBox from "../../../src/components/CheckBox.vue";

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
        expect(wrapper.vm.checkboxSelected).toBe(false);
        wrapper.vm.selectCheckbox({shiftKey:false});
    });

    it('emits add-row if rowSelected is false ', () => {
        wrapper.vm.checkboxSelected = false;
        wrapper.vm.selectCheckbox({shiftKey:false});
        expect(wrapper.emitted('add-row')).toBeTruthy();
    });

    it('emits remove-row if rowSelected is true ', () => {
        wrapper.vm.checkboxSelected = true;
        wrapper.vm.selectCheckbox({shiftKey:false});
        expect(wrapper.emitted('remove-row')).toBeTruthy();
    });

})
