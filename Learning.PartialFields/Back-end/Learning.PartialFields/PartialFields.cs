using System;
using System.Collections.Generic;

namespace Learning.PartialFields
{
    // Tester unique
    // Teester fields & mandatory fields à null

    public interface IPartialFields
    {
        bool Contains(string field);
    }

    public class PartialFields : IPartialFields
    {
        private readonly HashSet<string> _fields;

        public PartialFields(string fields, string mandatoryFields = default) :
            this($"{fields}{mandatoryFields}".Split(',')) { }

        private PartialFields(IEnumerable<string> fields) =>
            _fields = new HashSet<string>(fields, StringComparer.InvariantCultureIgnoreCase);

        public bool Contains(string field) => _fields.Contains(field);
    }

    public interface IPartialUpdate
    {
        /// <summary>
        /// Fields are separated by ',' and determine which fields must be updated.
        /// </summary>
        string FieldsToUpdate { get; }
    }

    public interface IPartialGet
    {
        /// <summary>
        /// Fields are separated by ',' and determine which fields must be retrieved.
        /// </summary>
        string FieldsToRetrieve { get; }
    }
}
