import React, { Component } from 'react';
import Input from './Fields/Input';
import Select from './Fields/Select';

class FieldsFactory extends Component {
    constructor(props) {
        super(props);
    }
    definitionTypeField = () => {
        const data = this.props.data;
        if (data.type === 'input') {
            return (
                <Input
                    label={data.label}
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                />
            );
        } else if (data.type === 'select') {
            return (
                <Select
                    label={data.label}
                    options={data.options}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                />
            );
        }
    };
    render() {
        return <div>{this.definitionTypeField()}</div>;
    }
}

export default FieldsFactory;
