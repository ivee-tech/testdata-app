import React from "react";
import { Shimmer, ShimmerElementType, ShimmerElementsGroup } from "office-ui-fabric-react";

import { DefaultItemShimmerOneRow } from './default-item-shimmer-one-row';

export class DefaultItemShimmer extends React.Component {

    render() {
        let style = { 'margin': '10px 0px' };
        return <div>
            <Shimmer
                shimmerElements={[
                    { type: ShimmerElementType.circle },
                    { type: ShimmerElementType.gap, width: '2%' },
                    { type: ShimmerElementType.line },
                ]}
            />
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
            <div style={style}><DefaultItemShimmerOneRow /></div>
        </div>
    }
}