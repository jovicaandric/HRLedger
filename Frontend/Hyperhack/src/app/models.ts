export class Profile {
    $class = 'org.hrledger.cv.Profile';
    email: String;
    firstName: String;
    lastName: String;
    address: String;
    phoneNumber: String;
    gender = 'M';
    birthDate: Date;
    image: String;
}

export class Skill {

    $class = 'org.hrledger.cv.Skill';
    skillId: String;
    skillName: String;
    grades: number[];
    companies: Company[];
    profile: Profile;
}

export class Employment {
    $class = 'org.hrledger.cv.Employment';
    employmentId: String;
    employmentType: EmploymentType;
    company: Company;
    validatedBy: Company;
    startDate: Date;
    endDate: Date;
    position: String;
    description: String;
    status: ValidationStatus = ValidationStatus.NONE;
    profile: Profile;
}

export class Company {
    $class = 'org.hrledger.cv.Company';
    companyId: String;
    name: String;
    email: String;
    website: String;
    image: String;
}

export class HRAgency extends Company {
    $class = 'org.hrledger.cv.HRAgency';
}

export class Project {
    $class = 'org.hrledger.cv.Project';
    projectId: String;
    projectName: String;
    startDate: Date;
    endDate: Date;
    description: String;
    position: String;
    profile: Profile;
}

export class Education {
    $class = 'org.hrledger.cv.Education';
    educationId: String;
    name: String;
    startDate: Date;
    endDate: Date;
    description: String;
    grade: String;
    status: ValidationStatus = ValidationStatus.NONE;
    validatedBy: Company;
    profile: Profile;
}

export enum ValidationStatus {
    NONE = 'NONE',
    APPROVED = 'APPROVED',
    DISAPPROVED = 'DISAPPROVED'
}

export enum EmploymentType {
    Employment = 'Employment',
    Project = 'Project'
}
