import React, { Component } from 'react';
import FieldsFactory from '../../Components/Form/FieldsFactory';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.mask = new RegExp(`[^0-9.]`, 'g');
        this.state = {
            item: this.props.item,
            confines: this.props.confines,
            fields: this.props.fields,
        };
    }

    handleChange = name => event => {
        this.state.item[name] = event.target.value;
        this.forceUpdate();
    };
    onBlur = name => event => {
        this.state.item[name] = this.getConfines(event.target.value, name);
        this.forceUpdate();
    };
    init = () => {
        this.props.updateData(this.state.item);
    };
    getConfines = (val, name) => {
        const confines = this.state.confines[name];
        let value = Number(val.replace(this.mask, ''));
        if (confines) {
            if (value < confines.min) value = confines.min;
            if (value > confines.max) value = confines.max;
        }
        return value;
    };

    render() {
        return (
            <div className="settings">
                <div className="settings__title">Параметры</div>
                <div className="settings__field">
                    {this.state.fields.map((key, i) => (
                        <FieldsFactory
                            key={i}
                            data={key}
                            value={this.state.item[key.name]}
                            onChange={this.handleChange(key.name)}
                            onBlur={this.onBlur(key.name)}
                        />
                    ))}
                </div>
                <button onClick={this.init} className="btn btn--secondary">
                    Запустить
                </button>
            </div>
        );
    }
}

export default Settings;
