export interface MyTableProps<T> {
    header: string;
    headings: JSX.Element[];
    data: T[];
    dataModel: DataModel<T>,
    footer?: JSX.Element;
    pageSize?: number;
}

export type DataModel<T> = (item: T, index: number) => JSX.Element;