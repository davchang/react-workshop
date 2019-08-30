import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactModal from 'react-modal';
import ModalContainer from '../../../apps/helloWorld/index-react-modal'
import { shallow, mount } from 'enzyme';

describe('<ModalContainer>', () => {


  it('renders <ReactModal>', () => {
    const wrapper = mount(<ModalContainer />);
    expect(wrapper.find(ReactModal).length).toEqual(1);
  });

  it('initiates a closed modal', () => {
    const wrapper = mount(<ModalContainer />);
    expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(false);
  });

  it('opens modal when button is clicked', () => {
    const wrapper = mount(<ModalContainer />);
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(true);
  });

  // it('closes modal when Escape key is clicked', () => {
  //   const wrapper = mount(<ModalContainer />);
  //   wrapper.find('button').at(0).simulate('click');
  //   expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(true);
  //
  //   wrapper.find(ReactModal).simulate('keyDown', {key: 'Escape'})
  //   wrapper.update()
  //   expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(false);
  // });

  it('closes modal when close button is clicked', () => {
    const wrapper = mount(<ModalContainer />);
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(false);
  });

});

describe('<ModalContainer> contents', () => {

  it('renders children content when modal is open', () => {
    const wrapper = mount(
      <ModalContainer />
    );
    wrapper.find('button').at(0).simulate('click');

    expect(wrapper.find('.my-modal-window').exists()).toEqual(true);
    expect(wrapper.text()).toContain('Hello World!');
  });

  it('renders children content when modal is open', () => {
    const wrapper = mount(
      <ModalContainer />
    );
    wrapper.find('button').at(0).simulate('click');

    const modal = wrapper.find(ReactModal).instance().portal.content;
    expect(modal.querySelector('.my-modal-window').innerHTML).toEqual('Hello World!');
  });

});
