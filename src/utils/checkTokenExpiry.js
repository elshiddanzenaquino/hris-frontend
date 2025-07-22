export const isTokenExpired = (token) => {
    if (!token) return true;

    const [, payload] = token.split(".");
    if (!payload) return true;

    try {
        const decoded = JSON.parse(atob(payload));
        const exp = decoded.exp;
        const now = Date.now() / 1000;
        return exp < now;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return true;
    }
};
