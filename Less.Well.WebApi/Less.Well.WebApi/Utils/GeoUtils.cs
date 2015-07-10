using System.Data.Entity.Spatial;

namespace Less.Well.WebApi.Utils
{
    public class GeoUtils
    {
        /// <summary>
        /// Create a GeoLocation point based on latitude and longitude
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        public static DbGeography CreatePoint(double lat, double lon)
        {
            var text = string.Format("POINT({0} {1})", lat, lon);
            // 4326 is most common coordinate system used by GPS/Maps
            return DbGeography.PointFromText(text, 4326);
        }
    }
}