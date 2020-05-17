using TestData.App.UI.TestData.Data;
using System.Linq;

namespace TestData.App.UI.TestData.Models
{

    public partial class Customer : ObjectBase<string>
    {

        public System.String Id { get; set; }

        public System.String Name { get; set; }

        public System.String Code { get; set; }

        public System.String AccountNo { get; set; }

        public System.String Address { get; set; }

        public System.String ContactName { get; set; }

        public System.String ContactPhoneNo { get; set; }

        public System.Boolean HasDeliveryFees { get; set; }

        public System.Boolean HasAccountCharge { get; set; }

        public System.String Notes { get; set; }

        public System.Decimal AccountCharge { get; set; }

        public System.DateTime CommencementDate { get; set; }

        public override string Key { get => Id; set => Id = value; }

        public static FilterValueItem BuildSearchCondition(string search)
        {
            var filterValueItem = new FilterValueItem()
            {
                Key = System.Guid.NewGuid().ToString(),
                BinaryOperator = BinaryOperator.Or,
                IsGroup = true
            };
            var searchableFields = new[] 
            { 
                new { Name = "Name", Type = FieldType.String },
                new { Name = "Code", Type = FieldType.String },
                new { Name = "AccountNo", Type = FieldType.String },
                new { Name = "Address", Type = FieldType.String },
                new { Name = "ContactName", Type = FieldType.String },
                new { Name = "ContactPhoneNo", Type = FieldType.String },
                new { Name = "Notes", Type = FieldType.String },
            };
            if (!searchableFields.Any())
                return null;
            foreach (var field in searchableFields)
            {
                filterValueItem.Items.Add(new FilterValueItem()
                {
                    Field = new FilterField() { Name = field.Name, FieldType = field.Type },
                    ComparisonOperator = ComparisonOperator.Contains,
                    Value1 = search
                });
            }
            return filterValueItem;
        }

    }

}
