import React from 'react';
import { ButtonInfo } from './SlideIn.js';

class CheckRecruiting extends React.Component {
    state = {
        checked: false
    }

    timeout = null;

    toggleSwitch = () => {
        this.setState({
            checked: !this.state.checked
        })
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.props.handleClick(this.state.checked);
         }, 100);
    }

    render() {
        return (
            <div className="form-check form-check-inline">
                <input 
                    onChange={this.toggleSwitch} 
                    className="form-check-input" 
                    type="checkbox" 
                    id={this.props.id} 
                    value="" 
                    checked={this.state.checked} 
                />
                <label className="form-check-label" for="inlineCheckbox1">{this.props.name} {this.props.tooltip && <ButtonInfo content={this.props.tooltip} />} </label>
            </div>
        )  
    }
}

export default CheckRecruiting;