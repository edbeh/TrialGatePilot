import React from 'react';

class TextFilters extends React.Component {
    state = {
        value: '',
    }

    timeout = null;

    doSearch = (event) => {
        this.setState({
            value: event.target.value
        })
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
           this.props.handleChange(this.state.value);
        }, 750);
    }

    render() {
        return (
            <input
                className="form-control"
                id={this.props.id}
                type={this.props.type}
                placeholder={this.props.placeholder}
                onChange={this.doSearch}
                value={this.state.value}
            ></input> 
        )
    }
}

export default TextFilters;