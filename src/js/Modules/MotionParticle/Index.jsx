import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import Panel from './Panel';
import Loader from './code/loader';

class MotionParticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Движение частиц с одинаковым радиусом',
            theory: {
                title: 'Движение частиц с одинаковым радиусом',
            },
            data: null,
        };
        setTimeout(() => {
            this.loader = new Loader();
        }, 0);
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
                    infoTitle={this.state.theory.title}
                    infoText={
                        <span>
                            <p>
                                На заряженную частицу движущеюся в магнитном поле действут сила
                                Лоренса. Она перпендикулярна к вектору скорости и к вектору
                                индукции. Если скорость перпендикулярна к магнитному полю, частица
                                движется по окружности.
                            </p>
                            <p>
                                {' '}
                                Радиус этой окружности зависит от заряда этой частицы, ее скорости и
                                индукции магнитного поля. Период обращения частицы зависит от массы,
                                заряда частицы, индукции поля. Но не зависит от скорости частицы.
                            </p>
                            <p>
                                Если векторы скорости отличаются лишь по направлению, то частиц
                                будут описывать окружности одинакового радиуса. Если скорости
                                различны по величине, то различными будут и радиусы окружностей, но
                                периоды обращения будут одинаковыми. С увеличением индукции поля
                                радиус окружности, а следовательно и период обращения, уменьшаются.
                            </p>
                        </span>
                    }
                    updateData={this.updateData}
                />
                <Canvas />
            </div>
        );
    }
}

export default MotionParticle;
