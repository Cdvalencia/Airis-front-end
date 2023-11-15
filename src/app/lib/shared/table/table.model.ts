export interface TableColumnsModel {
  label: string;
  property: string;
  type:
    | "text"
    | "image"
    | "badge"
    | "progress"
    | "checkbox"
    | "button"
    | "icons"
    | "labels"
    | "date"
    | "toggle"
    | "actions";
  visible?: boolean;
  cssClasses?: string[];
  formatDate?: "dd/MM/yyyy, hh:mm a" | string;
}

export interface LabelsModel {
  text: string;
  textClass: string;
  bgClass: string;
  previewClass: string;
}

export interface IconsModel {
  icons: string;
  textClass: string;
  bgClass: string;
  previewClass: string;
}

export interface ActionsModel {
  text: string;
  icon: string;
  color?: string;
  property: string;
}
export interface EventTableModel<T, E> {
  data: T;
  event: E;
}
