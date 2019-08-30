import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import ModalContainer from '../../../apps/helloWorld/index-bootstrap-modal-2'
import { shallow, mount } from 'enzyme';

describe('<ModalContainer>', () => {
  it('renders <Modal>', () => {
    const wrapper = shallow(<ModalContainer />);
    expect(wrapper.find(Modal).length).toEqual(1);
  });

  it('initiates a closed modal', () => {
    const wrapper = shallow(<ModalContainer />);
    expect(wrapper.find(Modal).prop('show')).toEqual(false);
  });

  it('opens modal when button is clicked', () => {
    const wrapper = mount(<ModalContainer />);
    wrapper.find(Button).at(0).simulate('click');

    expect(wrapper.find(Modal).prop('show')).toEqual(true);
    expect(wrapper.find(Modal).text()).toContain('Foo Title');
    expect(wrapper.find(Modal).find(Modal.Header).length).toEqual(1);
    expect(wrapper.find(Modal).find(Modal.Body).length).toEqual(1);
    expect(wrapper.find(Modal).find(Modal.Footer).length).toEqual(1);
  });

  it('closes modal when button is clicked again', () => {
    const wrapper = shallow(<ModalContainer />);
    wrapper.find(Button).at(0).simulate('click');
    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.find(Modal).prop('show')).toEqual(false);
  });

});

describe('<ModalContainer> contents', () => {

  it('renders children content when modal is open', () => {
    const wrapper = mount(
      <ModalContainer />
    );
    wrapper.find(Button).at(0).simulate('click');

    expect(wrapper.find('.my-modal-window').exists()).toEqual(true);
    expect(wrapper.text()).toContain('Hello World!');
  });

});
