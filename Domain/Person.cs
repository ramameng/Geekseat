namespace Domain
{
    public class Person
    {
        public int AgeOfDeath { get; set; }
        public int YearOfDeath { get; set; }
        public int BornOfYear => YearOfDeath - AgeOfDeath;
    }
}