export interface ResourceAndLink {
    idSource: string;
    idLink: string[];
    type: string; // s: source, t: target: TODO: should be enum
    d3Path?: any;
}