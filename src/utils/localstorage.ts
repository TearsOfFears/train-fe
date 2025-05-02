const TOKEN = 'auth_token';
export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem(TOKEN);
    const token: string = data ? JSON.parse(data) : '';

    return token;
}

export function setTokenToLocalStorage( token: string): void {
    localStorage.setItem(TOKEN, JSON.stringify(token));
}

export function removeTokenFromLocalStorage(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem('persist:root')
}
