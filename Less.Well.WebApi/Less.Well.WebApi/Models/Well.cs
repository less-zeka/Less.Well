using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Spatial;

namespace Less.Well.WebApi.Models
{
    public class Well
    {
        [Key]
        public int Id { get; set; }

        public DbGeography DbGeography { get; set; }

    }
}