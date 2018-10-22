import React, {Component} from 'react';
import Single from './Single';

class SingleSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.show ? 'single-options' : ''
        };
    }
    render() {
        return (
            <div className={`single-options ${this.props.show ? 'single-options-open' : ''}`}>
                <div className="single-options__back"><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
                <div className="single-options__content">
                    <div>
                        <h3 className="single-options__content-title">Выберите параметры для каждой частицы</h3>
                        <div>
                            <Single></Single>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleSettings;