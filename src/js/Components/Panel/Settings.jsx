import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FieldsFactory from '../Form/FieldsFactory';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.mask = new RegExp(`[^0-9.]`, 'g'); //TODO можно вынести
        this.state = {
            item: this.props.item,
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
    init = () => this.props.updateData(this.state.item);
    stop = () => this.props.updateData(false);
    getConfines = (val, name) => {
        //TODO можно вынести
        const data = this.state.fields[name];
        const confines = data.range;
        let value = Number(val.replace(this.mask, ''));
        value = this.checkTypeField(value, data.typeValue);
        if (confines) {
            if (value < confines.min) value = confines.min;
            if (value > confines.max) value = confines.max;
        }
        return value;
    };
    checkTypeField = (value, type) => {
        //TODO можно вынести
        switch (type) {
            case 'int':
                return Math.round(value);
            default:
                return value;
        }
    };

    render() {
        const fields = this.state.fields;
        return (
            <div className="settings">
                <div className="settings__title">Параметры</div>
                <div className="settings__field">
                    {Object.keys(fields).map((key, i) => (
                        <FieldsFactory
                            key={i}
                            data={fields[key]}
                            value={this.state.item[key]}
                            onChange={this.handleChange(key)}
                            onBlur={this.onBlur(key)}
                        />
                    ))}
                </div>
                <ReactCSSTransitionGroup
                    transitionName="button"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    <button onClick={this.init} className="settings__button btn btn--secondary">
                        Запустить
                    </button>
                    {this.props.data ? (
                        <button onClick={this.stop} className="settings__button btn btn--tertiary">
                            Стоп
                        </button>
                    ) : (
                        ''
                    )}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Settings;
