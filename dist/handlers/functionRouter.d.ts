export interface FunctionCall {
    name: string;
    arguments: Record<string, any>;
}
export interface FunctionResult {
    success: boolean;
    data?: any;
    error?: string;
}
export declare function handleFunctionCall(functionCall: FunctionCall): Promise<FunctionResult>;
//# sourceMappingURL=functionRouter.d.ts.map