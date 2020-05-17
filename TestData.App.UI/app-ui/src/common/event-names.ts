export class EventNames {
    static BACKGROUND_SELECTED: string = 'BACKGROUND_SELECTED';
    static NODE_SELECTED: string = 'NODE_SELECTED';
    static EDGE_SELECTED: string = 'EDGE_SELECTED';
    static META_BACKGROUND_SELECTED: string = 'META_BACKGROUND_SELECTED';
    static META_NODE_SELECTED: string = 'META_NODE_SELECTED';
    static META_EDGE_SELECTED: string = 'META_EDGE_SELECTED';

    static SAVE_ITEM: string = 'SAVE_ITEM';
    static REFRESH_ITEM: string = 'REFRESH_ITEM';
    static NAVIGATE_TO_LIST: string = 'NAVIGATE_TO_LIST';
    static NEW_ITEM: string = 'NEW_ITEM';

    static SAVE_AGGREGATE: string = 'SAVE_AGGREGATE';

    static FORM_LOADED: string = 'FORM_LOADED';
    static ITEM_LOADED: string = 'ITEM_LOADED';
    static LIST_LOADED: string = 'LIST_LOADED';
    static LINK_LIST_LOADED: string = 'LINK_LIST_LOADED';
    static MAIN_FORM_LOADED: string = 'MAIN_FORM_LOADED';
    static ITEM_UPDATED: string = 'ITEM_UPDATED';
    static LINK_ITEM_UPDATED: string = 'LINK_ITEM_UPDATED';

    static GENERATE_REPORT = 'GENERATE_REPORT';
}

export type NodeSelected = { node: any };
export type EdgeSelected = { edge: any }