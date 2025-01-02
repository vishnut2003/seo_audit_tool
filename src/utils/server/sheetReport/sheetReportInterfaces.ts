export interface ForSheetGroupInterface {
    titlelessCheck: titileLessThan30Interface[],
    titleAboveCheck: titileAbove60Interface[],
}

export interface titileLessThan30Interface {
    address: string,
    title: string,
    length: number,
}

export interface titileAbove60Interface {
    address: string,
    title: string,
    length: number,
}