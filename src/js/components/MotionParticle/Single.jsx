import React, {Component} from 'react';

class Single extends Component {
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
    render() {
        return (
            <div>
                <span>Частица 1</span>
                <div>
                    <div className="form-control">
                        <label className="form-control__label">Размер частицы</label>
                        <input type="text"
                               value={this.state.item.size}
                               onChange={this.handleChange('size')}
                               onBlur={this.onBlur('size')}
                               className="form-control__field"/>
                    </div>
                    <div className="form-control">
                        <label className="form-control__label">Заряд частицы</label>
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
            </div>
        );
    }
}

export default Single;