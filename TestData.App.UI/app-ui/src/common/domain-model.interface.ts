
export interface IDomainModel<T> {
    init(isNew: boolean): Promise<boolean>;
    getNew(props?: any): T;
    validate();
    propertyChange(item: T): Promise<boolean>;
}
