import React from 'react';
import $ from 'jquery'
import Datatables from 'datatables.net'
import { shallow, mount } from 'enzyme';

import Hello from '../../../apps/helloWorld/index-datatable'

$.fn.DataTable = Datatables

describe('Jquery test suite', function() {
  const wrapper = mount(<Hello />);

  it('renders without crashing', () => {
    mount(<Hello />);
  });

  it('should render Hello', function() {
    expect(wrapper.find(Hello).length).toBe(1);
  });

})
