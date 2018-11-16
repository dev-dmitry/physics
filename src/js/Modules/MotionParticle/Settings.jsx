import React, { Component } from 'react';
import InputWrapper from '../../Components/Form/InputWrapper';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.mask = new RegExp(`[^0-9.]`, 'g');
        this.state = {
            item: {
                quantity: 3,
                charge: 1,
                duration: 2,
                induction: 5,
                size: 0.1,
            },
            confines: {
                quantity: {
                    min: 1,
                    max: 50,
                },
                duration: {
                    min: 1,
                    max: 10,
                },
                induction: {
                    min: 1,
                    max: 20,
                },
                size: {
                    min: 0.05,
                    max: 0.5,
                },
            },
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
                    <InputWrapper
                        label={'Колличество частиц, ед'}
                        type="text"
                        value={this.state.item.quantity}
                        onChange={this.handleChange('quantity')}
                        onBlur={this.onBlur('quantity')}
                    />
                    <InputWrapper
                        label={'Размер частиц'}
                        type="text"
                        value={this.state.item.size}
                        onChange={this.handleChange('size')}
                        onBlur={this.onBlur('size')}
                    />
                    <InputWrapper
                        label={'Заряд частиц'}
                        type="text"
                        value={this.state.item.charge}
                        onChange={this.handleChange('charge')}
                        onBlur={this.onBlur('charge')}
                    />
                    <InputWrapper
                        label={'Скорость, Мм/сек'}
                        type="text"
                        value={this.state.item.duration}
                        onChange={this.handleChange('duration')}
                        onBlur={this.onBlur('duration')}
                    />
                    <InputWrapper
                        label={'Индукция магнитного поля, 10 <sup>−5</sup> Тл'}
                        type="text"
                        value={this.state.item.induction}
                        onChange={this.handleChange('induction')}
                        onBlur={this.onBlur('induction')}
                    />
                </div>
                <button onClick={this.init} className="btn btn--secondary">
                    Запустить
                </button>
            </div>
        );
    }
}

export default Settings;
