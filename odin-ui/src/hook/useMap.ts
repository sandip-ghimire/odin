import { Map } from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { generateNewMarker } from '../utils/generateNewMarker';
import { initMap } from '../utils/initMap';
import { getData } from "../utils/getdata";
import { getEnvironments } from '../utils/getEnviroments';

export const useMap = (container: React.RefObject<HTMLDivElement>) => {

    const mapInitRef = useRef<Map | null>(null);
    const rootUrl = getEnvironments('REACT_APP_BACKEND_URL') as string;
    const featureDetailsUrl = `${rootUrl}object-location` as string;

    useEffect(() => {

        /** initialize map */
        if (container.current) {
            mapInitRef.current = initMap(
                container.current,
                [22.4673, 59.8613]
            );

            /** fetch ship/lighthouse coordinates from backend and show in map */
            getData(featureDetailsUrl).then(response => {
                if ('features' in response) {
                    response.features.forEach((feature) => {
                        const lat = feature['geometry']['coordinates'][0];
                        const lng = feature.geometry.coordinates[1];
                        const title = feature.properties.title;

                        const el = document.createElement('div');
                        el.className = title === 'Ship' ? 'shipmarker' : 'lighthousemarker';

                        if (mapInitRef.current) {
                            const map = mapInitRef.current;
                            generateNewMarker({ lng, lat, map, el, title })
                        }
                    });
                }
            });
        }

    }, []);

    useEffect(() => {

        /** show center location on map after map loads */
        const el = document.createElement('div');
        el.className = 'location';
        const title = 'center'
        mapInitRef.current && mapInitRef.current.on('load', () => generateNewMarker({ map: mapInitRef.current!, ...mapInitRef.current!.getCenter(), el, title }))

        return () => { mapInitRef.current?.off('load', generateNewMarker) }
    }, [])

    useEffect(() => {
        const map = mapInitRef.current;
        const imgDetailsUrl = `${rootUrl}sar-images`

        /** fetch the sar image from backend and overlay on the map */
        getData(imgDetailsUrl).then(response => {
            let imgName = null;
            let coordinates = null;

            if ('name' in response) {
                imgName = response['name'];
            }

            if ('coordinates' in response) {
                coordinates = response['coordinates'];
            }

            map && imgName && coordinates && map.on('load', () => {
                map.addSource('imgsrc', {
                    "type": "image",
                    "url": `${rootUrl}images/${imgName}`,
                    "coordinates": coordinates
                });

                map.addLayer({
                    "id": "overlay",
                    "source": "imgsrc",
                    "type": "raster",
                    "paint": {
                        "raster-opacity": 0.80
                    }
                })
            });
        })
    }, [])
}