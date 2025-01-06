export interface ForSheetGroupInterface {
    titlelessCheck: titileLessThan30Interface[],
    titleAboveCheck: titileAbove60Interface[],
    metaDescBelowCheck: metaDescBelow70Interface[],
    metaDescOverCheck: metaDescOver155Interface[],
    metaDescEmpty: metaDescEmptyInterface[],
    imageAltMissing: imagesAltMissingInterface[],
    imageOver100Kb: imageFileSizeOver100KbInterface[],
    h1Missing: H1MissingInterface[],
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

export interface metaDescOver155Interface {
    address: string,
    description: string,
    length: number,
}

export interface metaDescEmptyInterface {
    address: string,
    description: string,
    length: number,
}

// images checks

export interface imagesAltMissingInterface {
    title: string,
    address: string,
    image_url: string,
}

export interface imageFileSizeOver100KbInterface {
    title: string,
    address: string,
    image_url: string,
    file_size: string,
}

// Heading 1 check

export interface H1MissingInterface {
    title: string,
    address: string,
}