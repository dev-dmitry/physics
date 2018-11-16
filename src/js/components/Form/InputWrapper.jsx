import React, { Component } from 'react';

class InputWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-control">
                <label
                    className="form-control__label"
                    dangerouslySetInnerHTML={{ __html: this.props.label }}
                />
                <input
                    type={this.props.label}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    className="form-control__field"
                />
            </div>
        );
    }
}

export default InputWrapper;
