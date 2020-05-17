import React from "react";
import { Stack, Label, Spinner, IStackTokens, SpinnerSize } from "office-ui-fabric-react";

import './rotating-spinner.css';

declare type RotatingSpinnerProps = { spinnerType?: string, isRunning?: boolean }

export class RotatingSpinner extends React.Component<RotatingSpinnerProps> {

    render() {
        let { spinnerType, isRunning } = this.props;
        if (spinnerType === 'spinner-circles')
            return (
                <div>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-folding-cube')
            return (
                <div >
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-cube-grid')
            return (
                <div>
                    <div className="sk-cube-grid">
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-circle')
            return (
                <div>
                    <div className="sk-circle">
                        <div className="sk-circle1 sk-child"></div>
                        <div className="sk-circle2 sk-child"></div>
                        <div className="sk-circle3 sk-child"></div>
                        <div className="sk-circle4 sk-child"></div>
                        <div className="sk-circle5 sk-child"></div>
                        <div className="sk-circle6 sk-child"></div>
                        <div className="sk-circle7 sk-child"></div>
                        <div className="sk-circle8 sk-child"></div>
                        <div className="sk-circle9 sk-child"></div>
                        <div className="sk-circle10 sk-child"></div>
                        <div className="sk-circle11 sk-child"></div>
                        <div className="sk-circle12 sk-child"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-rects')
            return (
                <div>
                    <div className="spinner-rects">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-cubes')
            return (
                <div >
                    <div className="spinner-cubes">
                        <div className="cube1"></div>
                        <div className="cube2"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-scaleout')
            return (
                <div>
                    <div className="spinner-scaleout"></div>
                </div>);
        if (spinnerType === 'spinner-dots')
            return (
                <div>
                    <div className="spinner-dots">
                        <div className="dot1"></div>
                        <div className="dot2"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-bounce')
            return (
                <div>
                    <div className="spinner-bounce">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>);
        if (spinnerType === 'spinner-fading-circle')
            return (
                <div >
                    <div className="sk-fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                    </div>
                </div>);
        return (
            <div>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>);
    }
}
