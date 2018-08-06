import React from 'react';
import { FormControl, Form } from 'react-bootstrap';

class StockInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submittedStock: ''};
  }

  handleChange = (e) => {
    var submittedStock = e.target.value
    console.log("in stock input, submitted stock: " + submittedStock)
    this.setState({submittedStock});
  }

  handleSubmit (event) {
    event.preventDefault();
  }

  render() {
    const submittedStock = this.state;
    return (
      <Form inline onSubmit={function(e) {this.props.handleSubmit(e); this.handleSubmit(e)}.bind(this)}>
          <FormControl
            type="text"
            style={{backgroundColor: 'rgba(25, 25, 25, 0.3)', color: '#e0e0e0',
            fontWeight: 700, margin: 5, padding: 20, paddingLeft: 10}}
            value={this.submittedStock}
            placeholder="Type to search..."
            onChange={function(e) {this.props.handleChange(e); this.handleChange(e)}.bind(this)}
          />{'   '}
        <button className="button" type="submit" disabled={!this.props.isNotDisabled}>Graph</button>
      </Form>
    );
  }
}

export default StockInput