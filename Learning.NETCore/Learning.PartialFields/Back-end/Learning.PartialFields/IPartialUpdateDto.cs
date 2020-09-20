namespace Learning.PartialFields
{
    public interface IPartialUpdateDto
    {
        /// <summary>
        /// Fields are separated by ',' and determine which fields must be updated.
        /// </summary>
        string FieldsToUpdate { get; set; }
    }
}