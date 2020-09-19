namespace Learning.PartialFields
{
    public interface IPartialGet
    {
        /// <summary>
        /// Fields are separated by ',' and determine which fields must be retrieved.
        /// </summary>
        string FieldsToRetrieve { get; }
    }
}