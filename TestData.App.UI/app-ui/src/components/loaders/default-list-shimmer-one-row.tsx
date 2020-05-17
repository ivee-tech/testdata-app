import React from "react";
import { Shimmer, ShimmerElementType } from "office-ui-fabric-react";

declare type DefaultListShimmerOneRowProps = { width?: string };

export class DefaultListShimmerOneRow extends React.Component<DefaultListShimmerOneRowProps> {

    render() {
        let { width } = this.props;
        return (
            <Shimmer
                width={ width ? width : '100%' }
                shimmerElements={[
                    { type: ShimmerElementType.circle, height: 24 },
                    { type: ShimmerElementType.gap, width: '2%' },
                    { type: ShimmerElementType.line, height: 16, width: '20%' },
                    { type: ShimmerElementType.gap, width: '5%' },
                    { type: ShimmerElementType.line, height: 16, width: '20%' },
                    { type: ShimmerElementType.gap, width: '10%' },
                    { type: ShimmerElementType.line, height: 16, width: '15%' },
                    { type: ShimmerElementType.gap, width: '10%' },
                    { type: ShimmerElementType.line, height: 16 },
                ]}
            />
        );
    }
}