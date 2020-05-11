import React from 'react';

class SearchCondition extends React.Component {
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
           this.props.handleConditionSearch(this.state.value);
        }, 750);
    }

    render() {
        return (
            <input
                className="form-control"
                id="search-condition"
                type="text"
                placeholder="Search condition (e.g. COVID)"
                onChange={this.doSearch}
                value={this.state.value}
            ></input> 
        )
    }
}

export default SearchCondition;