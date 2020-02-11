using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CommerceStore.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Price {get;set;}

        public IList<Sales> ProductSold{ get; set; }
    }
}
