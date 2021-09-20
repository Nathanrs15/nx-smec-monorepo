using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace smec.Models
{
    public class Focus
    {
        public int FocusId { get; set; }
        public string FocusCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int InService { get; set; }
        public ICollection<Analyzer> Analyzers { get; set; }

    }
}
