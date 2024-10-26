function isValidEmail(email: string): boolean {
    return !!email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}