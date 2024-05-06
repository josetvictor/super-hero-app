export class PaginateDto<T> {
    data: T[];
    totalPage: number;
    count: number;
}