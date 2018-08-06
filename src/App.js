import React, { Component } from 'react';
import Header from './components/Header';
import StockSelect from './components/StockSelect'
import StockInput from './components/StockInput'
import './App.css';
import { Line, Chart } from 'react-chartjs-2';

class App extends Component {
  constructor (props) {
    super(props)

    Chart.defaults.global.defaultFontFamily = 'Inconsolata';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontColor = '#D4D4D4';
    Chart.defaults.global.animation.easing = 'easeOutQuad';
    Chart.defaults.global.animation.duration = 1500;

    this.state = {stockData: null, rstockData: null, stock: "AAPL", range: "1m",
                  dataType: "open", rstock: "FB", inputStock: '',
                  submittedStock: '', allStocks: null, isValidInput: false}
    this.onStockSelect = this.onStockSelect.bind(this)
    this.onDataSelect = this.onDataSelect.bind(this)
    this.onRangeSelect = this.onRangeSelect.bind(this)
    this.handleStockSubmit = this.handleStockSubmit.bind(this)
    this.loadStocks = this.loadStocks.bind(this)

  }

  componentDidMount () {
    this.loadStocks()
    this.getStockData(' ')
    console.log('mounted')
  }

  parse(stocks) {
    console.log('parsing')
    const allStocks = stocks.map(item => item.symbol)
    this.setState({ allStocks })
    console.log(allStocks.length + ' stocks' + allStocks[0])
  }

  loadStocks() {
    console.log('loading stocks')
    fetch(`https://api.iextrading.com/1.0/ref-data/symbols`)
      .then(response => response.json())
      .then(stocks => this.parse(stocks))
      .catch(e => e);
  }


  getStockData(side) {
    switch(side) {
      case 'left':
          console.log("fetching left for stock " + this.state.stock)
          fetch(`https://api.iextrading.com/1.0/stock/${this.state.stock}/chart/${this.state.range}`)
            .then(response => response.json())
            .then(stockData => this.setState({stockData}))
            .catch(e => e);
          break;
      case 'right':
        console.log("fetching right for stock " + this.state.rstock)
        fetch(`https://api.iextrading.com/1.0/stock/${this.state.rstock}/chart/${this.state.range}`)
          .then(response => response.json())
          .then(rstockData => this.setState({rstockData}))
          .catch(e => e);
        break;
      default:
        console.log('default in get stock data')
        fetch(`https://api.iextrading.com/1.0/stock/${this.state.stock}/chart/${this.state.range}`)
          .then(response => response.json())
          .then(stockData => this.setState({stockData}))
          .catch(e => e);
        fetch(`https://api.iextrading.com/1.0/stock/${this.state.rstock}/chart/${this.state.range}`)
          .then(response => response.json())
          .then(rstockData => this.setState({rstockData}))
          .catch(e => e)

    }
  }

  handleErrors = ((response) => {
    console.log("handling errors")
    if (!response.ok) throw Error(response.status);
    return response;
  })


  getData(stock) {
    return fetch(`https://api.iextrading.com/1.0/stock/${stock}/chart/${this.state.range}`)
            .then(this.handleErrors)
            .then(response => response.json())
            .then((output) => {
              return output;
            })
            .catch(e => console.warn(e));
  }



  formatChartData () {
    const stk = this.state.stockData
    if (stk === 'Unknown symbol') { console.log("UNKNOWN!!!!") }
    const rstk = this.state.rstockData
    var coldColor = 'rgba(75,192,192, 1)'
    var warmColor = 'rgb(255, 73, 79)'

    return {
      labels: stk.map(item => item.label),
      datasets: [
        {
          label: this.state.stock.toUpperCase() + " " + this.state.dataType,
          fill: true,
          lineTension: 0.1,
          borderColor: warmColor, //rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: warmColor,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          // easing: 'easeInOutSine',
          // duration: 1000,
          data: stk.map(item => this.getDataType(this.state.dataType, item))
        },
        {
          label: this.state.rstock.toUpperCase() + " " + this.state.dataType,
          fill: true,
          lineTension: 0.1,
          borderColor: coldColor, //'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: coldColor,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: rstk.map(item => this.getDataType(this.state.dataType, item))
        }
      ]
    }

  }

  getDataType (param, item) {
    switch(param.toLowerCase()) {
    case 'open':
      return item.open;
    case 'close':
      return item.close;
    case '% change':
      return item.changePercent;
    case 'volume':
      return item.volume;
    case 'vwap':
      return item.vwap;
    case '$ change':
      return item.change;
    case 'low':
      return item.low;
    case 'high':
      return item.high;
    case 'net change':
      return item.changeOverTime;
    default:
      return '';
  }
}

  onStockSelect (side, e) {
    console.log("on stock select " + side)
    this.setStock(side, e.target.value)
  }

  setDataType (dataType) {
    this.setState({dataType}, this.getStockData)
  }

  onDataSelect (e) {
    this.setDataType(e.target.value)
  }

  onRangeSelect(e) {
    this.setState({range: e.target.value}, this.getStockData)
  }

  handleChange(side, e){
    var stock = e.value

    switch(side) {
      case('left'):
        this.setState({ stock },
          (() => {
            console.log(' left stock after ' + this.state.stock)
            this.getStockData(side)
          }))
        break;
      case('right'):
        const rstock = stock
        this.setState({ rstock },
          (() => {
            console.log('# rstock after ' + this.state.rstock)
            this.getStockData(side)
          }))
        break;
      default:
        console.log('default in handle change')
        this.setState({ stock }, this.getStockData(side));
        this.setState({ rstock: stock }, this.getStockData(side));
    }
    console.log(`Option selected:`, stock);
  }

  handleStockInput = ((e) => {
    const inputStock = e.target.value
    if (this.state.allStocks.includes(inputStock.toUpperCase())) {
      console.log(inputStock + ' is a valid input stock')
      this.setState({ inputStock,
                      isValidInput : true }, (
        () => console.log("* " + this.state.inputStock)))
    }
    else {
      console.log(inputStock + ' is not a valid input stock')
      this.setState({ isValidInput : false})
    }
  })

  handleStockSubmit(event) {
    const submittedStock = this.state.inputStock;
    this.setState({ submittedStock },
      (() =>
        this.setState({ stock : this.state.submittedStock },
          ( () => (this.getStockData('left'))))
      ))

  }

  render() {
    const datatypes = ['OPEN', 'CLOSE', 'LOW', 'HIGH', '$ CHANGE', '% CHANGE',
                       'VOLUME', 'VWAP', 'NET CHANGE']
    const ranges = ['1d', '1m', '3m', '6m', 'ytd', '1y', '2y', '5y']
    const dataType = this.state.dataType

    if (this.state.stockData && this.state.rstockData) {
      return (
        <div className="app">
          <Header title="EGG STOCKS" />

          <div className="select-container">
            <span> stock 1: </span>
              <div className="stock-container">
                <StockSelect
                  className="stock-select"
                  handleChange={(e) => this.handleChange('left', e)}
                  selectedOption={this.state.stock}
                  color='rgb(255, 73, 79)'
                />
              </div>

            <span> stock 2: </span>
              <div className="stock-container">
                <StockSelect
                  className="stock-select"
                  handleChange={(e) => this.handleChange('right', e)}
                  selectedOption={this.state.stock}
                  color='rgb(75,192,192)'
                />
              </div>
          </div>

          <StockInput
            handleChange={this.handleStockInput}
            handleSubmit={this.handleStockSubmit}
            submittedStock={this.state.inputStock}
            isNotDisabled={this.state.isValidInput}
          />

          <div className="select-container">
            <span> data: </span>
            <select value={this.state.dataType} onChange={this.onDataSelect}>
              {
              datatypes.map((type) =>
               <option key={`${type}-${type}`} value={type}> {type} </option>
              )}
            </select>

            <span> range: </span>
            <select value={this.state.range} onChange={this.onRangeSelect}>
              {
              ranges.map((type) =>
               <option key={`${type}-${type}`} value={type}> {type} </option>
              )}
            </select>
          </div>

          <div style={{marginTop: 30}}>
            <Line
              data={() => this.formatChartData()}
              height={230}
              options={{
                animation: {
                  duration: 1000,
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      callback: function(value, index, values) {
                        const dt = dataType.toLowerCase()
                        if (dt === '% change' || dt === 'net change' ) {
                          return value + '%';
                        }
                        else if (dt === 'vwap' || dt === 'volume')
                        {
                          return value;
                        }
                        return '$' + value;
                      }
                    },
                    // type: 'logarithmic',
                  }],
                  xAxes: [{
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                      display: false,
                      autoSkip: true,
                      maxTicksLimit: 50,
                    },
                  }]
                },
                legend: {
                  position: 'top',
                  labels: {
                    fontSize: 16,
                    boxWidth: 20,
                  }
                }
              }}
            />
          </div>
        </div>
      )
    }
    return null
  }
}

export default App;
