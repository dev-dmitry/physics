import React, {Component} from 'react';
import InformationBlock from '../elements/ControlPanel/InformationBlock';
import SingleSettings from './SingleSettings';

class Panel extends Component {
    constructor(props, context) {
        super(props, context);
        this.mask = new RegExp(`[^0-9.]`, 'g');
    }
    state = {
        item: {
            quantity: 3,
            charge: 1,
            duration: 2,
            induction: 5,
            size: 0.1,
        },
        itemNew: {
            quantity: Number,
            charge: Array,
            duration: Array,
            induction: Array,
            size: Array,
        },
        confines: {
            quantity: {
                min: 1,
                max: 160,
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
        theoryBlock: false
    };
    handleChange = name => event => {
        this.state.item[name] = event.target.value;
        this.forceUpdate();
    };
    onBlur = name => event => {
        this.state.item[name] = this.getConfines(event.target.value, name);
        this.forceUpdate();
    };
    getConfines = (val, name)=>{
        const confines = this.state.confines[name];
        let value = Number(val.replace(this.mask, ''));
        if(confines){
            if( value < confines.min ) value = confines.min;
            if( value > confines.max ) value = confines.max;
        }
        return value
    };
    init = () => {
        this.props.updateData(this.state.item)
    };
    toggleTheory = () => {
        this.setState({
            theoryBlock: !this.state.theoryBlock
        });
    };
    render() {
        return (
            <div className="app__sidebar panel">
                <div className="panel__options">
                    <div className="panel__options-content">
                        <div className="panel__title">{this.props.title}</div>
                        <button className="panel__btn" onClick={this.toggleTheory}>
                            Теория >
                        </button>
                        <div className="settings">
                            <div className="settings__title">Параметры</div>
                            <div className="settings__field">
                                <div className="form-control">
                                    <label className="form-control__label">Колличество частиц, ед</label>
                                    <input type="text"
                                           value={this.state.item.quantity}
                                           onChange={this.handleChange('quantity')}
                                           onBlur={this.onBlur('quantity')}
                                           className="form-control__field"/>
                                </div>
                                <div className="form-control">
                                    <label className="form-control__label">Размер частиц</label>
                                    <input type="text"
                                           value={this.state.item.size}
                                           onChange={this.handleChange('size')}
                                           onBlur={this.onBlur('size')}
                                           className="form-control__field"/>
                                </div>
                                <div className="form-control">
                                    <label className="form-control__label">Заряд частиц</label>
                                    <select value={this.state.item.charge}
                                            onChange={this.handleChange('charge')}
                                            onBlur={this.onBlur('charge')}
                                            className="form-control__field">
                                        <option value={1}>Положительный</option>
                                        <option value={0}>Отрицательный</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="form-control__label">Скорость, Мм/сек</label>
                                    <input type="text"
                                           value={this.state.item.duration}
                                           onChange={this.handleChange('duration')}
                                           onBlur={this.onBlur('duration')}
                                           className="form-control__field"/>
                                </div>
                                <div className="form-control">
                                    <label className="form-control__label">Индукция магнитного поля, 10 <sup>−5</sup> Тл</label>
                                    <input type="text"
                                           value={this.state.item.induction}
                                           onChange={this.handleChange('induction')}
                                           onBlur={this.onBlur('induction')}
                                           className="form-control__field"/>
                                </div>
                            </div>
                            <button
                                onClick={this.init}
                                className="btn btn--secondary">Запустить</button>
                        </div>
                    </div>
                </div>
                <SingleSettings
                    title={this.props.infoTitle}
                    text={this.props.infoText}
                    show={this.state.theoryBlock}></SingleSettings>
                <InformationBlock
                    title={this.props.infoTitle}
                    text={this.props.infoText}
                    show={this.state.theoryBlock}></InformationBlock>
            </div>
        );
    }
}

export default Panel;
