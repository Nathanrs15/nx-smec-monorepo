using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace smec.Models
{
    public class Sensor
    {
        public int SensorId { get; set; }
        public Analyzer Analyzer { get; set; }
        public MeasuringComponent MeasuringComponent { get; set; }
        public Unit Unit { get; set; }

        public ICollection<CalibrationFunction> CalibrationFunctions { get; set; }
        public Periferic Periferic { get; set; }
        public ICollection<Correction> Corrections { get; set; }
    }

    public class Commutation
    {
        public int Id { get; set; }
        public DateTime TimeStamp { get; set; }
        public ICollection<Sensor> Sensors { get; set; }
    }

    public class CalibrationFunction
    {
        public int CalibrationFunctionId { get; set; }
        public DateTime TimeStamp { get; set; }
        public double Slope { get; set; }
        public double Intercept { get; set; }
        public Sensor Sensor { get; set; }
    }

    public class O2Ref
    {
        public int O2RefId { get; set; }
        public int Value { get; set; }
        public Sensor Sensor { get; set; }

    }

    public class Periferic
    {
        public int PerifericId { get; set; }
        public int SensorId { get; set; }
        public Sensor Sensor { get; set; }
        public PerifericFormula PerifericFormula { get; set; }
    }

    public class PerifericFormula
    {
        public int PerifericFormulaId { get; set; }
        public int PerifericId { get; set; }
        public Periferic Periferic { get; set; }
        public Formula Formula { get; set; }
        public ICollection<Correction> Corrections { get; set; }

    }

    public class Formula
    {
        public int FormulaId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public ICollection<PerifericFormula> PerifericFormulas { get; set; }

    }

    public class Correction
    {
        public int CorrectionId { get; set; }

        public int SensorId { get; set; }
        public Sensor Sensor { get; set; }

        public int PerifericId { get; set; }
        public Periferic Periferic { get; set; }

        public int PerifericFormulaId { get; set; }
        public PerifericFormula PerifericFormulas { get; set; }
    }


    public class SensorPeriferic
    {
        public int SensorPerifericId { get; set; }

        public int SensorId { get; set; }
        public Sensor Sensor { get; set; }

        public int PerifericId { get; set; }
        public Periferic Periferic { get; set; }

    }



}
