import { IProductCategory } from 'app/shared/model//product-category.model';

export const enum Size {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL'
}

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    imageContentType?: string;
    image?: any;
    price?: number;
    size?: Size;
    productCategory?: IProductCategory;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public price?: number,
        public size?: Size,
        public productCategory?: IProductCategory
    ) {}
}
