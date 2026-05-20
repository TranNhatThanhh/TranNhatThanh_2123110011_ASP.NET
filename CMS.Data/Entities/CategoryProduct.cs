/*
 *Sinh viên: Trần Nhật Thanh
 *Mã số: 2123110011
 *Ngày tạo:14-05-2026
 *version: 1.0 
 */
using System.ComponentModel.DataAnnotations;
namespace CMS.Data.Entities
{

    public class CategoryProduct
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên danh mục không được để trống")]
        [StringLength(100)]
        public string Name { get; set; }

        public string? Description { get; set; }

        // Quan hệ: Một danh mục có nhiều sản phẩm
        public virtual ICollection<Product>? Products { get; set; }
    }
}

