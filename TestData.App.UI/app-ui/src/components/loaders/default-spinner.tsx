import React from "react";
import { Stack, Label, Spinner, IStackTokens, SpinnerSize } from "office-ui-fabric-react";

declare type DefaultSpinnerProps = { label?: string, labelPosition?: 'top' | 'right' | 'bottom' | 'left' }

export class DefaultSpinner extends React.Component<DefaultSpinnerProps> {
    private stackTokens: IStackTokens = {
        childrenGap: 20,
        maxWidth: 250,
      };
    
    render() {
        let { label, labelPosition} = this.props;
        return (
        <Stack tokens={this.stackTokens}>
            <div>
                <Spinner size={SpinnerSize.large} label={label} labelPosition={labelPosition} />
            </div>
        </Stack>
        );
    }
}