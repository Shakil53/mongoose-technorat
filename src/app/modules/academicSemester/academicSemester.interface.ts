
export type TMonths = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

//type alice for name and month
export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall'
export type TAcademicSemesterCode = "01" | "2" | "3"


//main type declaration
export type TAcademicSemester = {
    name: TAcademicSemesterName
    code: TAcademicSemesterCode
    year: string,
    startMonth: TMonths,
    endMonth: TMonths,
}

export type TAcademicSemesterCodeMapper = {
    [key: string]: string
}
