export const AVERAGE_LIFE_EXPECTANCY = 95;

export const buildDate = (year: number, month: number, day: number): string => {
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toISOString();
  return formattedDate;
};

export const getYearFromBirthday = (date: string): number => {
  const dateBirthday = new Date(date);
  const dateNow = new Date();
  const diffMs = Number(dateNow) - Number(dateBirthday);
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));

  return years;
};

const formatDate = (date: any): string => {
  let updatedDate = date;
  if (typeof updatedDate === 'string') {
    updatedDate = new Date(date);
  }
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const formattedDate = `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year}`;

  return formattedDate;
};

const getProbabilityOfDeath = (
  birthdayDate: string,
  averageLifeExpectancy: number,
): string => {
  const nowYear = new Date().getFullYear();
  const age = getYearFromBirthday(birthdayDate);

  const remainingYears = averageLifeExpectancy - age;
  const probableDateOfDeath = new Date();
  probableDateOfDeath.setFullYear(nowYear + remainingYears);

  return formatDate(probableDateOfDeath);
};

export const prepareCustomersInfo = (customers: any): any[] => {
  const updatedCustomers = customers.map((value: any) => {
    return {
      id: value.id,
      fullName: `${value.name} ${value.lastName}`,
      age: value.age,
      birthdayDate: formatDate(value.birthdayDate),
      probabilityOfDeath: getProbabilityOfDeath(
        value.birthdayDate,
        AVERAGE_LIFE_EXPECTANCY,
      ),
    };
  });

  return updatedCustomers;
};

export const getDateBirthday = (isoDateString: string): string | null => {
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date format.');
    return null;
  }

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};


export const calculateAgeFromBirday = (birthdayDate: string) => {
  const today = new Date();
  const birthDate = new Date(birthdayDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const transformDateFormat = (dateString: string) => {
  const [month, day, year] = dateString.split('/').map(Number);

  const date = new Date(year, month - 1, day);
  const isoDateString = date.toISOString();

  return isoDateString;
};