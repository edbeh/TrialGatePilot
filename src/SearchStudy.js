import React from 'react';

class SearchStudy extends React.Component {
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
           this.props.handleStudySearch(this.state.value);
        }, 750);
    }

    render() {
        return (
            <input
                className="form-control"
                id="search-study"
                type="text"
                placeholder=""
                onChange={this.doSearch}
                value={this.state.value}
            ></input> 
        )
    }
}

export default SearchStudy;