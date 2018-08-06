import React from 'react';
import Select from 'react-select';
import { groupedOptions } from './stockdata.js';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);


const customStyles = textColor => ({
  control: styles => {
    return {
      ...styles,
      backgroundColor: 'rgba(25, 25, 25, 0.3)',
      color: 'white'
    }
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'grey';
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected ? color : isFocused ? 'rgb(229, 230, 232)' : null,
      color: isDisabled
        ? '#ccc'
        : isSelected | isFocused
          ? 'white'
          : color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  singleValue: (styles, {data}) => {
    return {
      color: textColor,
      fontFamily: 'Montserrat'
    }
  }
})


class StockSelect extends React.Component {
  state = {
    selectedOption: 'APPL',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        style={{
          boxShadow: 'none',
          outline: 'none',
        }}
        // defaultValue={stockOptions[1]}
        formatGroupLabel={formatGroupLabel}
        value={selectedOption}
        onChange={function(e) {this.props.handleChange(e); this.handleChange(e)}.bind(this)}
        styles={customStyles(this.props.color)}
        options={groupedOptions}
        isSearchable={true}
        placeholder={'Select...'}
        autosize={true}
        clearable={false}
      />
    );
  }
}

export default StockSelect