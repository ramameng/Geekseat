using System;
using Xunit;
using Application.Interface;
using Application;
using Domain;

namespace XUnitTest
{
    public class XUnitTest
    {
        private readonly ICalculate calculate = new Calculate();

        [Fact]
        public async void CalculateTest()
        {
            var personA = new Person
            {
                AgeOfDeath = 10,
                YearOfDeath = 12
            };

            var personB = new Person
            {
                AgeOfDeath = 13,
                YearOfDeath = 17
            };

            var calculation = await calculate.ResultAsync(personA, personB);

            Assert.Equal(4.5, calculation);
        }

        
    }
}
