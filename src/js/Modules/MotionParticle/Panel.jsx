import React, { Component } from 'react';
import Settings from './Settings';
import InformationBlock from '../../Components/InformationBlock';

class Panel extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            theoryBlock: false,
        };
        //TODO обращаться к элементу не через дом модель
        setTimeout(() => {
            const main = document.querySelector('.app__main');
            main.addEventListener('click', () => this.toggleTheory(true));
        }, 0);
    }

    toggleTheory = off => {
        const result = off ? false : !this.state.theoryBlock;
        this.setState({
            theoryBlock: result,
        });
    };

    render() {
        return (
            <div className="app__sidebar panel" id={'js-sidebar'}>
                <div className="panel__options">
                    <div className="panel__options-content">
                        <div className="panel__title">{this.props.title}</div>
                        <button className="panel__btn" onClick={this.toggleTheory}>
                            Теория >
                        </button>
                        <Settings
                            item={this.props.item}
                            confines={this.props.confines}
                            fields={this.props.fields}
                            updateData={this.props.updateData}
                        />
                    </div>
                </div>
                <InformationBlock
                    title={this.props.infoTitle}
                    text={this.props.infoText}
                    show={this.state.theoryBlock}
                />
            </div>
        );
    }
}

export default Panel;
