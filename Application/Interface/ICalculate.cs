using System.Threading.Tasks;
using Domain;

namespace Application.Interface
{
    public interface ICalculate
    {
        Task<double> ResultAsync(Person personA, Person personB);
    }
}