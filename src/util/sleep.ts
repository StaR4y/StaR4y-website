// src/util/sleep.ts
export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};