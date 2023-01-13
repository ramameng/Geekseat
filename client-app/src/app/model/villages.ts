export class Person {
  ageOfDeath: number = Number.NaN;
  yearOfDeath: number = Number.NaN;

  constructor(person?: Person) {
    if (person) {
      this.ageOfDeath = person.ageOfDeath;
      this.yearOfDeath = person.yearOfDeath;
    }
  }
}

export class VillagesFormValues {
  personA: Person = new Person();
  personB: Person = new Person();

  constructor(villages?: VillagesFormValues) {
    if (villages) {
      this.personA = villages.personA;
      this.personB = villages.personB;
    }
  }
}
