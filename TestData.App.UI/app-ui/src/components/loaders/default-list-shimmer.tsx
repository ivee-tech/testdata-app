import React from "react";
import { Shimmer, ShimmerElementType } from "office-ui-fabric-react";

import { DefaultListShimmerOneRow } from './default-list-shimmer-one-row';

export class DefaultListShimmer extends React.Component {

    render() {
        return <div>
            <Shimmer
                shimmerElements={[
                    { type: ShimmerElementType.circle },
                    { type: ShimmerElementType.gap, width: '2%' },
                    { type: ShimmerElementType.line },
                ]}
            />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow width="70%" />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow width="50%" />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow width="90%"/>
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow width="40%" />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow width="60%" />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow width="90%"/>
            <DefaultListShimmerOneRow />
            <DefaultListShimmerOneRow />
        </div>
    }
}