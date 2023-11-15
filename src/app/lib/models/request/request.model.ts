import { LabelsModel } from "app/shared/table/table.model";

export class Request {
  idRequest: number;
  Category: string;
  constructor(private request: RequestModel) {
    this.idRequest = request.idRequest;

    this.Category = request.Category;
  }

  get statusName(): LabelsModel[] {
    const colors = {
      rechazado: {
        textClass: "text-red",
        bgClass: "bg-red/10",
        previewClass: "bg-red",
      },
      solucionado: {
        textClass: "text-green",
        bgClass: "bg-green/10",
        previewClass: "bg-green",
      },
      "en espera": {
        textClass: "text-amber",
        bgClass: "bg-amber/10",
        previewClass: "bg-amber",
      },
      inactivo: {
        textClass: "text-amber",
        bgClass: "bg-amber/10",
        previewClass: "bg-amber",
      },
    };
    return [
      {
        text: this.request.statusName,
        ...colors[this.request.statusName.toLowerCase()],
      },
    ];
  }

  set statusName(data) {}
  get custom(): Custom {
    const fechaOriginal = this.request.custom.time;
    const fechaUTC = new Date(fechaOriginal);
    const fechaLocal = new Date(
      fechaUTC.getTime() + fechaUTC.getTimezoneOffset() * 60000
    );

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat("es-ES", options);
    const fechaTransformada: string = formatter.format(fechaLocal);
    const tiempoArray = fechaLocal.toTimeString().split(" ")[0].split(":");
    const tiempoFormateado = `${tiempoArray[0]}:${tiempoArray[1]}:${tiempoArray[2]}`;
    return {
      time: `${fechaTransformada} ${tiempoFormateado}`,
      identification: this.request.custom.identification,
    };
  }
  set custom(data) {}
}

export interface RequestModel {
  idRequest: number;
  custom: Custom;
  statusName: string;
  Category: string;
}

interface Custom {
  time: string;
  identification: string;
}
