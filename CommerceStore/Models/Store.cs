using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CommerceStore.Models
{
    public class Store
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Address { get; set; }

        public DateTime CreatedAt { get; set; }

        public IList<Sales> ProductSold { get; set; }
    }
}