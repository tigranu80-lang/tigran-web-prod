
// Map Projection Utilities
// Supports Robinson and Mercator approximations for mapping Lat/Lon to SVG X/Y

const VIEWBOX_WIDTH = 2000;
const VIEWBOX_HEIGHT = 1000;

/**
 * Projects a Latitude/Longitude pair to X/Y coordinates on the map.
 * This uses a simplified Equirectangular/Miller projection suitable for the tech map.
 * 
 * @param lat Latitude (-90 to 90)
 * @param lng Longitude (-180 to 180)
 * @returns { x, y } coordinates relative to viewBox 0 0 2000 1000
 */
export function projectPoint(lat: number, lng: number): { x: number, y: number } {
    // Clamp values
    const safeLat = Math.max(-85, Math.min(85, lat));
    const safeLng = Math.max(-180, Math.min(180, lng));

    // X: Linear (Standard for Equirectangular/Miller)
    // 0 = -180, 2000 = +180
    const x = (safeLng + 180) * (VIEWBOX_WIDTH / 360);

    // Y: Linear approximation (Inverted because SVG Y is down)
    // 0 = +90, 1000 = -90
    // NOTE: For Mercator, we'd use log(tan(...)), but for our simplified tech map, linear is safer/cleaner.
    const y = ((-safeLat + 90) * (VIEWBOX_HEIGHT / 180));

    return { x, y };
}
