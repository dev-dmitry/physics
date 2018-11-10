import React, {Component} from 'react';

class InformationBlock extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`description ${this.props.show ? 'description-open' : ''}`}>
                <div className="description__back"><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
                <div className="description__content">
                    <div>
                        <span className="description__content-entity">Теория</span>
                        <h3 className="description__content-title">{this.props.title}</h3>
                        {this.props.text}
                    </div>
                </div>
            </div>
        );
    }
}

export default InformationBlock;