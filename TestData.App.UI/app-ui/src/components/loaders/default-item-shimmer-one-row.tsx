import React from "react";
import { Shimmer, ShimmerElementType } from "office-ui-fabric-react";

declare type DefaultItemShimmerOneRowProps = { width?: string };

export class DefaultItemShimmerOneRow extends React.Component<DefaultItemShimmerOneRowProps> {

    render() {
        let { width } = this.props;
        return (
            <Shimmer
                width={ width ? width : '100%' }
                shimmerElements={[
                    { type: ShimmerElementType.circle, height: 24 },
                    { type: ShimmerElementType.gap, width: '2%' },
                    { type: ShimmerElementType.line, height: 40, width: '40%' },
                    { type: ShimmerElementType.gap, width: '5%' },
                    { type: ShimmerElementType.line, height: 40, width: '40%' },
                ]}
            />
        );
    }
}