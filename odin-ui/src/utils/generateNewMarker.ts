import { Popup, Marker, Map } from 'mapbox-gl';

/**  
 * utility function to put marker on specific location
 */
export const generateNewMarker = ({ lng, lat, map, el, title }: { lng: number, lat: number, map: Map, el: HTMLDivElement, title: string }) => {

    const popUp = new Popup({ closeButton: false, anchor: 'left', })
        .setHTML(`<div class="popup">${title}: <br/>[${lng},  ${lat}]</div>`)

    new Marker({ scale: 1.2, element: el })
        .setLngLat([lng, lat])
        .setPopup(popUp)
        .addTo(map)
}