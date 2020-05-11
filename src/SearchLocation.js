import React from 'react';

class SearchLocation extends React.Component {
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
           this.props.handleLocationSearch(this.state.value);
        }, 750);
    }

    render() {
        return (
            <input
                className="form-control"
                id="search-location"
                type="text"
                placeholder=""
                onChange={this.doSearch}
                value={this.state.value}
            ></input> 
        )
    }
}

export default SearchLocation;