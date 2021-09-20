using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace smec.Models
{
    public class Analyzer
    {
        public int AnalyzerId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string SerialNumber { get; set; }
        public ICollection<Sensor> Sensors { get; set; }
        public Focus Focus { get; set; }

    }
}
