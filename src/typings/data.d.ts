interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

interface ForumSection {
    name: string;
    forums: Forum[];
}

interface Forum {
    id: number;
    name: string;
    description: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    timeZone: string;
    authenticationToken: string;
}