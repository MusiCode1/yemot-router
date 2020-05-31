declare function Yemot(): YemotRouter;

interface YemotRouter {
    add_fn: (path: string, handler: Handler) => void;
}
interface Call {
    read: (massage: data, mode?: string, options?: object) => Promise<string>;

    go_to_folder: (folder: string) => void;

    id_list_message: (data: data) => void;

    routing_yemot: (phone: string) => void;
}
type Handler = (p: Call) => void;

type data = {type: string, data: string};

export = Yemot;