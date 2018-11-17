import React, { Component } from 'react';

class Label extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <label
                className="form-control__label"
                dangerouslySetInnerHTML={{ __html: this.props.value }}
            />
        );
    }
}

export default Label;
