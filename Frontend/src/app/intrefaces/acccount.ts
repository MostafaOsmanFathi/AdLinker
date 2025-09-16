enum UserType {
    Admin = "admin",
    publisher = "publisher",
    User = "user",
}

export interface Account {
    name: string;
    email: string;
    password: string;
    user_type: UserType;
}
