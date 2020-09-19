namespace Learning.PartialFields
{
    public interface IPartialUpdate
    {
        /// <summary>
        /// Fields are separated by ',' and determine which fields must be updated.
        /// </summary>
        string FieldsToUpdate { get; }
    }
}