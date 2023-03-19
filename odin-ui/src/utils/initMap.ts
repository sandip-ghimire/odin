import { Map } from 'mapbox-gl';
import { getEnvironments } from './getEnviroments';

/** 
 *  utility function to initialize the map
 */
export const initMap = (container: HTMLDivElement, coords: [number, number]) => {
    const apiKey = getEnvironments('REACT_APP_API_KEY') as string;

    const map = new Map({
        container,
        style: "mapbox://styles/mapbox/streets-v11",
        pitchWithRotate: false,
        center: coords,
        zoom: 10,
        accessToken: apiKey,
        doubleClickZoom: false
    });

    return map
}