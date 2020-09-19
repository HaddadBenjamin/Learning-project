using System;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;

namespace Learning.PartialFields
{
    public interface IPartialFields
    {
        bool Contains(string field);
    }

    public class PartialFields : IPartialFields
    {
        private readonly HashSet<string> _fields;

        public PartialFields(string fields, string mandatoryFields = default) :
            this($"{fields},{mandatoryFields}".Split(',').Where(_ => !string.IsNullOrWhiteSpace(_))) { }

        public PartialFields(IEnumerable<string> fields) =>
            _fields = new HashSet<string>(fields, StringComparer.InvariantCultureIgnoreCase);

        public bool Contains(string field) => _fields.Contains(field);
    }
}
