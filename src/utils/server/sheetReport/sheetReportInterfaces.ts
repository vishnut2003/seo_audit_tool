export interface ForSheetGroupInterface {
    titlelessCheck: titileLessThan30Interface[],
    titleAboveCheck: titileAbove60Interface[],
    metaDescBelowCheck: metaDescBelow70Interface[]
}

// Title check interfaces

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

// meta description check interface

export interface metaDescBelow70Interface {
    address: string,
    description: string,
    length: number,
}