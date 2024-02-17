export interface SpotInterface {
    id: number,
    type: string,
    geometry: SpotGeometry,
    properties: SpotProperties,
}

export interface SpotGeometry {
    type: string,
    coordinates: number[],
}

export interface SpotProperties {
    user: number,
    title: string,
    spotType: SpotType,
    description: string,
    likes: number[],
    timestamp: string,
    followers: number[]
}

export type SpotType = 'Skatepark' | 'Street' | 'D.I.Y';

export const DEFAULT_SPOT: SpotInterface = {
    id: 1,
    type: "Feature",
    geometry: {
        "type": "Point",
        "coordinates": [
            -5.949943084363627,
            54.60604904587023
        ]
    },
    properties: {
        user: 1,
        title: "first spot in the new db",
        spotType: "Street",
        description: "its a street spot",
        likes: [
            1,
            2
        ],
        timestamp: "2023-12-13T22:17:38.843793Z",
        followers: [
            1,
            2
        ]
    }
}

export interface SpotListDTO {
    id: number,
    name: string,
    timestamp: string,
    user: number,
}