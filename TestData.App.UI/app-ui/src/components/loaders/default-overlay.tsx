import React, { CSSProperties } from 'react';

declare type DefaultOverlayProps = { children?: any }

export class DefaultOverlay extends React.Component<DefaultOverlayProps> {

    private styles: CSSProperties = {
        background: 'rgba(0, 0, 0, 0.4)',
        top: '0',
        bottom: '0',
        color: 'white',
        left: '0',
        padding: '10px',
        position: 'fixed',
        right: '0',
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    };

    private childStyles: CSSProperties = {
        margin: 'auto auto',
        top: '40%',
        position: 'relative',
        width: '40px',
        height: '40px',
        zIndex: 9999
    };

    render() {
        return (
            <div style={this.styles}>
                <div style={this.childStyles}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}