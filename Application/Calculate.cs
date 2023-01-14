using System.Threading.Tasks;
using Application.Interface;
using Domain;

namespace Application
{
    public class Calculate : ICalculate
    {
        public async Task<double> ResultAsync(Person personA, Person personB)
        {
            if (personA.BornOfYear < 1 || personB.BornOfYear < 1)
                return -1;

            var resultPersonA = Task.Run(() => NumberOfKilledRecursive(1, 1, personA.BornOfYear, 0));
            var resultPersonB = Task.Run(() => NumberOfKilledRecursive(1, 1, personB.BornOfYear, 0));

            double[] result = await Task.WhenAll(resultPersonA, resultPersonB);

            return (result[0] + result[1]) / 2;
        }

        private static double NumberOfKilledRecursive(int first, int second, int n, int sum)
        {
            if (n == 0) return sum;

            return NumberOfKilledRecursive(second, first + second, n - 1, sum + first);
        }
    }
}