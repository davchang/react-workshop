import React, { useEffect } from 'react';
import { shallow, mount, render } from 'enzyme';

import Hello from '../../../apps/helloWorld/index-jquery'

describe('Jquery test suite', function() {
  const wrapper = render(<Hello />);

  // it('renders without crashing', () => {
  //   mount(<Hello />);
  // });

  it('should render Hello', function() {
    expect(wrapper.find('#username').length).toBe(1);
  });
})
