export interface TableModel<T> {
    status: number;
    code: number;
    message: string;
    data: T[];
    pagination: Pagination;
}

interface Pagination {
    page: string;
    pageSize: string;
    totalItems: string;
    totalPages: number;
}
