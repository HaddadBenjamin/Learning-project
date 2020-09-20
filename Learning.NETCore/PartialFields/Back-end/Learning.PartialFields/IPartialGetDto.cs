namespace Learning.PartialFields
{
    public interface IPartialGetDto
    {
        /// <summary>
        /// Fields are separated by ',' and determine which fields must be retrieved.
        /// </summary>
        string FieldsToRetrieve { get; set; }
    }
}