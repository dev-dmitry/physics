import React, { Component } from 'react';
import Canvas from '../../Components/Canvas/Canvas';
import Panel from '../../Components/Panel/Panel';
import { Loader } from './Code/Loader';
import { data } from './Store';

class MotionParticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: data.title,
            theory: data.theory,
            data: null,
            item: data.item,
            confines: data.confines,
            fields: data.fields,
        };
        this.loader = null;
    }
    componentDidMount() {
        this.loader = new Loader();
    }

    updateData = value => {
        this.setState({ data: value });
        this.loader.init(value);
    };

    render() {
        return (
            <div>
                <Panel
                    title={this.state.title}
                    theory={this.state.theory}
                    updateData={this.updateData}
                    item={this.state.item}
                    confines={this.state.confines}
                    fields={this.state.fields}
                />
                <Canvas />
            </div>
        );
    }
}

export default MotionParticle;
