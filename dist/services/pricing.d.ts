export interface PriceInfo {
    productId: string;
    price: number;
    currency: string;
    lastUpdated: Date;
}
export declare function getPrice(productId: string): Promise<PriceInfo | null>;
export declare function updatePrice(productId: string, newPrice: number): Promise<boolean>;
//# sourceMappingURL=pricing.d.ts.map