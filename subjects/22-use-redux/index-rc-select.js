import React from 'react';
import Select, { Option } from 'rc-select';
// import '../assets/index.less';

export default function HelloWorld() {
  const cases = {
    0: { name: 'Case 1' },
    1: { name: 'Case 2' },
    2: { name: 'Case 3' },
  };

  const options = [
    {value: 'IBC 2015', label: 'IBC 2015'},
    {value: 'ABC 2018', label: 'ABC 2018'},
    {value: 'DEF 2019', label: 'DEF 2019'}
  ]

  const myOptions = options.map(function(item) {
    console.log(item.value, '   ', item.label)
    return (
      <Option value={item.value}>{item.label}</Option>
    )
  })

  return (
    <div>
      <h2>Select optionLabelProp</h2>
      <Select style={{ width: 500 }} optionLabelProp="children" multiple allowClear>
        {Object.keys(cases).map(key => (
          <Option key={key} value={key}>
            {cases[key].name}
          </Option>
        ))}
      </Select>
    </div>
  );
}
