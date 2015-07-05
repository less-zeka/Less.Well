using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Spatial;

namespace Less.Well.WebApi.Models
{
    public class Well
    {
        [Key]
        public int Id { get; set; }

        public DbGeography DbGeography { get; set; }

        public string Info { get; set; }

        /// GPS-Koordinaten von Bern
        /// LAT Breitengrad : 46.9167
        /// LON Längengrad : 7.4667

        /// <summary>
        /// Geographische Länge
        /// --> längs durch die Pole
        /// 0-180 östlich 
        /// und 0-180 westlich
        /// oder -west und +ost
        /// oder Ost/E West/W
        /// 
        /// Die geographische Länge (auch Längengrad oder nur Länge, λ, lateinisch longitudo, englisch longitude, 
        /// international abgekürzt mit long oder LON) beschreibt eine der beiden Koordinaten eines Ortes auf der Erdoberfläche, 
        /// und zwar seine Position östlich oder westlich einer definierten (willkürlich festgelegten) Nord-Süd-Linie, des Nullmeridians.
        /// </summary>
        [Required]
        public double Longitude { get; set; }

        /// <summary>
        /// geographische Breite
        /// --> Breiter wirds zum äquator, weniger breit zu den Polen hin
        /// -90(Südpol) - 90 (NordPol)
        /// 
        /// Die geographische Breite (auch Breitengrad), φ oder B (lateinisch latitudo, englisch latitude, international abgekürzt mit Lat. oder LAT) 
        /// ist die im Winkelmaß in der Maßeinheit Grad angegebene nördliche oder südliche Entfernung eines Punktes der Erdoberfläche vom Äquator. 
        /// Die Breite erreicht Werte von 0° (am Äquator) bis ±90°an den Polen. Statt des Vorzeichens (traditionell +Nord, −Süd) 
        /// ist auch N bzw. S zulässig, geschrieben xx° N bzw. +xx° oder xx° S bzw. -xx°.
        /// </summary>
        [Required]
        public double Latitude { get; set; }
    }
}