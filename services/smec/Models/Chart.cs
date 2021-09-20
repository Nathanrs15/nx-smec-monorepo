using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace smec.Models
{
    public class Chart
    {
        public int ChartId { get; set; }
        public string Description { get; set; }
        public ICollection<Serie> Series { get; set; }

    }

    public class Serie
    {
        public int SerieId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }

        public Chart Chart { get; set; }
        public Sensor Sensor { get; set; }
    }


    //public class ChartDictionary
    //{
    //    public DateTime date { get; set; }
    //    public IDictionary<string, System.Nullable<double>> records { get; set; }
    //}

    //public class ChartDataRecord
    //{
    //    public DateTime date { get; set; }
    //    public string graph { get; set; }
    //    public System.Nullable<double> value { get; set; }
    //}



}
