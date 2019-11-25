import React from 'react';
import currencies from "../meta/currencies";
import Option from "./Option";
import CurrencyBox from "./CurrencyBox";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            options: currencies,
            amount: "",
            USD: {},
            EUR: {},
            GBP: {},
            updated: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        setInterval(() => this.fetchData(), 60000);
    }

    fetchData = () => {
        fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    USD: data.bpi.USD,
                    EUR: data.bpi.EUR,
                    GBP: data.bpi.GBP,
                    updated: data.time.updated
                });
            });
    };

    handleChange(event) {
        this.setState({amount: event.target.value});
    }

    handleClick(id) {
        this.changeDisplayState(id);
    }

    handleSelect(event) {
        const id = parseInt(event.target.value);
        this.changeDisplayState(id);
    }

    changeDisplayState(id) {
        this.setState(prevState => {
            const updatedView = prevState.options.map(item => {
                if (item.id === id) {
                    item.display = !item.display;
                }
                return item;
            });
            return {options: updatedView};
        });
    }


    render() {
        const displayOptions = this.state.options
            .map(item => item.display ? null :
                <Option
                    key={item.id}
                    item={item}
                    handleClick={this.handleClick}
                />
            );

        const displayBoxes = this.state.options.map(item => item.display ?
            <CurrencyBox
                key={item.id}
                item={item}
                state={this.state}
                handleClick={this.handleClick}
            /> : null);

        return (
            <div className="converter-form">
                <select style={{margin: "1.5em 0 2em 30px"}} onChange={this.handleSelect}>{displayOptions}</select>
                <div className="input-bct">
                    <input type="number" onChange={this.handleChange} placeholder="Enter BTC"/>
                    <label>BTC</label>
                </div>
                {displayBoxes}
                <span>Updated: {this.state.updated}</span>
            </div>
        );
    }
}

export default App;
