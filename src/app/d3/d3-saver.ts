export class D3Saver {
    public static saveSvg(svg: any) {
        if (!svg) {
            return;
        }
        const serializer = new window.XMLSerializer;
        const string = serializer.serializeToString(svg.node());
        // TODO, should zip/unzip file
        return string;
    }
}