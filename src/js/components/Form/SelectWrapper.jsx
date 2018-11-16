import React, { Component } from 'react';

class SelectWrapper extends Component {
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
                <select
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    className="form-control__field"
                >
                    <option value={1}>Положительный</option>
                    <option value={0}>Отрицательный</option>
                </select>
            </div>
        );
    }
}

export default SelectWrapper;
