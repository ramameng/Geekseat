using System.Threading.Tasks;
using Domain;

namespace Application.Interface
{
    public interface ICalculate
    {
        Task<double> Result(Person personA, Person personB);
    }
}