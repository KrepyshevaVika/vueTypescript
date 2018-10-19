export interface IRootState {
    nodes: Array<INode>;
    infoAboutNode: INode;
    messageError: string;
}

export interface INode {
    id?: number;
    name?: string;
    ip_adress?: string;
    web_port?: number;
    type_id?: number;
    description?: IRootState;
}