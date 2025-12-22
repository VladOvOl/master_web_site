import { apiPrivate } from "../api/api_private"

export async function getAllAidPoints(params) {
    const response = await apiPrivate.
        get(`/aid-point/get-all-within-range`,{params})
    return response
}
/*?latitude=${latitude}&longitude=${longitude}&range=${range}&location-type-id=${locationId}&search-query=${name}*/

export async function getAllAidPointsForChats(latitude: number, longitude: number) {
    const response = await apiPrivate.
    get(`/aid-point/get-all-within-range?latitude=${latitude}&longitude=${longitude}&range=${10000}`)
    return response
}
export async function getAidPoint(param:string) {
    const response = await apiPrivate.get(`/aid-point/${param}`)
    return response
}

export async function createAidPoint(body) {
    const response = await apiPrivate.post('/aid-point',body)
    return response
}