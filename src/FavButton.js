import React from 'react';

class FavButton extends React.Component {
    state = {
        favourite: false
    }

    timeout = null;

    toggleSwitch = () => {
        this.setState({
            favourite: !this.state.favourite
        })
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.props.handleClick(this.state.favourite, this.props.NCTId);
         }, 200);
    }

    componentDidMount() {
        let fav = JSON.parse(localStorage.getItem('favourite')) || [];
        if (fav.includes(this.props.NCTId)) {
            this.setState({
                favourite: true
            })
        }
        else {
            this.setState({
                favourite: false
            })
        }
        
    }

    render() {
        return (
            <span className={`button-favourite ${this.state.favourite && `favourited`}`} onClick={this.toggleSwitch} id={`fav-${this.props.NCTId}`}>
                <i className="fa fa-heart"></i> {this.state.favourite ? ' Favourited' : ' Add to Favourite'}
            </span>
        )  
    }
}

export default FavButton;