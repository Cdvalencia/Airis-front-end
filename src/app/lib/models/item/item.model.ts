
export class Item {
    id: number;
    name: string;
    type: number;
    constructor(private request: RequestModel) {
        this.id = request.id;
        this.name = request.name;
        this.type = request.type;
    }

    // get statusName(): LabelsModel[] {
    //     const colors = {
    //         rechazado: {
    //             textClass: 'text-red',
    //             bgClass: 'bg-red/10',
    //             previewClass: 'bg-red',
    //         },
    //         solucionado: {
    //             textClass: 'text-green',
    //             bgClass: 'bg-green/10',
    //             previewClass: 'bg-green',
    //         },
    //         'en espera': {
    //             textClass: 'text-amber',
    //             bgClass: 'bg-amber/10',
    //             previewClass: 'bg-amber',
    //         },
    //     };
    //     return [
    //         {
    //             text: this.request.statusName,
    //             ...colors[this.request.statusName],
    //         },
    //     ];
    // }

    // set statusName(data) {}
    get custom(): Custom {
        const date = new Date(this.request.custom.time);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return {
            time: formattedDate,
            id: this.request.id,
        };
    }
    set custom(data) {}
}

export interface RequestModel {
    id: number;
    name: string;    
    type: number;
    custom: Custom;
}

interface Custom {
    time: string;
    id: number;
}
